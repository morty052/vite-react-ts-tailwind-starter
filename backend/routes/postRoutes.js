import express from 'express'
import { LikePost, getAllPosts, getPostsFromFollowing } from '../lib/sanityClient.js'

export const postRoutes = express.Router()

postRoutes.get('/', async (req, res) => {
  const { _id } = req.query
  const posts = await getAllPosts()
  const postsFromFollowing = await getPostsFromFollowing(_id)
  res.send({
    posts,
    postsFromFollowing,
  })
})

postRoutes.get('/like', async (req, res) => {
  const { username, post_id } = req.query
  await LikePost(post_id, username)
  res.send({
    status: 'success',
  })
})
