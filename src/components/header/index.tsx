import React, { useMemo, useState } from 'react'
import { Link2, MoreVertical, Search, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface IheaderProps {
  isProfile: boolean
  bunnyName: string
  base: boolean
}

const MenuDropDown = ({ name }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical color="white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem> Settings </DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
        <DropdownMenuItem>Contact us</DropdownMenuItem>
        {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const SearchResult = ({ avatar, name, username, _id }) => {
  return (
    <Link to={`/dashboard/bunny/${_id}`} className="flex items-center gap-x-2 border-y px-2 py-2 first:border-t-0 ">
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
  bunnies,
}: {
  setSearching: (b: boolean) => void
  bunnies: { name: string; avatar: string; username: string; _id: string }[]
}) => {
  const [query, setQuery] = useState('')

  const results = useMemo(() => query && bunnies.filter((b) => b.name.includes(query)), [query, bunnies])

  return (
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
              <SearchResult key={b._id} _id={b._id} username={b.username} name={b.name} avatar={b.avatar} />
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
  )
}

const DefaultHeader = ({ bunnies }) => {
  const [searching, setSearching] = useState(false)
  return (
    <div className="sticky inset-x-0 top-0 z-10 border-b border-white/20 bg-black  ">
      <div className="flex items-center justify-between px-2 py-4">
        {searching && <SearchInput bunnies={bunnies} setSearching={setSearching} />}
        {!searching && (
          <>
            <p className="primary-text">Bunnies</p>
            <div className="flex flex-row items-center gap-x-2 ">
              <Search className="md:hidden" onClick={() => setSearching(!searching)} color="white" />
              <MenuDropDown name="Menu" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const ProfileHeader = ({ bunnyName }) => {
  const navigate = useNavigate()
  return (
    <div className="sticky inset-x-0 top-0 z-10 border-b border-white/20 bg-black shadow-lg shadow-white/10 lg:hidden">
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

export function Header(props: IheaderProps) {
  const { isProfile, bunnyName, base, bunnies } = props ?? {}
  return (
    <>
      {base && <DefaultHeader bunnies={bunnies} />}
      {isProfile && <ProfileHeader bunnyName={bunnyName} bunnies={bunnies} />}
    </>
  )
}
