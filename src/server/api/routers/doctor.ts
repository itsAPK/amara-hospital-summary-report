
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { doctors } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const doctorRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        mobile: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(doctors).values({
        name: input.name,
        mobile: input.mobile,
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        mobile: z.string().optional(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(doctors).set({
        name: input.name,
        mobile: input.mobile,
      }).where(eq(doctors.id, input.id));
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const doctors = await ctx.db.query.doctors.findMany();
    return doctors;
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(doctors).where(eq(doctors.id, input.id));
    }),
});