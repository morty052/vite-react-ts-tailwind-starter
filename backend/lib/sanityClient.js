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
      ? `*[_type == "users" && username == "${username}"]{...,bunnies[]{bunny -> {avatar, name} },orders[]{..., bunny-> {avatar, name}},events[]{...,bunny -> {avatar, name}}}`
      : `*[_type == "users" && username == "${username}"]`
    const result = await client.fetch(query)
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

export const getAllBunnies = async () => {
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
    console.log('sending bunnies')
    return bunnies
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
    console.log('sending bunnies')
    return bunnies
  } catch (error) {
    console.log(error)
  }
}

export const getBunny = async (_id) => {
  try {
    const result = await client.fetch(`*[_type == "bunnies" && _id == "${_id}"]`)
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
    return bunny[0]
  } catch (error) {
    console.log(error)
  }
}

export const getUserBunnies = async (username) => {
  const user = await getUser(username, true)
  const { bunnies: data } = user
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
}

export const createUser = async (username, email) => {
  const user = {
    _type: 'users',
    username,
    email,
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

  try {
    const user = await getUser(username)
    const { _id } = user
    console.log(bunny_id)
    await client
      .patch(_id)
      .setIfMissing({ bunnies: [] })
      .insert('after', 'bunnies[-1]', [newBunny])
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

export const getEvents = async (username) => {
  try {
    console.log(username)
    const user = await getUser(username, true)
    const { events: data } = user
    if (!data) {
      return
    }
    const events = data.map((event) => {
      return {
        date: event.date,
        eventtype: event.eventtype,
        avatar: urlFor(event.bunny.avatar).url(),
        name: event.bunny.name,
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
