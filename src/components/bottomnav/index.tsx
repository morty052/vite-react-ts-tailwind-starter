import { Bell, Calendar, MessageCircleIcon, Rabbit, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-white sm:hidden">
      <div className="flex justify-between p-2">
        <Link to={'/dashboard'}>
          <Rabbit />
        </Link>
        <Link to={'notifications'}>
          <Bell />
        </Link>
        <Link to={'calendar'}>
          <Calendar />
        </Link>
        <Link to={'directmessages'}>
          <MessageCircleIcon />
        </Link>
        <Link to={'profile'}>
          <UserCircle />
        </Link>
      </div>
    </div>
  )
}
