/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { departments } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { emergency } from '@/server/db/schema';

export const emergencyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        doctor: z.string(),
        status: z.string(),
        designation: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
     const data = await ctx.db.insert(emergency).values({
        doctor: input.doctor,
        status: input.status,
        designation: input.designation,
      });
      return data;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        doctor: z.string(),
        status: z.string(),
        designation: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.update(emergency).set({
        doctor: input.doctor,
        status: input.status,
        designation: input.designation,
      }).where(eq(emergency.id, input.id));

      return data;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.delete(emergency).where(eq(emergency.id, input.id));
      return data;
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const data = await ctx.db.query.emergency.findMany({
        with: {
          doctor: true,
        },
      });
      return data;
    }),
   
});