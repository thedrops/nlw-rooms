import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

const createRoomBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const createRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    { schema: { body: createRoomBodySchema } },
    async (request, reply) => {
      const { name, description } = request.body;

      const result = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning();

      const insertedRoom = result[0];

      if (!insertedRoom) {
        throw new Error('Failed to create new room');
      }

      return reply.status(201).send({ roomId: insertedRoom.id });
    }
  );
};
