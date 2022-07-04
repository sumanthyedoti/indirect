import { Request, Response, Send } from 'express'
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

export interface User {
  id: number
  username: string
  fullname: string
}
