import express from 'express'
import { LikePost, getAllPosts } from '../lib/sanityClient.js'

export const postRoutes = express.Router()

postRoutes.get('/', async (req, res) => {
  const posts = await getAllPosts()
  res.send([...posts])
})

postRoutes.get('/like', async (req, res) => {
  const { username, post_id } = req.query
  await LikePost(post_id, username)
  res.send({
    status: 'success',
  })
})
