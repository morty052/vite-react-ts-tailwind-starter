import { useState } from 'react'
import { StreamChat } from 'stream-chat'

export const chatClient = new StreamChat('4tfg8w9fwvvu')

export async function createChat(user: string, newContact: string, bunny_id: string, image: string) {
  const channel = chatClient.channel('messaging', {
    members: [`${user}`, `${newContact}`],
    image: image,
    name: newContact,
  })

  const addBunnyToContacts = async () => {
    const res = await fetch(`http://localhost:3000/users/likebunny?username=${user}&bunny_id=${bunny_id}`)
    const data = await res.json()
    console.log(data)
  }
  try {
    await channel.create()
    await addBunnyToContacts()
    console.log('Channel Created!')
  } catch (error) {
    console.log(error)
  }
}

export const useChatClient = () => {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  // async function getToken() {
  //   const res = await fetch(`http://localhost:3000/chat/token?user_id=${username}`)
  //   const data = await res.json()
  //   const { token } = data
  //   setToken(token)
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   getToken()
  // }, [])

  return {
    chatClient,
    // token,
    // loading,
  }
}
