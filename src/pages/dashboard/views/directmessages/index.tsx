import React, { useState } from 'react'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { chatClient } from 'src/hooks/useChatClient'
import { DefaultGenerics } from 'stream-chat'
import {
  Avatar,
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChatContext,
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

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

  const Preview = (props) => {
    const { onClick, displayTitle, watchers, channel, setActiveChannel, activeChannel } = props

    function handleChannelSelect() {
      setActiveChannel(channel, watchers)
      setchannel(channel)
    }

    return (
      <div className="">
        <p onClick={handleChannelSelect}>{displayTitle}</p>
      </div>
    )
  }

  const ChatHeader = (props) => {
    const { client, channel } = useChatContext()
    const title = channel?.id
    return (
      <div className="flex items-center gap-x-2">
        <span onClick={() => setchannel(undefined)}>&#8592;</span>
        <div className="flex items-center gap-x-2">
          <Avatar name="John Doe" />
          <span>{title}</span>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative -mt-20 flex h-screen flex-col">
      <Chat client={chatClient}>
        {!channel && <ChannelList Preview={Preview} filters={filters} options={options} />}
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
