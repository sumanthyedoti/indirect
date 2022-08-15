import { Response, Request, NextFunction, RequestHandler } from 'express'
import { ValidateFunction } from 'ajv'
import connectPgSession from 'connect-pg-simple'
import session from 'express-session'

import { TypedRequestParams, SocketRequest } from './types'
import { sessionPool } from './db'

const pgSession = connectPgSession(session)
export const expressSessionMiddleware: RequestHandler = session({
  // @ts-ignore
  secret: process.env.COOKIE_SECRET,
  store: new pgSession({
    pool: sessionPool,
    tableName: 'sessions',
  }),
  credentials: true,
  name: 'sid',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: {
    // secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    sameSite: 'strict',
  },
})

export function validateIdParam(
  req: TypedRequestParams<{ id: number; uid?: number }>,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id)

  if (id) {
    req.params.id = id
    return next()
  }
  res.status(422).json({ message: "'id' is not valid" })
  return
}

export function validateSchema(ajvValidate: ValidateFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate(req.body)
    if (valid) {
      return next()
    }
    const errors = ajvValidate.errors
    res.status(422).json({ errors })
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ message: 'Authentication required' })
}

export const socketAuthentication = (
  socket: SocketRequest,
  next: NextFunction
) => {
  const req = socket.request
  if (req.isAuthenticated && req.isAuthenticated()) {
    socket.join(req.user.id.toString())
    next()
  } else {
    next(new Error('unauthorized'))
  }
}
