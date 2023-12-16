import { ChannelList } from 'stream-chat-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
  } = props

  const bunnyAvatarUrl = bunnies.find((bunny) => bunny.name === displayTitle)?.avatar

  function handleChannelSelect() {
    setActiveChannel(channel, watchers)
    setChannel({
      contact: displayTitle,
      avatar: bunnyAvatarUrl,
    })
  }

  return (
    <div onClick={handleChannelSelect} className="">
      <div className="flex gap-x-2">
        <Avatar image={bunnyAvatarUrl} name={displayTitle} />
        <div className="">
          <p className="text-light">{displayTitle}</p>
          <p className="text-xs  text-light"> {latestMessage}</p>
        </div>
      </div>
    </div>
  )
}

const ContactListHeader = () => {
  const navigate = useNavigate()
  return (
    <a onClick={() => navigate(-1)} className="flex gap-x-2 border-b p-2 text-light">
      <span>&#8592;</span>
      <span>Contacts</span>
    </a>
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
    <div className="h-screen bg-black">
      <ContactListHeader />
      <div className="space-y-4 p-2">{children}</div>
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
      {!channell && (
        <ChannelList
          List={CustomList}
          Preview={(props) => <Preview bunnies={contacts} setChannel={setChannel} {...props} />}
          sort={sort}
          filters={filters}
        />
      )}
    </>
  )
}
