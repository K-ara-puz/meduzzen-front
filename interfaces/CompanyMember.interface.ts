import { CompanyData } from "./CompanyData.interface";
import { User } from "./User.interface";

export interface CompanyMember {
  id: string;
  role: string;
  company?: CompanyData;
  user?: Partial<User>;
}
