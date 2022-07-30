import { prisma } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "../createRouter";
import { TRPCError } from "@trpc/server";

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  github: true,
  location: true,
  summary: true,
});

type Skill = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  name: string;
  skill: string;
};

type Skills = {
  frameworks: Skill[];
  system: Skill[];
  languages: Skill[];
};

export const userRouter = createRouter()
  .query("getById", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          education: true,
          skills: true,
          projects: true,
          employment: true,
        },
        // select: defaultUserSelect,
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `UNAUTHORIZED'`,
        });
      }

    
      return user;
    },
  })
  .query("getAllUsers", {
    async resolve() {
      const users = await prisma.user.findMany({
        include: {
          education: true,
          skills: true,
          projects: true,
          employment: true,
        },
        // select: defaultUserSelect,
      });

      return users;
    },
  })
  .mutation("add", {
    input: z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      github: z.string(),
      location: z.string(),
      summary: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.create({
        data: input,
        select: defaultUserSelect,
      });

      return user;
    },
  })
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      github: z.string(),
      location: z.string(),
      summary: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: input,
        select: defaultUserSelect,
      });

      return user;
    },
  });
