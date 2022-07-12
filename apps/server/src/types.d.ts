import { Request, Response, NextFunction, Send } from 'express'
import { IncomingMessage, Socket } from 'socket.io'
export type dbError = {
  detail: string
}

export interface TypedRequestParams<T> extends Request {
  params: T
}

export interface TypedRequestBody<T> extends Request {
  body: T
}

export interface TypedRequest<Params, Body> extends Request {
  params: Params
  body: Body
}
export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>
}

export type Middlewear = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

export type ExpressSocketMiddlewear = (
  socket: IncomingMessage,
  res: Record<string, unknown>,
  next: NextFunction
) => void

export interface SocketRequest extends Socket {
  request: Request
}
