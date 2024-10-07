import { SetMetadata } from "@nestjs/common";
import { UserRole } from "./user_enum";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);