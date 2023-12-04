import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma: PrismaClient = new PrismaClient()

export const createUser = async (req: Request, res: Response) => {
  try {
    //Si el user es nuevo -> encriptar contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //Guardar en la base de datos el nuevo user
    await prisma.user.create({
      data: {
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword,
        nickname: req.body.nickname,
      },
    })
  } catch (error) {}

  //Redirigir a "login"

  res.send(req.body)
}
