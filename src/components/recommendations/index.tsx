import React, { useEffect, useState } from 'react'
import { MoreVertical, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useLocation } from 'react-router-dom'

type ReccomendationCardProps = {
  name: string
  avatar: string
  username: string
}

const SearchBar = () => {
  return (
    <>
      <search className="flex w-full max-w-sm items-center rounded-md border px-4 ">
        <input
          placeholder="Search Bunnies"
          className="w-full bg-transparent py-2 text-light placeholder:text-sm  focus:outline-none focus:ring-0"
          type="text"
        />
        <Search color="white" />
      </search>
    </>
  )
}

const ReccomendationCard = ({ name, avatar, username }: ReccomendationCardProps) => {
  const MenuButton = () => {
    return (
      <div className="absolute right-0 top-2 flex justify-end ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical color="white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add to bunnies</DropdownMenuItem>
            <DropdownMenuItem>Subscribe</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="relative min-h-[128px]  w-full max-w-sm rounded-md border  ">
      <MenuButton />
      <img
        className="absolute bottom-2 left-2 z-10 h-24 w-24 rounded-full border-2 object-cover"
        src="https://cdn.sanity.io/images/i7m1o5ma/production/106cbd4ddf628480eb902a8f2473f032f162aa6c-1038x1280.jpg"
        alt=""
      />
      <img
        className=" h-[132px] w-[384px]  rounded-md object-cover"
        src="https://cdn.sanity.io/images/i7m1o5ma/production/a3506418e9de9bce024f9fcc9828d5fa96c381d9-1032x1280.jpg"
        alt=""
      />
      <div className="absolute inset-x-0 bottom-0 top-[60%] flex justify-end bg-black/50 px-2 ">
        <div className="">
          <p className="font-semibold text-light">{name}</p>
          <p className="text-xs text-light">@{username}</p>
        </div>
      </div>
    </div>
  )
}

const Reccomendations = ({ recommended }: { recommended: any }) => {
  return (
    <div className="space-y-4">
      <p className="primary-text">Recommended</p>
      {recommended?.map((bunny: any, index: number) => (
        <ReccomendationCard {...bunny} key={index} />
      ))}
    </div>
  )
}

export function RecommendationBar() {
  const [recommended, setRecommended] = useState([])

  const path = useLocation().pathname

  const isProfile = path.includes('bunny')

  async function getRecommended() {
    const res = await fetch('http://192.168.100.16:3000/bunny/recommended')
    const data = await res.json()
    const { bunnies } = data
    setRecommended(bunnies)
  }

  useEffect(() => {
    getRecommended()
  }, [])

  return (
    <div className=" col-span-3  hidden min-h-screen space-y-4 border-l bg-black px-2 lg:block">
      <div className="sticky top-0 flex flex-col items-center gap-y-4 pt-4">
        {!isProfile && <SearchBar />}
        <Reccomendations recommended={recommended} />
      </div>
    </div>
  )
}
