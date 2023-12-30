import React, { useMemo, useState } from 'react'
import { Link2, MoreVertical, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useChatContextParams } from 'src/contexts/ChatContext'
import { Button } from '../ui/button'
import { EventBooker } from '../eventbooker'

type ReccomendationCardProps = {
  name: string
  avatar: string
  username: string
  _id: string
  cover: string
}

function BunnyCarousel({ recommended }: { recommended: any }) {
  const stackItem = recommended?.slice(0, 3)
  const stackItem_2 = recommended?.slice(3, 6)

  const ReccommendedStack = ({ stack }: { stack: any[] }) => {
    return (
      <div className="space-y-2">
        <ReccomendationCard {...stack?.[0]} />
        <ReccomendationCard {...stack?.[1]} />
        <ReccomendationCard {...stack?.[2]} />
      </div>
    )
  }

  return (
    <>
      <div className=" flex w-[95%] items-start">
        <p className="primary-text text-left">Recommended</p>
      </div>
      <Carousel className=" mt-2 w-[95%]">
        <CarouselContent>
          {/* {stackItem?.map((bunny: any, index: number) => (
        ))} */}
          <CarouselItem className="">
            <ReccommendedStack stack={stackItem} />
          </CarouselItem>
          <CarouselItem className="">
            <ReccommendedStack stack={stackItem_2} />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className=" " />
        <CarouselNext />
      </Carousel>
    </>
  )
}

const SearchResult = ({ avatar, name, username, _id, setQuery }) => {
  return (
    <Link
      onClick={() => {
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

const SearchBar = ({ bunnies }) => {
  const [query, setQuery] = useState('')

  const results = useMemo(() => query && bunnies.filter((b) => b.name.includes(query)), [query, bunnies])
  return (
    <div className="relative w-full max-w-sm">
      <search className=" flex w-full  items-center rounded-md border px-4 ">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Bunnies"
          className="w-full bg-transparent py-2 text-light placeholder:text-sm  focus:outline-none focus:ring-0"
          type="text"
        />
        <Search color="white" />
      </search>
      {query && (
        <div className="absolute inset-x-0 z-50  ">
          <div className="z-50 mt-1 rounded-md bg-white p-2">
            {!query && <p className="text-center">Search for bunnies</p>}
            {query && results.length === 0 && <p className="text-center">No Results</p>}

            {results &&
              results.map((b) => (
                <SearchResult
                  setQuery={setQuery}
                  key={b._id}
                  _id={b._id}
                  username={b.username}
                  name={b.name}
                  avatar={b.avatar}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

const ReccomendationCard = ({ name, avatar, username, _id, cover }: ReccomendationCardProps) => {
  const navigate = useNavigate()
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
            <DropdownMenuItem>Bookmark</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Block</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="relative min-h-[128px]  w-full max-w-sm rounded-md border  ">
      {/* TODO: add menu */}
      {/* <MenuButton /> */}
      <img
        onClick={() => navigate(`/dashboard/bunny/${_id}`)}
        className="absolute bottom-2 left-2 z-10 h-24 w-24 cursor-pointer rounded-full border-2 object-cover"
        src={avatar}
        alt=""
      />
      <img className=" h-[132px] w-[384px]  rounded-md object-cover" src={cover} alt="" />
      <div
        onClick={() => navigate(`/dashboard/bunny/${_id}`)}
        className="absolute inset-x-0 bottom-0 top-[60%] flex justify-end bg-black/50 px-2 "
      >
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

function SubscriptionStatus() {
  return (
    <>
      <div className="w-full  ">
        <div className="mx-auto max-w-sm space-y-4">
          <p className="primary-text">Subscription</p>
          <Button className="bg-fuchsia-500" size={'lg'}>
            Subscribe
          </Button>
        </div>
      </div>
    </>
  )
}

export function RecommendationBar({ bunnies, recommended }: any) {
  const { username } = useChatContextParams()

  const path = useLocation().pathname

  const isProfile = path.includes('bunny')

  const bunny_id = useLocation().pathname.replace('/dashboard/bunny/', '')

  const bunny = useMemo(() => {
    if (isProfile) {
      return bunnies?.find((b) => b._id === bunny_id)
    }
  }, [isProfile, bunny_id, bunnies])
  const { avatar, name, _id, bio, username: bunny_username, pricing } = bunny ?? {}
  console.log(bunny)

  async function getRecommended() {
    const res = await fetch('http://192.168.100.16:3000/bunny/recommended')
    const data = await res.json()
    const { bunnies } = data
    setRecommended(bunnies)
  }

  async function getBunnies() {
    const res = await fetch(`http://192.168.100.16:3000/bunny/allbunnies?username=${username}`)
    const bunnies = await res.json()
    setBunnies(bunnies.bunnies)
  }

  // useEffect(() => {
  //   if (!username) {
  //     return
  //   }

  //   getRecommended()
  //   getBunnies()
  // }, [username])

  return (
    <div className=" scrollbar-hidden  hidden h-screen w-full max-w-sm space-y-4  overflow-scroll border-l  border-white/10  px-2 lg:block">
      <div className="flex  flex-col items-center gap-y-2 py-4">
        <SearchBar bunnies={bunnies} />
        {/* {isProfile && <SubscriptionStatus />} */}
        {isProfile && (
          <EventBooker
            bunny_username={bunny_username}
            bunny_name={name}
            avatar={avatar}
            pricing={pricing}
            bunny_id={_id as string}
          />
        )}
        {!isProfile && <BunnyCarousel recommended={recommended} />}
        {/* {<Reccomendations recommended={recommended} />} */}
      </div>
    </div>
  )
}
