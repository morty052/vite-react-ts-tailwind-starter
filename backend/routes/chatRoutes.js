import express from 'express'
import { createUser, generateChatToken } from '../lib/chatClient.js'

export const chatRoutes = express.Router()

chatRoutes.get('/token', (req, res) => {
  const params = req.query
  const { user_id } = params

  const token = generateChatToken(user_id)

  res.send({
    token,
    status: 'success',
  })

  console.log('sent', token, user_id)
})

chatRoutes.get('/create-user', async (req, res) => {
  const params = req.query
  const { bunny_name } = params

  const token = await createUser(bunny_name)

  res.send({
    token,
    status: 'user created',
  })
})
