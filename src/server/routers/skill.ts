import { prisma } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

const defaultSkillSelect = Prisma.validator<Prisma.SkillSelect>()({
  id: true,
  name: true,
  skill: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
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

export const skillRouter = createRouter()
  .query("getById", {
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
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }

      const skills: Skills = {
        frameworks: [],
        system: [],
        languages: [],
      };

      skill.forEach((skill: Skill) => {
        if (skill.skill === "FRAMEWORKS") {
          skills.frameworks.push(skill);
        } else if (skill.skill === "SYSTEMS") {
          skills.system.push(skill);
        } else {
          skills.languages.push(skill);
        }
      });

      return skills;
    },
  })
  .mutation("add", {
    input: z.object({
      name: z.string(),
      skill: z.enum(["FRAMEWORKS", "SYSTEMS", "LANGUAGES"]),
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
  .mutation("edit", {
    input: z.object({
      id: z.string(),
      name: z.string(),
      skill: z.enum(["FRAMEWORKS", "SYSTEMS", "LANGUAGES"]),
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
  .mutation("delete", {
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
