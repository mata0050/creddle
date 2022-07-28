import { prisma } from "../../db/prisma";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "../createRouter";

const defaultProjectSelect = Prisma.validator<Prisma.ProjectSelect>()({
    id: true,
    name: true,
    description: true,
    startDate: true,
    endDate: true,
    link: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
});

export const projectRouter = createRouter()
    .query("getById", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input }) {
            const { id } = input;
            const project = await prisma.project.findMany({
                where: {
                    userId: id,
                },
                select: defaultProjectSelect,
            });

            if (!project) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `No post with id '${id}'`,
                });
            }

            return project;
        },
    })
    .mutation("add", {
        input: z.object({
            name: z.string(),
            description: z.string(),
            startDate: z.date(),
            endDate: z.date(),
            link: z.string(),
            userId: z.string(),
        }),
        async resolve({ input }) {
            const project = await prisma.project.create({
                data: input,
                select: defaultProjectSelect,
            });

            return project;
        },
    })
    .mutation("edit", {
        input: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            link: z.string(),
            userId: z.string(),
        }),
        async resolve({ input }) {
            const project = await prisma.project.update({
                where: {
                    id: input.id,
                },
                data: input,
                select: defaultProjectSelect,
            });

            return project;
        },
    })
    .mutation("delete", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input }) {
            const project = await prisma.project.delete({
                where: {
                    id: input.id,
                },
                select: defaultProjectSelect,
            });

            return project;
        },
    });
