import { CompanyData } from "./CompanyData.interface";
import { User } from "./User.interface";

export interface Invite {
  id: string;
  company: Partial<CompanyData>;
  type: string;
  status: string;
  targetUser: User;
  userFrom: User;
}
