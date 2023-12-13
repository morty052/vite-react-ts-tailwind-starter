import { useState } from 'react'
import { StreamChat } from 'stream-chat'

export const chatClient = new StreamChat('4tfg8w9fwvvu')

export async function createChat(user: string, newContact: string) {
  const channel = chatClient.channel('messaging', {
    members: [`${user}`, `${newContact}`],
  })
  try {
    await channel.create()
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
