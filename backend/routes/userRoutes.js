import express from 'express'
import { createUser, likeBunny, createEvent, getEvents } from '../lib/sanityClient.js'

export const userRoutes = express.Router()

userRoutes.get('/create', async (req, res) => {
  const params = req.query
  const { username, email } = params

  await createUser(username, email)

  res.send({
    message: 'User Created',
    success: true,
    error: false,
  })
})

userRoutes.get('/likebunny', async (req, res) => {
  const params = req.query
  const { username, bunny_id } = params

  await likeBunny(username, bunny_id)

  res.send({
    message: 'Liked',
    success: true,
    error: false,
  })
})

userRoutes.get('/createevent', async (req, res) => {
  const params = req.query
  const { username, bunny_id, eventtype } = params

  await createEvent(username, bunny_id, eventtype)

  res.send({
    message: 'created',
    success: true,
    error: false,
  })
})

userRoutes.get('/events', async (req, res) => {
  const params = req.query
  const { username } = params

  const events = await getEvents(username)

  res.send({
    message: 'created',
    success: true,
    error: false,
    events,
  })
})
