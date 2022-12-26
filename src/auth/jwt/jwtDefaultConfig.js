export default {
  // Endpoints
  loginEndpoint: '/login/admin',
  registerEndpoint: '/admin/register',
  refreshEndpoint: '/admin/refresh-token',
  logoutEndpoint: '/logout/admin',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
