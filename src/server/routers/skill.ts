import { prisma } from '../../db/prisma';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '../createRouter';

// id        String   @id @default(uuid())
// createdAt DateTime @default(now())
// updatedAt DateTime @updatedAt
// name      String
// User      User?    @relation(fields: [userId], references: [id])
// userId    String?

const defaultSkillSelect = Prisma.validator<Prisma.SkillSelect>()({
  id: true,
  name: true,
  skill: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

// id        String     @id @default(uuid())
//   createdAt DateTime   @default(now())
//   updatedAt DateTime   @updatedAt
//   name      String
//   User      User?      @relation(fields: [userId], references: [id])
//   userId    String?
//   skill     SkillGroup

export const skillRouter = createRouter()
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const skill = await prisma.skill.findMany({
        where: {
          userId: id,
        },
        select: defaultSkillSelect,
      });

      if (!skill) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return skill;
    },
  })
  .mutation('add', {
    input: z.object({
      name: z.string(),
      skill: z.enum(['FRAMEWORKS', 'SYSTEMS', 'LANGUAGES']),
      createdAt: z.date(),
      updatedAt: z.date(),
      userId: z.string(),
    }),
    async resolve({ input }) {
      const skill = await prisma.skill.create({
        data: input,
        select: defaultSkillSelect,
      });

      return skill;
    },
  })
  .mutation('edit', {
    input: z.object({
      id: z.string(),
      name: z.string(),
      skill: z.enum(['FRAMEWORKS', 'SYSTEMS', 'PROJECT']),
      createdAt: z.date(),
      updatedAt: z.date(),
      userId: z.string(),
    }),
    async resolve({ input }) {
      const skill = await prisma.skill.update({
        where: {
          id: input.id,
        },
        data: input,
        select: defaultSkillSelect,
      });

      return skill;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const skill = await prisma.skill.delete({
        where: {
          id: input.id,
        },
        select: defaultSkillSelect,
      });

      return skill;
    },
  });
