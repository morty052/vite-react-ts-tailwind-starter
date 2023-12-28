import express from 'express'
import { client, urlFor } from '../lib/sanityClient.js'
export const pimpRoutes = express.Router()

async function GetPimpBunnies(_id) {
  const query = `*[_type == "bunnies" && references("${_id}")]`
  const result = await client.fetch(query)
  const bunnies = result.map((bunny) => {
    return {
      _id: bunny._id,
      name: bunny.name,
      username: bunny.username,
      avatar: urlFor(bunny.avatar).url(),
    }
  })
  const bunny_id_array = result.map((bunny) => {
    return bunny._id
  })
  return { bunnies, bunny_id_array }
}

export const getBunny = async (_id) => {
  try {
    const result = await client.fetch(`*[_type == "bunnies" && _id == "${_id}"]{...,followers[] -> {username}}`)
    const postsData = await client.fetch(
      `*[_type == "posts" && references("${_id}")]{..., author -> {username, name, avatar}}`,
    )
    const posts = postsData.map((post) => {
      const { image: imageUrl, _id, text, likes, likedby, author } = post
      const { name: authorName, username: authorUsername, avatar } = author

      const image = urlFor(imageUrl).url()
      const authorAvatar = urlFor(avatar).url()

      return {
        image,
        _id,
        text,
        likes,
        likedby,
        authorName,
        authorUsername,
        authorAvatar,
      }
    })
    const bunny = result.map((bunny) => {
      const { photos, followers } = bunny

      const reel = photos?.map((photo) => {
        return urlFor(photo).url()
      })
      return {
        _id: bunny._id,
        name: bunny.name,
        avatar: urlFor(bunny.avatar).url(),
        reel,
        username: bunny.username,
        recommended: bunny.recommended,
        bio: bunny.bio,
        trending: bunny.trending,
        offers: bunny.offers,
        followers: followers.map((follower) => follower.username),
        online: bunny.online,
        last_seen: bunny.last_seen,
        pricing: bunny.pricing,
      }
    })

    return {
      bunny: bunny[0],
      posts,
    }
  } catch (error) {
    console.log(error)
  }
}

pimpRoutes.get('/bunnies', async (req, res) => {
  const { _id } = req.query
  const { bunnies, bunny_id_array } = await GetPimpBunnies(_id)
  res.send({
    message: 'Hello World',
    bunnies,
    bunny_id_array,
  })
})

pimpRoutes.get('/single-bunny', async (req, res) => {
  const { bunny_id } = req.query
  const bunny = await getBunny(bunny_id)
  res.send({
    ...bunny,
  })
})
