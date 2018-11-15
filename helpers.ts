// generate authorization headers for all axios posts

export function getAuthHeader(token:string, otherHeaders: object = {}) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...otherHeaders
    }
  }
}