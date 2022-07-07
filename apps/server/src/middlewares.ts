import { Response, Request, NextFunction } from 'express'
import { ValidateFunction } from 'ajv'

import { TypedRequestParams } from './types'

function validateIdParam(
  req: TypedRequestParams<{ id: number }>,
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

function validateSchema(ajvValidate: ValidateFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate(req.body)
    if (valid) {
      return next()
    }
    const errors = ajvValidate.errors
    res.status(422).json({ errors })
  }
}

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(440).json({ message: 'Login failed' })
  return
}

export { validateIdParam, validateSchema, isLoggedIn }
