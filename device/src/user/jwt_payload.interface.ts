import { UserRole } from "./enum";

export interface JwtPayload {
    email: string;
    role: UserRole;
  }
  

