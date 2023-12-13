import express from 'express'
import { getAllBunnies, getBunny } from '../lib/sanityClient.js'

const bunnyRouter = express.Router()

bunnyRouter.get('/', (req, res) => {
  const params = req.query
  const { name } = params
  console.log(params)
  res.send({
    message: 'Hello ' + name,
  })
})

bunnyRouter.get('/allbunnies', async (req, res) => {
  const bunnies = await getAllBunnies()
  res.send({
    bunnies,
  })
})

bunnyRouter.get('/profile', async (req, res) => {
  const { id } = req.query
  const bunnies = await getBunny(id)
  res.send(bunnies)
})

export default bunnyRouter
