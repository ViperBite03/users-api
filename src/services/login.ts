import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

export const login = async (req: Request, res: Response, prisma: PrismaClient) => {
  try {
    //Encontrar el user en la base de datos
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    //Comprobar que la contraseña coincide
    const validPassword = user ? await bcrypt.compare(req.body.password, user.password) : false

    //Comprobar si existe el usuario
    if (!user || !validPassword) {
      res.send('Los datos no son correctos, puta')
      return
    }

    //Si coincide -> generar token
    if (validPassword) {
      const token = jwt.sign({ email: user.email }, process.env.SECRETKEY || '', { expiresIn: '1h' }) //payload: la info que llega (user, password...)

      //Enviar el token (response?)
      res.send(token)
    }
  } catch (error) {}
}
