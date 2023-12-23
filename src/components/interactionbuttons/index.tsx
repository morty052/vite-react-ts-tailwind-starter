import { MessageCircle, UserPlus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { createChat } from 'src/hooks/useChatClient'

type TaddContactProps = {
  user: string
  authorName: string
  author_id: string
  authorAvatar: string
}

export function AddContact(props: TaddContactProps) {
  const { user, authorName, author_id, authorAvatar } = props

  function handleAddBunny() {
    createChat(user, authorName, author_id, authorAvatar)
  }

  return (
    <div>
      <button onClick={handleAddBunny} className="flex gap-x-2">
        <UserPlus size={28} color="white" />
      </button>
    </div>
  )
}

type TchatButtonProps = {
  bunny_id: string
}

export function ChatButton({ bunny_id }: TchatButtonProps) {
  const chatUrl = `/dashboard/directmessages?bunny_id=${bunny_id}`

  return (
    <div>
      <Link to={chatUrl} className="flex gap-x-2">
        <MessageCircle size={28} color="white" />
      </Link>
    </div>
  )
}
