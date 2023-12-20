import { Calendar, LogOutIcon, MessageCircleIcon, RabbitIcon, UserCircle, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useChatContextParams } from 'src/contexts/ChatContext'

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
    name: 'wallet',
    path: 'wallet',
    icon: <Wallet size={28} />,
  },
]

const SidebarHeader = () => {
  const { username } = useChatContextParams()
  const UserTokens = () => {
    return (
      <div className="flex items-center gap-x-2 ">
        <RabbitIcon size={28} color="pink" />
        <span className="text-2xl font-bold">100.00</span>
      </div>
    )
  }

  const Initial = username?.charAt(0)?.toUpperCase()

  const UserAvatar = () => {
    return (
      <div className="grid h-12 w-12 place-content-center rounded-full border-4 border-dark bg-white ">
        <div className=" text-2xl font-black text-dark">{Initial}</div>
      </div>
    )
  }

  return (
    <div className="mb-4 justify-center space-y-4 lg:w-full ">
      <div className="items-center  justify-between lg:flex lg:px-2  ">
        <UserAvatar />
        <div className="hidden lg:block">
          <UserTokens />
        </div>
      </div>
    </div>
  )
}

const SidebarLink = ({ name, path, icon }: { name: string; path: string; icon: React.ReactNode }) => {
  return (
    <Link to={path} className=" items-center gap-x-4 lg:flex">
      <div className="grid h-12 w-12 place-content-center rounded-full border border-red-400">{icon}</div>
      <span className="hidden flex-1 lg:block">{name}</span>
    </Link>
  )
}

const SignOutButton = () => {
  return (
    <button className="ml-2 mt-10 grid h-12 w-12 place-content-center rounded-full border border-red-400">
      <LogOutIcon />
    </button>
  )
}

const SidebarLinksContainer = () => {
  return (
    <div className="flex flex-col gap-y-10 px-2  pt-4 lg:items-start">
      {sidebarLinks.map((link) => (
        <SidebarLink key={link.name} name={link.name} path={link.path} icon={link.icon} />
      ))}
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 z-20 hidden w-24 border-r bg-black sm:block lg:w-64">
      <div className="flex flex-col  items-center pt-4 text-light lg:items-start ">
        <SidebarHeader />
        <SidebarLinksContainer />
        <SignOutButton />
      </div>
    </div>
  )
}
