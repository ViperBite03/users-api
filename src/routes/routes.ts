import { createUser } from '@/services/signup'
import { login } from '@/services/login'
import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma: PrismaClient = new PrismaClient()

router.get('/', (req, res) => res.send('API Working! 😎'))
router.post('/login', (req, res) => login(req, res, prisma))
router.post('/signup', (req, res) => createUser(req, res, prisma)) //endpoint

export default router
