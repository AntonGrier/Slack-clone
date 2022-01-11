const USERID_STORE = 'USER_ID'

export const cacheUser = (userID: string) =>
  localStorage.setItem(USERID_STORE, userID)
export const getCachedUser = () => localStorage.getItem(USERID_STORE)
export const clearUser = () => localStorage.removeItem(USERID_STORE)
