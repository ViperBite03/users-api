import { Roles } from '@/enums/Roles'
import type { IUser } from '@/interfaces/IUser'
import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const prisma: PrismaClient = new PrismaClient()

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || ''

  try {
    const decodedToken: any = jwt.verify(token, process.env.SECRETKEY || '')
    res.locals.email = decodedToken.email
    next()
  } catch (err) {
    res.sendStatus(401)
  }
}

export const authRole = async (req: Request, res: Response, next: NextFunction, validRoles: Roles[]) => {
  try {
    const user = (await prisma.user.findUnique({
      where: {
        email: res.locals.email,
      },
    })) as IUser

    let isValid: boolean = false

    user.roles?.map((role: Roles) => {
      isValid = validRoles.some((validRole: Roles) => validRole === role)
    })

    if (!isValid) throw Error('Role not valid')

    next()
  } catch (err) {
    res.sendStatus(403)
  }
}
