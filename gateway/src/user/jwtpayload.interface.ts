import { UserRole } from "./user_enum";




export interface JwtPayload {
    email: string;
    role: UserRole;
  }
  

