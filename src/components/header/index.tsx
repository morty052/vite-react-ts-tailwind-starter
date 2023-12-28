import React, { useMemo, useState } from 'react'
import { Link2, MoreVertical, Search, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import toast from 'react-hot-toast'

interface IheaderProps {
  isProfile?: boolean
  bunnyName?: string
  base?: boolean
  bunnies: any
}

function CustomizationTextArea({ message, setMessage }: any) {
  return (
    <div className="w-full max-w-md space-y-2 rounded-lg border bg-white p-2">
      <textarea
        placeholder="how can we help."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        className="text_area relative w-full rounded-md bg-transparent   px-2 text-dark  focus:outline-none"
      ></textarea>
    </div>
  )
}

function ContactUsModal(props: any) {
  const { open, setOpen, handleSendMessage } = props

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState('')

  function handleConfirmation() {
    setMessages('')
    handleSendMessage(messages)
  }
  function handleClose() {
    setMessages('')
    setOpen(false)
    // handleCreateEvent({ CustomRequest, selectedTags, eventName })
  }

  function ConfirMationButton() {
    return (
      <div className=" space-y-2">
        {/* <p className="text-center text-light ">Spend {photo_price} to order a custom photo </p> */}
        <Button className="w-full max-w-md bg-fuchsia-500" onClick={() => handleConfirmation()} size={'lg'}>
          {loading ? 'Confirming...' : 'Confirm'}
        </Button>
        <p className="text-center text-xs">Please check your email for your ticket after enquiry.</p>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <div className="relative mt-4 px-2 text-light">
          <div className="  flex rounded-lg bg-dark px-2 py-6">
            <div className="mx-auto w-full max-w-md  space-y-6 ">
              <div className="">
                <p className="font-medium">Contact us</p>
                <p className="text-sm">Leave us a message</p>
              </div>
              <CustomizationTextArea messages={messages} setMessage={setMessages} />
              <ConfirMationButton />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const MenuDropDown = ({ name }) => {
  const [open, setOpen] = useState(false)
  function handleSendMessage(message: string) {
    if (!message) {
      setOpen(false)
      return
    }
    toast("We'll get back to you shortly")
    setOpen(false)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical color="white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-blue-700" />
        <Link className="cursor-pointer" to={'bookmarks'}>
          <DropdownMenuItem>Bookmarks</DropdownMenuItem>
        </Link>
        <Link className="cursor-pointer" to={'notifications'}>
          <DropdownMenuItem>Notifications</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => setOpen(true)}>Contact us</DropdownMenuItem>
        {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
      <ContactUsModal
        handleSendMessage={(message: string) => handleSendMessage(message)}
        open={open}
        setOpen={setOpen}
      />
    </DropdownMenu>
  )
}

const SearchResult = ({ avatar, name, username, _id, setSearching, setQuery }) => {
  return (
    <Link
      onClick={() => {
        setSearching(false)
        setQuery('')
      }}
      to={`/dashboard/bunny/${_id}`}
      className="flex items-center gap-x-2 border-y px-2 py-2 first:border-t-0 "
    >
      <img className="h-10 w-10 rounded-full object-cover" src={avatar} alt="" />
      <div className="flex flex-1 items-center justify-between">
        <div className="">
          <p className="first-letter:uppercase">{name}</p>
          <p>@{username}</p>
        </div>
        <Link2 />
      </div>
    </Link>
  )
}

const SearchInput = ({
  setSearching,
  searching,
  bunnies,
}: {
  setSearching: (b: boolean) => void
  searching: boolean
  bunnies: { name: string; avatar: string; username: string; _id: string }[]
}) => {
  const [query, setQuery] = useState('')

  // const results = useMemo(() => query && bunnies?.filter((b) => b.name.includes(query)), [query, bunnies])
  const results = query && bunnies?.filter((b) => b.name.includes(query))

  return (
    <>
      {searching && (
        <>
          <div className=" w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="w-full rounded-t-md p-2"
            />
            <div className="rounded-b-md border  bg-white py-2">
              {!query && <p className="text-center">Search for bunnies</p>}
              {query && results.length === 0 && <p className="text-center">No Results</p>}

              {results &&
                results.map((b) => (
                  <SearchResult
                    setQuery={setQuery}
                    setSearching={setSearching}
                    key={b._id}
                    _id={b._id}
                    username={b.username}
                    name={b.name}
                    avatar={b.avatar}
                  />
                ))}
            </div>
          </div>
          <X
            onClick={() => {
              setSearching(false)
            }}
            color="white"
            size={20}
          />
        </>
      )}
    </>
  )
}

const DefaultHeaderButtons = ({
  setSearching,
  searching,
}: {
  setSearching: (b: boolean) => void
  searching: boolean
}) => {
  return (
    <>
      {!searching && (
        <>
          <div className="flex flex-row items-center gap-x-2 ">
            <Search className="lg:hidden" onClick={() => setSearching(!searching)} color="white" />
            <MenuDropDown name="Menu" />
          </div>
        </>
      )}
    </>
  )
}

const ProfileHeader = ({ bunnyName }) => {
  const navigate = useNavigate()
  return (
    <div className="sticky inset-x-0 top-0 z-10 border-b border-white/20 bg-black shadow-lg shadow-white/10 ">
      <div className="flex items-center justify-between px-2 py-4">
        <a onClick={() => navigate(-1)} className="flex items-center gap-x-2">
          <span className="text-light">&#8592;</span>
          <p className="text-light first-letter:uppercase">{bunnyName}</p>
        </a>
        <MoreVertical color="white" />
      </div>
    </div>
  )
}

// TODO: MAKE HEADER DYNAMIC
export function Header({ bunnies }) {
  const [searching, setSearching] = useState(false)
  // const { isProfile, bunnyName, base, bunnies } = props ?? {}
  const path = useLocation().pathname
  const isProfile = path.includes('bunny')
  const isBookmarks = path.includes('bookmarks')
  const isNotifications = path.includes('notifications')

  const isSecondaryHeader = useMemo(() => {
    if (isProfile) {
      return true
    }
    if (path.includes('wallet')) {
      return true
    }
    if (path.includes('packages')) {
      return true
    }
    if (path.includes('bookmarks')) {
      return true
    }
    if (path.includes('notifications')) {
      return true
    }
    return false
  }, [path])

  const isSettings = useMemo(() => {
    if (path.includes('profile')) {
      return true
    }
    return false
  }, [path])

  const bunny_id = isProfile ? path.replace('/dashboard/bunny/', '') : ''
  const bunny = bunnies?.find((b) => b._id === bunny_id)
  const { name: bunnyName } = bunny ?? {}

  const navigate = useNavigate()
  const Backbutton = () => {
    return (
      <>
        {/* {isProfile ||
          (isWallet && (
          ))} */}
        <a onClick={() => navigate(-1)} className="flex items-center gap-x-2">
          <span className="text-light">&#8592;</span>
          {!isBookmarks && !isNotifications && (
            <p className="text-light first-letter:uppercase">{isProfile ? bunnyName : 'Back'}</p>
          )}
          {isBookmarks && <p className="text-light first-letter:uppercase">{'Bookmarks'}</p>}
          {isNotifications && <p className="text-light first-letter:uppercase">{'Notifications'}</p>}
        </a>
      </>
    )
  }
  return (
    <>
      <div className="sticky inset-x-0 top-0 z-10 border-b border-white/20 bg-black  ">
        {!isSettings && (
          <div className="flex items-center justify-between px-2 py-4">
            {!isSecondaryHeader ? <p className="primary-text">Bunnies</p> : <Backbutton />}
            <SearchInput searching={searching} bunnies={bunnies} setSearching={setSearching} />
            <DefaultHeaderButtons searching={searching} setSearching={setSearching} />
          </div>
        )}
        {isSettings && (
          <div className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center gap-x-2 text-light" onClick={() => navigate(-1)}>
              <span>&#8592;</span>
              <span>Back</span>
            </div>
            {/* <button className="">Save</button> */}
          </div>
        )}
      </div>
    </>
  )
}
