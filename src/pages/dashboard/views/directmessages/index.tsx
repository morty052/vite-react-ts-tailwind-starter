import React, { useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { chatClient } from 'src/hooks/useChatClient'
import { DefaultGenerics } from 'stream-chat'
import { Avatar, Channel, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import { Contacts } from './components'

export function DirectMessages() {
  const [channel, setchannel] = useState<DefaultGenerics | undefined>(undefined)
  // const { client } = useChatContext()
  const { username, loading } = useChatContextParams()

  const filters = { members: { $in: [username] } }
  const options = { state: true, limit: 10 }
  const sort = { last_message_at: -1 }

  // const connectUser = async () => {
  //   if (token) {
  //     try {
  //       await chatClient.connectUser(
  //         {
  //           id: 'John-Doe',
  //           name: 'John Doe',
  //           image: 'https://i.pravatar.cc/300',
  //         },
  //         token,
  //       )
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (!token) {
  //     return
  //   }

  //   async function createChannel() {
  //     await connectUser()
  //   }

  //   createChannel()
  // }, [token])

  const ChatHeader = (props) => {
    const { contact, avatar } = channel ?? {}

    return (
      <div className="flex items-center gap-x-2 p-2">
        <span onClick={() => setchannel(undefined)}>&#8592;</span>
        <div className="flex items-center gap-x-2">
          <Avatar image={avatar} name={contact} />
          <span>{contact}</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative -mt-20 flex h-screen flex-col">
      <Chat theme="str-chat__theme-dark" client={chatClient}>
        <Contacts username={username} channell={channel} setChannel={setchannel} sort={sort} filters={filters} />
        {channel && (
          <Channel>
            <Window>
              {/* <ChannelHeader /> */}
              <ChatHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        )}
      </Chat>
    </div>
  )
}
