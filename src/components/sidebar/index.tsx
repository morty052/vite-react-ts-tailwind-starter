import { Calendar, LogOutIcon, MessageCircleIcon, RabbitIcon, UserCircle, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { SignOutButton as ClerkSignOutButton } from '@clerk/clerk-react'

const sidebarLinks = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: <RabbitIcon size={34} />,
  },
  {
    name: 'events',
    path: 'calendar',
    icon: <Calendar size={34} />,
  },
  {
    name: 'messages',
    path: 'directmessages',
    icon: <MessageCircleIcon size={34} />,
  },
  {
    name: 'profile',
    path: 'profile',
    icon: <UserCircle size={34} />,
  },
  {
    name: 'wallet',
    path: 'wallet',
    icon: <Wallet size={34} />,
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
    <div className="mb-4 justify-center space-y-4 xl:w-full ">
      <div className="items-center  justify-between lg:px-2 xl:flex  ">
        <UserAvatar />
        {/* <div className="hidden xl:block">
          <UserTokens />
        </div> */}
      </div>
    </div>
  )
}

const SidebarLink = ({ name, path, icon }: { name: string; path: string; icon: React.ReactNode }) => {
  return (
    <Link to={path} className=" items-center gap-x-4 xl:flex">
      <div className="grid h-12 w-12 place-content-center rounded-full ">{icon}</div>
      <span className="hidden flex-1 text-xl font-semibold first-letter:uppercase xl:block">{name}</span>
    </Link>
  )
}

const SignOutButton = () => {
  return (
    <ClerkSignOutButton signOutCallback={() => window.location.replace('/')}>
      <button className="ml-2 mt-10 grid h-12 w-12 place-content-center rounded-full ">
        <LogOutIcon size={34} />
      </button>
    </ClerkSignOutButton>
  )
}

const SidebarLinksContainer = () => {
  return (
    <div className="flex flex-col gap-y-10  px-2  pt-4 xl:items-start">
      {sidebarLinks.map((link) => (
        <SidebarLink key={link.name} name={link.name} path={`${link.path}`} icon={link.icon} />
      ))}
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="hidden min-h-screen w-24 border-r border-white/10 sm:block    xl:w-72  ">
      <div className="flex flex-col items-center  pt-4 text-light xl:items-start ">
        <SidebarHeader />
        <SidebarLinksContainer />
        <SignOutButton />
      </div>
    </div>
  )
}
