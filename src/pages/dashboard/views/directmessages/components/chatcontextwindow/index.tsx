import React, { useEffect, useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../components/ui/tabs'
type Props = {}

function ContextTabs({ reel }) {
  return (
    <Tabs defaultValue="reel" className=" w-full">
      <TabsList className="flex bg-transparent">
        <TabsTrigger className=" tab_trigger data-[state=active]:text-white " value="reel">
          Reel
        </TabsTrigger>
        <TabsTrigger className="tab_trigger data-[state=active]:text-white " value="posts">
          Events
        </TabsTrigger>
      </TabsList>
      <TabsContent className="pb-16" value="reel">
        <div className="pb-10">
          {reel?.map((image, index) => {
            return (
              <div key={index} className="mx-auto w-[95%]">
                <img className="w-full rounded-lg object-cover" src={image} alt="" />
              </div>
            )
          })}
        </div>
      </TabsContent>
      <TabsContent value="posts">{/* <EventBooker bunny_id={bunny_id} /> */}</TabsContent>
    </Tabs>
  )
}

export function ChatContextWindow() {
  const [bunny, setbunny] = useState(null)
  const { channel } = useChatContext()

  const { data, state } = channel ?? {}

  const { image, name } = data ?? {}

  const { reel } = bunny ?? {}

  async function getBunnyContext() {
    const res = await fetch(`http://192.168.100.16:3000/bunny/context?name=${name}`)
    const data = await res.json()
    const { bunny } = data
    console.log(bunny)
    setbunny(bunny)
  }

  useEffect(() => {
    getBunnyContext()
  }, [channel])

  if (!channel) {
    return <div className="col-span-2 hidden h-screen overflow-scroll border px-2 xl:block"></div>
  }

  return (
    <div className="col-span-3 hidden  h-screen overflow-scroll border px-2 xl:block">
      <ContextTabs reel={reel} />
    </div>
  )
}
