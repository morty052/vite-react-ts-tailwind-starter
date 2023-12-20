import express from 'express'
import { getAllBunnies, getBunny, getRecommendedBunnies, getBunnyContext } from '../lib/sanityClient.js'

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
  const { username } = req.query
  const { bunnies, following } = await getAllBunnies(username)
  res.send({
    bunnies,
    following,
  })
})

bunnyRouter.get('/recommended', async (req, res) => {
  const bunnies = await getRecommendedBunnies()
  res.send({
    bunnies,
  })
})

bunnyRouter.get('/profile', async (req, res) => {
  const { id } = req.query
  const bunnies = await getBunny(id)
  res.send(bunnies)
})

bunnyRouter.get('/context', async (req, res) => {
  const { name } = req.query
  const bunnies = await getBunnyContext(name)
  res.send(bunnies)
})

export default bunnyRouter
