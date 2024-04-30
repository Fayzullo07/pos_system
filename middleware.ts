import { auth } from "./configs/auth";

export const middleware = auth;

export const config = { matcher: ["/middleware-example"] };
