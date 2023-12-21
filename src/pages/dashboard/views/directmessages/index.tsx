import React, { useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { chatClient } from 'src/hooks/useChatClient'
import { DefaultGenerics } from 'stream-chat'
import { Avatar, Channel, Chat, MessageInput, MessageList, Thread, Window, useChatContext } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import { ChatContextWindow, Contacts } from './components'

export function DirectMessages() {
  const [channel, setchannel] = useState<DefaultGenerics | undefined>(undefined)

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

  const ChatHeader = () => {
    // const { contact, avatar } = channel ?? {}
    const { channel } = useChatContext()

    const { data, state } = channel

    const { image, name } = data

    return (
      <div className="flex items-center gap-x-2 border-b p-2 ">
        <span className="sm:hidden" onClick={() => setchannel(undefined)}>
          &#8592;
        </span>
        <div className="flex items-center gap-x-2">
          <Avatar image={image} name={''} />
          <span className="text-light first-letter:uppercase">{name}</span>
        </div>
      </div>
    )
  }

  function ChatWindow() {
    if (!channel) {
      return (
        <div
          className={` flex h-screen items-center justify-center  border  sm:col-span-8 xl:col-span-6  ${
            !channel && 'hidden lg:block'
          } `}
        >
          <div className="flex h-full items-center justify-center border    pb-64">
            <div className="">
              <p className="primary-text text-center">No Active channel</p>
              <p className="text-center text-light">Select a chat to view messages</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={`col-span-8 h-screen xl:col-span-6   ${!channel && 'hidden lg:block'}  `}>
        <Channel>
          <Window>
            <ChatHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </div>
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative    lg:-mt-0">
      <Chat theme="str-chat__theme-dark" client={chatClient}>
        <div className="grid-cols-12 lg:grid">
          <Contacts username={username} channell={channel} setChannel={setchannel} sort={sort} filters={filters} />
          <ChatWindow />
          <ChatContextWindow />
        </div>
      </Chat>
    </div>
  )
}
