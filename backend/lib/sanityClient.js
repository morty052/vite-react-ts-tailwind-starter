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

const getUser = async (username, full) => {
  try {
    const query = full
      ? `*[_type == "users" && username == "${username}"]{...,events[]{...,bunny -> {avatar, name}}}`
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
      }
    })
    return bunny[0]
  } catch (error) {
    console.log(error)
  }
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
  try {
    const user = await getUser(username)
    const { _id } = user
    console.log(bunny_id)
    await client
      .patch(_id)
      .setIfMissing({ bunnies: [] })
      .insert('after', 'bunnies[-1]', [
        {
          _type: 'reference',
          _ref: bunny_id,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
  } catch (error) {
    console.error(error)
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
    console.log(bunny_id)
    await client
      .patch(_id)
      .setIfMissing({ events: [] })
      .insert('after', 'events[-1]', [newEvent])
      .commit({ autoGenerateArrayKeys: true })
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
