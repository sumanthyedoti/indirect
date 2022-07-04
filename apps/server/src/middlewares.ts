import { Response, Request, NextFunction } from 'express'
import { ValidateFunction } from 'ajv'

function validateId(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  if (!id) {
    res.status(422).json({ message: "'id' is not valid" }).end()
  } else {
    next()
  }
}

function validateSchema(ajvValidate: ValidateFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate(req.body)
    if (!valid) {
      const errors = ajvValidate.errors
      res.status(422).json({ errors })
    }
    next()
  }
}

export { validateId, validateSchema }
