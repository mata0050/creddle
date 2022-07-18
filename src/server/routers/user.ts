import { prisma } from '../../db/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { createRouter } from '../createRouter';

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  github: true,
  location: true,
  summary: true
});

// firstName  String
// lastName   String
// phone      String
// github     String
// location   String
// summary    String
// education  Education[]
// employment Employment[]
// projects   Project[]
// skills     Skill[]

export const userRouter = createRouter()
  .query('getAllUsers', {
    async resolve() {
      const users = await prisma.user.findMany({
        select: defaultUserSelect,
      });
      return users;
    },
  })
  .mutation('add', {
    input: z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      github: z.string(),
      location: z.string(),
      summary: z.string()
    }), 
    async resolve({ input }) {
      const user = await prisma.user.create({
        data: input,
        select: defaultUserSelect,
      });

      return user;
    },
  })
