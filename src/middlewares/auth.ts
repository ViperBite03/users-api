import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization || ''

  try {
    jwt.verify(token, process.env.SECRETKEY || '')
  } catch (err) {
    res.sendStatus(403)
  }

  next('hola')
}

export const authRole = (req: Request, res: Response, next: Function, xd: any) => {
  console.log('holaaaa' + xd)
}
