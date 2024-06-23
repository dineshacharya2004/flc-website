import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { eventRouter } from "./routers/event";
import { feedbackTemplateRouter } from "./routers/feedback";
import { attendanceRouter } from "./routers/attendence";
import { teamRouter } from "./routers/team";
import { authRouter } from "./routers/auth";
import { winnerRouter } from "./routers/winner";
import { certificateRouter } from "./routers/certificate";
import { activityPointsRouter } from "./routers/activitypoints";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  event: eventRouter,
  feedbackTemplate: feedbackTemplateRouter,
  attendence: attendanceRouter,
  team: teamRouter,
  auth: authRouter,
  winner: winnerRouter,
  certificate: certificateRouter,
  activitypoints: activityPointsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
