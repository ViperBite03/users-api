import 'module-alias/register'
import express from 'express'
import cors from 'cors'
import routes from '@/routes/routes'

import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // middleware que transforma el req.body a json
app.use('/api/', routes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! 😎`)
})
