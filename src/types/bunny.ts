export type bunny = {
  _id: string
  name: string
  bio: string
  avatar: string
  username: string
  location: string
  offers: {
    video: boolean
    photo: boolean
    date: boolean
  }
  trending: boolean
  verified: boolean
  reel: string[]
  recommended: boolean
  pricing: {
    photo_price: number
    video_price: number
    date_price: number
  }
}
