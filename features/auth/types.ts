// schemas
import { registerReqSchema, loginReqSchema } from "@/features/auth/schema";

// others
import { z } from "zod";

export type RegisterReqType = z.infer<typeof registerReqSchema>;
export type LoginReqType = z.infer<typeof loginReqSchema>;