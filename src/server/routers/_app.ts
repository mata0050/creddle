/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from "../createRouter";
import superjson from "superjson";
import { skillRouter } from "./skill";
import { userRouter } from "./user";
import { educationRouter } from "./education";
import { projectRouter } from "./project";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })

  /**
   * Merge routes`
   */
  .merge("user.", userRouter)
  .merge("education.", educationRouter)
  .merge("skill.", skillRouter)
  .merge("project.", projectRouter);

export type AppRouter = typeof appRouter;
