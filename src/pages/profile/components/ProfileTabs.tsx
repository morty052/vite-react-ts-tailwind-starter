import { Button } from 'src/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Lock } from 'lucide-react'
import { bunny } from 'src/types/bunny'
import { Post } from 'src/types/post'
import { PostCard } from 'src/components'

function SubscribeToView() {
  return (
    <div className="mx-auto mt-4 max-w-sm space-y-4 rounded-lg bg-white px-6 py-2">
      <div className="flex justify-between">
        <p className="text-dark">45</p>
        <Lock size={18} color="black" />
      </div>
      <Button className="rounded-xl" size={'lg'}>
        <span className="text-sm">Subscribe to view private media</span>
      </Button>
    </div>
  )
}

function MediaReel({ reel }) {
  return (
    <div className="flex flex-col gap-y-4 px-1">
      {reel?.map((url: string, index: number) => {
        return (
          <div className="mx-auto max-w-lg" key={index}>
            <img className="w-full rounded-lg " src={url} alt="" />
          </div>
        )
      })}
    </div>
  )
}

export function ProfileTabs({ bunny, posts }: { bunny: bunny; posts: Post[] }) {
  const { reel, _id: bunny_id } = bunny
  return (
    <Tabs defaultValue="media" className=" w-full">
      <TabsList className="flex bg-transparent">
        <TabsTrigger className=" tab_trigger data-[state=active]:text-white " value="media">
          Media
        </TabsTrigger>
        <TabsTrigger className="tab_trigger data-[state=active]:text-white " value="posts">
          Posts
        </TabsTrigger>
      </TabsList>
      <TabsContent className="pb-16" value="media">
        <MediaReel reel={reel} />
        <SubscribeToView />
      </TabsContent>
      <TabsContent value="posts">
        {/* <EventBooker bunny_id={bunny_id} /> */}
        <div className="pb-10">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
