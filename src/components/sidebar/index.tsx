import { Bell, Calendar, LogOutIcon, MessageCircleIcon, RabbitIcon, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const sidebarLinks = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: <RabbitIcon size={28} />,
  },
  {
    name: 'events',
    path: 'calendar',
    icon: <Calendar size={28} />,
  },
  {
    name: 'messages',
    path: 'directmessages',
    icon: <MessageCircleIcon size={28} />,
  },
  {
    name: 'profile',
    path: 'profile',
    icon: <UserCircle size={28} />,
  },
  {
    name: 'notifications',
    path: 'notifications',
    icon: <Bell size={28} />,
  },
]

const SidebarLink = ({ name, path, icon }: { name: string; path: string; icon: React.ReactNode }) => {
  return (
    <div className=" items-center gap-x-4 lg:flex">
      <Link to={path} className="grid h-12 w-12 place-content-center rounded-full border border-red-400">
        {icon}
      </Link>
      <span className="hidden flex-1 lg:block">{name}</span>
    </div>
  )
}

const SignOutButton = () => {
  return (
    <button className="mt-2 grid h-12 w-12 place-content-center rounded-full border border-red-400">
      <LogOutIcon />
    </button>
  )
}

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 z-20 hidden w-24 border-r bg-black sm:block lg:w-64">
      <div className="primary-text flex flex-col items-center gap-y-10 px-2 pt-4 lg:items-start">
        <div className="h-12 w-12 rounded-full border "></div>
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.name} name={link.name} path={link.path} icon={link.icon} />
        ))}
        <SignOutButton />
      </div>
    </div>
  )
}
