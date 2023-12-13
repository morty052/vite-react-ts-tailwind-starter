import express from 'express'
import { generateChatToken } from '../lib/chatClient.js'

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
