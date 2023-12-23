import { createClient } from '@sanity/client'
import urlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'i7m1o5ma',
  dataset: 'production',
  useCdn: false,
  token:
    'skqkX0wUPSEcs6eomIoNHe4DGGKjt16rJdDiWgD5LOYVmdX7tzwZ4hQdZmqAdlFzOTgA0tuVdc1U7INYef1AVGWrnW6KcdvVrDr6BecQQPL1KmLezBcXiDwRpu4ZIeV7YB9zbxE29SM9Z8cCeCcYdJOb5f9zceZZ7SpibqKWOdItZDLec9WO',
  apiVersion: '2023-10-21',
})

export const urlFor = (source) => {
  return urlBuilder(client).image(source)
}

/**
 * Retrieves a user by their username.
 *
 * @param {string} username - The username of the user.
 * @param {boolean} full - Determines whether to retrieve the full user object or just the basic information.
 * @return {Promise<object>} The user object that matches the given username. If no user is found, returns undefined.
 */
const getUser = async (username, full) => {
  try {
    const query = full
      ? `*[_type == "users" && username == "${username}"]{...,bunnies[]{bunny -> {avatar, name} },orders[]{..., bunny-> {avatar, name}},events[]{...,bunny -> {avatar, name, username, _id}}}`
      : `*[_type == "users" && username == "${username}"]`
    const result = await client.fetch(query)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}
export const getUserId = async (username, full) => {
  try {
    const query = `*[_type == "users" && username == "${username}"]`
    const result = await client.fetch(query)
    const id = result[0]._id
    return id
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = async (_id, full) => {
  try {
    const query = full
      ? `*[_type == "users" && _id == "${_id}"]{...,bunnies[]{bunny -> {avatar, name} },orders[]{..., bunny-> {avatar, name}},events[]{...,bunny -> {avatar, name, username, _id}}}`
      : `*[_type == "users" && _id == "${_id}"]`
    const result = await client.fetch(query)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

export const getAllBunnies = async (username) => {
  const user = await getUser(username)
  const { _id } = user
  const data = await client.fetch(`*[_type == "bunnies" && references("${_id}")]`)

  if (!data) {
    console.log('no followers')
  }

  const following = data.map((bunny) => {
    return bunny.name
  })

  try {
    const result = await client.fetch('*[_type == "bunnies"]')

    const bunnies = result.map((bunny) => {
      return {
        _id: bunny._id,
        name: bunny.name,
        username: bunny.username,
        avatar: urlFor(bunny.avatar).url(),
      }
    })
    return {
      following,
      bunnies,
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRecommendedBunnies = async () => {
  try {
    const result = await client.fetch('*[_type == "bunnies" && recommended == true]')
    const bunnies = result.map((bunny) => {
      return {
        _id: bunny._id,
        name: bunny.name,
        username: bunny.username,
        avatar: urlFor(bunny.avatar).url(),
      }
    })
    return bunnies
  } catch (error) {
    console.log(error)
  }
}

export const getBunny = async (_id, username) => {
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
      }
    })

    const isFollowing = bunny[0].followers.includes(username)

    console.log(`${username} is  ${isFollowing ? 'following' : 'not following'}  ${bunny[0].name}`)

    return {
      bunny: bunny[0],
      posts,
      isFollowing,
    }
  } catch (error) {
    console.log(error)
  }
}

export const getBunnyPosts = async (_id) => {
  try {
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

    return posts
  } catch (error) {
    console.log(error)
  }
}

export const getBunnyContext = async (name) => {
  try {
    const result = await client.fetch(`*[_type == "bunnies" && name == "${name}"]`)
    const bunny = result.map((bunny) => {
      const { photos } = bunny
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
      }
    })
    return {
      bunny: bunny[0],
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUserBunnies = async (username) => {
  try {
    const user = await getUser(username, true)
    const { bunnies: data } = user
    if (!data) {
      return []
    }
    const bunnies = data.map((bunnyData) => {
      const { bunny } = bunnyData
      const { name, avatar: url } = bunny
      const avatar = urlFor(url).url()
      console.log(bunny)
      return {
        name,
        avatar,
      }
    })
    return bunnies
  } catch (error) {
    console.error(error)
  }
}

export const createUser = async (username, email) => {
  const user = {
    _type: 'users',
    username,
    email,
    credits: 100,
  }
  try {
    await client.create(user)
  } catch (error) {
    console.log(error)
  }
}

export const likeBunny = async (username, bunny_id) => {
  const newBunny = {
    bunny: {
      _type: 'reference',
      _ref: bunny_id,
    },
    liked: true,
  }
  const result = await client.fetch(`*[_type == "bunnies" && _id == "${bunny_id}"]`)
  const { _id: bunnyToPatch } = result[0]

  try {
    const user = await getUser(username)
    const { _id } = user
    console.log(bunny_id)
    await client
      .patch(_id)
      .setIfMissing({ bunnies: [] })
      .insert('after', 'bunnies[-1]', [newBunny])
      .commit({ autoGenerateArrayKeys: true })
    await client
      .patch(bunnyToPatch)
      .setIfMissing({ followers: [] })
      .insert('after', 'followers[-1]', [
        {
          _type: 'reference',
          _ref: _id,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
  } catch (error) {
    console.error(error)
  }
}

/**
 * Creates a new debit transaction for a user.
 *
 * @param {Object} props - The properties for creating the debit transaction.
 * @param {string} props.user_id - The ID of the user.
 * @param {string} props.bunny_id - The ID of the bunny.
 * @param {string} props.event - The event for the transaction.
 * @return {Promise<void>} A promise that resolves when the debit transaction is created.
 */
export const createNewOrder = async (props) => {
  const { user_id, bunny_id, event } = props

  const getEventAmount = (event) => {
    switch (event) {
      case 'PHOTO':
        return 100
      case 'VIDEO':
        return 200
      case 'DATE':
        return 300
      default:
        return 0
    }
  }

  const amount = getEventAmount(event)

  const newOrder = {
    _type: 'order',
    date: new Date().toISOString(),
    event,
    bunny: {
      _type: 'reference',
      _ref: bunny_id,
    },
    amount,
  }

  try {
    await client
      .patch(user_id)
      .setIfMissing({ orders: [] })
      .insert('after', 'orders[-1]', [newOrder])
      .commit({ autoGenerateArrayKeys: true })
  } catch (error) {
    console.log(error)
  }
}

/**
 * Retrieves the orders associated with a given username.
 *
 * @param {string} username - The username for which to retrieve the orders.
 * @return {Promise<object[]>} An array of objects representing the orders, each containing the following properties:
 *   - _id: The unique identifier of the order.
 *   - date: The date the order was made.
 *   - event: The event associated with the order.
 *   - avatar: The URL of the avatar associated with the order.
 *   - name: The name associated with the order.
 *   - amount: The amount associated with the order.
 */
export const getOrders = async (username) => {
  try {
    const user = await getUser(username, true)
    if (!user) {
      console.log('user not found')
      return
    }
    const { orders: data } = user
    if (!data) {
      return
    }

    const orders = data.map((order) => {
      const { bunny } = order
      const { avatar: url, name } = bunny
      const avatar = urlFor(url).url()

      return {
        _id: order._id,
        date: order.date,
        event: order.event,
        avatar,
        name,
        amount: order.amount,
      }
    })

    return orders
  } catch (error) {
    console.log(error)
  }
}

export const createEvent = async (username, bunny_id, eventtype) => {
  const newEvent = {
    _type: 'event',
    date: new Date().toISOString(),
    eventtype,
    bunny: {
      _type: 'reference',
      _ref: bunny_id,
    },
  }

  try {
    const user = await getUser(username)
    const { _id } = user
    await client
      .patch(_id)
      .setIfMissing({ events: [] })
      .insert('after', 'events[-1]', [newEvent])
      .commit({ autoGenerateArrayKeys: true })

    await createNewOrder({
      user_id: _id,
      bunny_id,
      event: eventtype,
    })
  } catch (error) {
    console.error(error)
  }
}

export const getEvents = async (_id) => {
  try {
    const user = await getUserById(_id, true)
    const { events: data } = user
    if (!data) {
      return []
    }
    const events = data.map((event) => {
      return {
        date: event.date,
        eventtype: event.eventtype,
        avatar: urlFor(event.bunny.avatar).url(),
        name: event.bunny.name,
        username: event.bunny.username,
        bunny_id: event.bunny._id,
      }
    })
    console.log(events)
    return events
  } catch (error) {
    console.error(error)
  }
}

export const getUserCredits = async (username) => {
  const user = await getUser(username)
  const { credits } = user
  return credits
}

/**
 * Decreases the credits of a user by a specified amount.
 *
 * @param {string} username - The username of the user.
 * @param {number} amount - The amount by which to decrease the credits.
 * @return {Promise} The new value of the user's credits after the decrease.
 */
export const decUserCredits = async (username, amount) => {
  const user = await getUser(username)
  const { credits, _id } = user

  const newCredits = credits - amount

  await client.patch(_id).set({ credits: newCredits }).commit()

  return newCredits
}

export const getAllPosts = async () => {
  try {
    const query = `*[_type == "posts"]{..., author-> {name, avatar, username, _id}, likedby[]->{username}}`
    const result = await client.fetch(query)
    const posts = result.map((post) => {
      const { author, likes, text, _createdAt, _id, likedby: likedByData } = post
      const { name, avatar, username: authorUsername, _id: author_id } = author
      const authorAvatar = urlFor(avatar).url()
      const likedBy = likedByData?.map((likedBy) => {
        return likedBy.username
      })

      return {
        _id,
        text,
        image: urlFor(post.image).url(),
        likes,
        likedBy,
        authorAvatar,
        authorName: name,
        authorUsername,
        author_id,
        time: _createdAt,
      }
    })
    return posts
  } catch (error) {
    console.error(error)
  }
}

export const getPostsFromFollowing = async (_id) => {
  try {
    // const user = await getUser(username)
    // const { _id } = user
    const query = `*[_type == "bunnies" && references("${_id}")]{..., posts[]->{...,author->{name, avatar, username, _id}, likedby[]->{username}}}`
    const result = await client.fetch(query)
    const postData = result?.map((bunny) => bunny.posts).flat()
    const posts = postData?.map((post) => {
      const { author, likes, text, _createdAt, _id, likedby: likedByData } = post
      const { name, avatar, username: authorUsername, _id: author_id } = author
      const authorAvatar = urlFor(avatar).url()
      const likedBy = likedByData?.map((likedBy) => {
        return likedBy.username
      })

      return {
        _id,
        text,
        image: urlFor(post.image).url(),
        likes,
        likedBy,
        authorAvatar,
        authorName: name,
        authorUsername,
        author_id,
        time: _createdAt,
      }
    })
    return posts
  } catch (error) {
    console.error(error)
  }
}

export const LikePost = async (post_id, username) => {
  try {
    const user = await getUser(username)
    const { _id } = user
    const newLike = {
      _type: 'reference',
      _ref: _id,
    }

    console.log(newLike)
    await client
      .patch(post_id)
      .setIfMissing({ likes: 0, likedby: [] })
      .inc({ likes: 1 })
      .insert('after', 'likedby[-1]', [newLike])
      .commit({
        autoGenerateArrayKeys: true,
      })
  } catch (error) {
    console.log(error)
  }
}

export const init = async (_id) => {
  try {
    console.log(_id)
    const user = await getUserById(_id, true)

    const { events: userEvents, username } = user
    const bunnyQuery = await client.fetch('*[_type == "bunnies"]{...,followers[] -> {username}}')
    const postsQuery = await client.fetch(
      `*[_type == "posts"]{..., author-> {name, avatar, username, _id}, likedby[]->{username}}`,
    )
    const postsFromFollowingQuery = await client.fetch(
      `*[_type == "bunnies" && references("${_id}")]{..., posts[]->{...,author->{name, avatar, username, _id}, likedby[]->{username}}}`,
    )
    const postData = postsFromFollowingQuery?.map((bunny) => bunny.posts).flat()
    const postsFromFollowing = postData?.map((post) => {
      const { author, likes, text, _createdAt, _id, likedby: likedByData } = post
      const { name, avatar, username: authorUsername, _id: author_id } = author
      const authorAvatar = urlFor(avatar).url()
      const likedBy = likedByData?.map((likedBy) => {
        return likedBy.username
      })

      return {
        _id,
        text,
        image: urlFor(post.image).url(),
        likes,
        likedBy,
        authorAvatar,
        authorName: name,
        authorUsername,
        author_id,
        time: _createdAt,
      }
    })

    const events = userEvents?.map((event) => {
      return {
        date: event.date,
        eventtype: event.eventtype,
        avatar: urlFor(event.bunny.avatar).url(),
        name: event.bunny.name,
        username: event.bunny.username,
        bunny_id: event.bunny._id,
      }
    })
    const bunnies = bunnyQuery.map((bunny) => {
      const { followers: followersData, photos } = bunny
      const reel = photos?.map((photo) => {
        return urlFor(photo).url()
      })
      const followers = followersData.map((follower) => follower?.username)
      const isFollowing = followers.includes(username)
      return {
        _id: bunny._id,
        name: bunny.name,
        username: bunny.username,
        avatar: urlFor(bunny.avatar).url(),
        followers: followers.map((follower) => follower?.username),
        recommended: bunny.recommended,
        bio: bunny.bio,
        isFollowing,
        reel,
      }
    })
    const posts = postsQuery.map((post) => {
      const { author, likes, text, _createdAt, _id, likedby: likedByData } = post
      const { name, avatar, username: authorUsername, _id: author_id } = author
      const authorAvatar = urlFor(avatar).url()
      const likedBy = likedByData?.map((likedBy) => {
        return likedBy.username
      })

      return {
        _id,
        text,
        image: urlFor(post.image).url(),
        likes,
        likedBy,
        authorAvatar,
        authorName: name,
        authorUsername,
        author_id,
        time: _createdAt,
      }
    })

    const recommended = bunnies.filter((bunny) => bunny.recommended)

    return {
      events,
      bunnies,
      posts,
      postsFromFollowing,
      recommended,
    }
  } catch (error) {
    console.error(error)
  }
}
