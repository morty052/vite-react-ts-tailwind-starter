import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { chatClient } from 'src/hooks/useChatClient'

const ChatContext = createContext({
  username: null,
})

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user, isLoaded } = useUser()

  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  const username: string = user?.username

  async function getToken() {
    const res = await fetch(`http://localhost:3000/chat/token?user_id=${username}`)
    const data = await res.json()
    const { token } = data
    setToken(token)
    setLoading(false)
    return token
  }

  const connectUser = async () => {
    try {
      const token = await getToken()
      await chatClient.connectUser(
        {
          id: username,
          name: username,
          image: 'https://i.pravatar.cc/300',
        },
        token,
      )
      console.log('Connected!')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      return
    }
    connectUser()
  }, [isLoaded])

  return <ChatContext.Provider value={{ username, loading }}>{children}</ChatContext.Provider>
}

export const useChatContextParams = () => useContext(ChatContext)
