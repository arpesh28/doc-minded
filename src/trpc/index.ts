import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  authCallback: publicProcedure.query(() => {
    return "";
  }),
});
export type AppRouter = typeof appRouter;
