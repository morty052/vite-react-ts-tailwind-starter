import { ChannelList, useChatContext } from 'stream-chat-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MessageCircle, Search, Video } from 'lucide-react'

type ContactsProps = {
  sort: any
  filters: any
  Preview?: any
  setChannel: any
  channell: any
  username: string
}

const getUserContacts = async (username, setContacts) => {
  const res = await fetch(`http://192.168.100.16:3000/users/get-user-bunnies?username=${username}`)
  const data = await res.json()
  const { bunnies } = data
  setContacts(bunnies)
  console.log(bunnies)
}

const Preview = (props) => {
  const {
    onClick,
    displayTitle,
    watchers,
    channel,
    setActiveChannel,
    activeChannel,
    latestMessage,
    setChannel,
    Avatar,
    bunnies,
    image,
  } = props

  const { channel: MainChannel } = useChatContext()

  const bunnyAvatarUrl = bunnies.find((bunny) => bunny.name === displayTitle)?.avatar

  function handleChannelSelect() {
    setActiveChannel(channel, watchers)
    setChannel({
      contact: displayTitle,
      avatar: bunnyAvatarUrl,
    })
  }

  return (
    <div className="flex w-full items-center justify-between  p-2 ">
      <div onClick={handleChannelSelect} className="flex items-center gap-x-2">
        <Avatar image={bunnyAvatarUrl} name={displayTitle} />
        <div className="">
          <p className="text-light first-letter:uppercase">{displayTitle}</p>
          <p className="text-xs  text-light"> {latestMessage}</p>
        </div>
      </div>

      <div className="flex gap-x-6">
        <MessageCircle className="cursor-pointer" onClick={handleChannelSelect} />
        <Video className="cursor-pointer" />
      </div>
    </div>
  )
}

const ContactListHeader = () => {
  const navigate = useNavigate()
  return (
    <div className="flex  justify-between  p-2">
      <a onClick={() => navigate(-1)} className="flex gap-x-2  text-light">
        <span>&#8592;</span>
        <span>Contacts</span>
      </a>

      <Search />
    </div>
  )
}

const CustomList = (props) => {
  const { children, error, loading, LoadingErrorIndicator, LoadingIndicator } = props

  if (error) {
    return <LoadingErrorIndicator text="Loading Error - check your connection." type="connection" />
  }

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <div className=" h-screen bg-dark">
      <ContactListHeader />
      <div className="space-y-4 p-2">{children}</div>
    </div>
  )
}

const NoContactScreens = () => {
  return (
    <div className=" border">
      <div className="p">No Contacts yet</div>
      <p>
        Add <Link to={'/dashboard'}>bunnies</Link> to begin chatting
      </p>
    </div>
  )
}

export function Contacts(props: ContactsProps) {
  const { sort, filters, setChannel, channell, username } = props
  const [contacts, setContact] = useState([])

  useEffect(() => {
    if (!username) {
      return
    }
    getUserContacts(username, setContact)
  }, [username])

  return (
    <>
      <div className={`col-span-4 xl:col-span-3 ${channell && 'hidden lg:block'}`}>
        <ChannelList
          EmptyStateIndicator={NoContactScreens}
          List={CustomList}
          Preview={(props) => <Preview bunnies={contacts} setChannel={setChannel} {...props} />}
          sort={sort}
          filters={filters}
        />
      </div>
    </>
  )
}
