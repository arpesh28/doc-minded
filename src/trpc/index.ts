import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  authCallback: publicProcedure.query(() => {
    return "test";
  }),
});
export type AppRouter = typeof appRouter;
