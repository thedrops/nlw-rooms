import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

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

      const result = await db
        .insert(schema.questions)
        .values({ question, room_id: roomId })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create new question');
      }

      return reply.status(201).send({ questionId: insertedQuestion.id });
    }
  );
};
