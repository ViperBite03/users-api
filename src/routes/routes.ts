import { auth, authRole } from '@/middlewares/auth'
import { createUser } from '@/services/signup'
import { login } from '@/services/login'
import { Roles } from '@/enums/Roles'
import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => res.send('API Working! 😎'))
router.get(
  '/private',
  auth,
  (req, res, next) => authRole(req, res, next, [Roles.God, Roles.Demigod]),
  (_req, res) => {
    res.send('Private area! 😎')
  }
)
router.post('/login', login)
router.post('/signup', createUser) //endpoint

export default router
