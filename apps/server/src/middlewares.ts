import { Response, Request, NextFunction } from 'express'

function validateId(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)
  if (!id) {
    res.status(422).json({ message: "'id' is not valid" }).end()
  } else {
    next()
  }
}

export { validateId }
