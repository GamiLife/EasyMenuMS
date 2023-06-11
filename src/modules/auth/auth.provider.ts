import { ARGON_HANDLER, AUTH_REPOSITORY, JWT_HANDLER } from "src/core/constants";
import { AuthEntity } from "./auth.entity";
import { JwtHandler } from "src/core/helpers/jwt.helper";
import * as argon2 from "argon2";

export const authProviders = [
    {
      provide: AUTH_REPOSITORY,
      useValue: AuthEntity,
    },
    {
      provide: JWT_HANDLER,
      useClass: JwtHandler
    },
    {
      provide: ARGON_HANDLER,
      useValue: argon2
    }
  ];