import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import jwk from './jwk.js'

async function validateToken(request, response, next) {
  try {
    const token = request.headers?.authorization
    if (!token) {
      return response.status(400).json(
        { error: 'Token não localizado.' }
      )
    }

    let resultValidate
    let pem = jwkToPem(jwk)
    jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, decodedToken) => {
      if (err) {
        resultValidate = { error: err.message, stack: 'jwt' }
      } else {
        resultValidate = decodedToken
      }
    })

    if (resultValidate?.error) {
      return response.status(401).json(resultValidate)
    }
    request.identity = resultValidate.sub
    return next()
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

export default {
  validateToken
}
