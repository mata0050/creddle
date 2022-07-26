import { prisma } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

const defaultEducationSelect = Prisma.validator<Prisma.EducationSelect>()({
  id: true,
  school: true,
  degree: true,
  field: true,
  startDate: true,
  endDate: true,
  userId: true,
});

export const educationRouter = createRouter()
  .query("getAll", {
    async resolve() {
      const education = await prisma.education.findMany({
        select: defaultEducationSelect,
      });
      return education;
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const education = await prisma.education.findMany({
        orderBy: [
          {
            startDate: "desc",
          },
        ],
        where: {
          userId: id,
        },
        select: defaultEducationSelect,
      });

      if (!education) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }
      return education;
    },
  })
  .mutation("add", {
    input: z.object({
      school: z.string(),
      degree: z.string(),
      field: z.string(),
      startDate: z.date(),
      endDate: z.date(),
      userId: z.string(),
    }),
    async resolve({ input }) {
      const education = await prisma.education.create({
        data: input,
        select: defaultEducationSelect,
      });

      return education;
    },
  })
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      school: z.string(),
      degree: z.string(),
      field: z.string(),
      startDate: z.date(),
      endDate: z.date(),
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
  .mutation("delete", {
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
