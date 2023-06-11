import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC } from "../constants";

export const IsPublic = () => SetMetadata(IS_PUBLIC, true);