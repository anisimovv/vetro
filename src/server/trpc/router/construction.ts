import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const constructionRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.construction.findMany();
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.construction.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          elements: true,
          variants: true,
          glass: true,
        },
      });
    }),
});
