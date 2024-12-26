/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { departments } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const departmentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        onDutyDoctor: z.string().optional(),
        unavailableDoctor: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(departments).values({
        name: input.name,
        onDutyDoctor: input.onDutyDoctor,
        unavailableDoctor: input.unavailableDoctor,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        onDutyDoctor: z.string().optional(),
        unavailableDoctor: z.string().optional(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(departments).set({
        name: input.name,
        onDutyDoctor: input.onDutyDoctor,
        unavailableDoctor: input.unavailableDoctor,
      }).where(eq(departments.id, input.id));
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const departments = await ctx.db.query.departments.findMany({
      with : {
       onDutyDoctor : true,
       unavailableDoctor : true,

      }
    });
    return departments;
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(departments).where(eq(departments.id, input.id));
    }),
});
