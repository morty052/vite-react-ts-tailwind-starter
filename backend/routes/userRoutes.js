import express from 'express'
import {
  createUser,
  likeBunny,
  createEvent,
  getEvents,
  getUserCredits,
  decUserCredits,
  getOrders,
  getUserBunnies,
} from '../lib/sanityClient.js'
import { updateAuthUsername } from '../lib/clerk.js'

export const userRoutes = express.Router()

const API_KEY = 'fd0a25a3-ba0a-4bec-9ef0-c40fe1533eb1'

/**
 * Creates a charge with the specified amount.
 *
 * @param {number} amount - The amount to be added to the account.
 * @return {Promise} - A promise that resolves with the response data from the API.
 */
const createCharge = async (amount) => {
  const data = {
    name: `Add Funds to wallet`,
    description: `Funds will be added to your account immediately after payment confirmation.`,
    pricing_type: 'fixed_price',
    local_price: {
      amount,
      currency: 'USD',
    },
  }
  const response = await fetch('https://api.commerce.coinbase.com/charges/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CC-Api-Key': API_KEY,
      'X-CC-Version': '2018-03-22',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      console.log(data)
      return data
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error)
    })
  console.log('charge response sent')
  return response
}

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

userRoutes.get('/get-user-bunnies', async (req, res) => {
  const params = req.query
  const { username } = params

  const bunnies = await getUserBunnies(username)

  res.send({
    message: 'Liked',
    success: true,
    error: false,
    bunnies,
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

userRoutes.get('/credits', async (req, res) => {
  const params = req.query
  const { username } = params

  const credits = await getUserCredits(username)

  res.send({
    message: 'created',
    success: true,
    error: false,
    credits,
  })
})

userRoutes.get('/spend', async (req, res) => {
  const params = req.query
  const { username, amount } = params

  const balance = await decUserCredits(username, amount)

  res.send({
    message: 'created',
    success: true,
    error: false,
    balance,
  })
})

userRoutes.get('/orders', async (req, res) => {
  const params = req.query
  const { username } = params

  const orders = await getOrders(username)

  res.send({
    message: 'created',
    success: true,
    error: false,
    orders,
  })
})

userRoutes.get('/create-charge', async (req, res) => {
  const params = req.query
  const { amount } = params

  console.log('charge request received')

  const charge = await createCharge(amount)

  const data = charge.data

  const hosted_url = data.hosted_url

  res.send({
    hosted_url,
  })
})

userRoutes.get('/update-username', async (req, res) => {
  const { username, user_id } = req.query
  const users = await updateAuthUsername(username, user_id)
  res.send({
    users,
  })
})
