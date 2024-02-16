export interface initialState {
  user: {
    id?: string,
    email?: string,
    firstName?: string,
    lastName?: string
  }
  tokens: {
    accessToken?: string,
    actionToken?: string,
    refreshToken?: string
  },
  isAuth?: boolean
}