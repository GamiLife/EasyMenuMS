import { SetMetadata } from "@nestjs/common";
import { INJECT_JWT } from "../constants";

export const IsJwtTokens = () => SetMetadata(INJECT_JWT, true);