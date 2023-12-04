export interface AuthUser {
  user: {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;  
  },
  isAuth?: null | boolean
}
