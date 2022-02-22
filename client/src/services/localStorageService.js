const ACCESS_TOKEN = 'jwt-access-token'
const REFRESH_TOKEN = 'jwt-refresh-token'
const EXPIRES_DATE = 'jwt-expires'
const USER_ID = 'user-id'

export function setToken(data) {
  const expiresDate = new Date().getTime() + data.expiresIn * 1000
  localStorage.setItem(ACCESS_TOKEN, data.accessToken)
  localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
  localStorage.setItem(EXPIRES_DATE, expiresDate)
  localStorage.setItem(USER_ID, data.userId)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN)
}

export function getExpiresDate() {
  return localStorage.getItem(EXPIRES_DATE)
}

export function getUserId() {
  return localStorage.getItem(USER_ID)
}

export function removeAuthData() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(USER_ID)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(EXPIRES_DATE)
}

const localStorageService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getUserId,
  removeAuthData
}

export default localStorageService
