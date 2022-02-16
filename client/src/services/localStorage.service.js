const ACCESS_TOKEN = 'jwt-access-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USER_ID = 'user-id'

export function setToken(data) {
  localStorage.setItem(ACCESS_TOKEN, data.accessToken)
  localStorage.setItem(REFRESH_KEY, data.refreshToken)
  localStorage.setItem(EXPIRES_KEY, data.expiresIn)
  localStorage.setItem(USER_ID, data.userId)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}

export function getExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}

export function getUserId() {
  return localStorage.getItem(USER_ID)
}

export function removeAuthData() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(USER_ID)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
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
