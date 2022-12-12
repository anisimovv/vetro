import { router } from "../trpc";
import { authRouter } from "./auth";
import { constructionRouter } from "./construction";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  construction: constructionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
