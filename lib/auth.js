const bcrypt = require('bcryptjs')
const { SignJWT, jwtVerify } = require('jose')

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-change-this-in-production'
)

async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

async function createJWT(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  createJWT,
  verifyJWT
}