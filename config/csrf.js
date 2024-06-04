require('dotenv').config();

const doubleCsrfUtilities = {
  getSecret: () => process.env.CSRF_SECRET,
  cookieName: 'X-CSRF-Token',
  cookieOptions: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    //Set secure to true for production
    secure: false,
    sameSite: 'strict'
  },
  getTokenFromRequest: (req) => req.body._csrf
}

module.exports = doubleCsrfUtilities;