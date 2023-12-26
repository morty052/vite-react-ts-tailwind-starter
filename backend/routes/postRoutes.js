import express from 'express'
import {
  LikePost,
  getAllPosts,
  getPostsFromFollowing,
  bookmarkPost,
  GetBookmarks,
  removePostBookmark,
  unLikePost,
} from '../lib/sanityClient.js'

export const postRoutes = express.Router()

postRoutes.get('/', async (req, res) => {
  const { _id } = req.query
  const posts = await getAllPosts(_id)
  const postsFromFollowing = await getPostsFromFollowing(_id)
  res.send({
    posts,
    postsFromFollowing,
  })
})

postRoutes.get('/bookmark-post', async (req, res) => {
  const params = req.query
  const { _id, post_id } = params

  await bookmarkPost(_id, post_id)

  res.send({
    message: 'Liked',
    success: true,
    error: false,
  })
})
postRoutes.get('/remove-bookmark', async (req, res) => {
  const params = req.query
  const { _id, post_id } = params

  await removePostBookmark(_id, post_id)

  res.send({
    message: 'Liked',
    success: true,
    error: false,
  })
})
postRoutes.get('/bookmarks', async (req, res) => {
  const params = req.query
  const { _id } = params

  const bookmarks = await GetBookmarks(_id)

  res.send({
    message: 'Liked',
    success: true,
    error: false,
    bookmarks,
  })
})

postRoutes.get('/like', async (req, res) => {
  const { _id, post_id } = req.query
  await LikePost(post_id, _id)
  res.send({
    status: 'success',
  })
})

postRoutes.get('/unlike', async (req, res) => {
  const { _id, post_id } = req.query
  await unLikePost(post_id, _id)
  res.send({
    status: 'success',
  })
})
