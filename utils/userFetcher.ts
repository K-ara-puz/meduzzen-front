import { setAuthData, authMe } from "../store/slices/authSlice";

let store

export const injectStore = _store => {
  store = _store
}
export async function userFetcher() {
  try {
    return await store.dispatch(authMe());
  } catch (error) {
    store.dispatch(setAuthData({}))
  }
}