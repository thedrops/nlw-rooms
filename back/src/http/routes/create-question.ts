import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateAnswer, generateEmbeddings } from '../../services/gemini.ts';

const createQuestionBodySchema = z.object({
  question: z.string().min(1),
});

const createQuestionParamsSchema = z.object({
  roomId: z.string(),
});

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        body: createQuestionBodySchema,
        params: createQuestionParamsSchema,
      },
    },
    async (request, reply) => {
      const { question } = request.body;
      const { roomId } = request.params;

      const embeddings = await generateEmbeddings(question);

      const similarityThreshold = 0.7;

      const embeddingAsString = `[${embeddings.join(',')}]`;

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingAsString})`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.room_id, roomId),
            sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingAsString}) > ${similarityThreshold}`
          )
        )
        .orderBy(
          sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingAsString})`
        )
        .limit(3);

      let answer: string | null = null;
      if (chunks.length > 0) {
        const transcriptions = chunks.map((chunk) => chunk.transcription);
        answer = await generateAnswer(question, transcriptions);
      }

      const result = await db
        .insert(schema.questions)
        .values({
          question,
          room_id: roomId,
          answer,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create new question');
      }

      return reply
        .status(201)
        .send({ questionId: insertedQuestion.id, answer });
    }
  );
};
