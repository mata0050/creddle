import { prisma } from '../../db/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { createRouter } from '../createRouter';

const defaultEducationSelect = Prisma.validator<Prisma.EducationSelect>()({
  id: true,
  school: true,
  degree: true,
  field: true,
  startDate: true,
  endDate: true,
});



export const educationRouter = createRouter()
  .query('getAll', {
    async resolve() {
      const education = await prisma.education.findMany({
        select: defaultEducationSelect,
      });
      return education;
    },
  })
  .mutation('add', {
    input: z.object({
      school: z.string(),
      degree: z.string(),
      field: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
    async resolve({ input }) {
      const education = await prisma.education.create({
        data: input,
        select: defaultEducationSelect,
      });

      return education;
    },
  })
  .mutation('edit', {
    input: z.object({
      id: z.string(),
      school: z.string(),
      degree: z.string(),
      field: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
    async resolve({ input }) {
      const education = await prisma.education.update({
        where: {
          id: input.id,
        },
        data: input,
        select: defaultEducationSelect,
      });

      return education;
    },
  })
   .mutation('delete', {
    input: z.object({
      id: z.string(),

    }),
    async resolve({ input }) {
      const education = await prisma.education.delete({
        where: {
          id: input.id,
        },
        select: defaultEducationSelect,
      });

      return education;
    },
  });
