import { Player } from '@lottiefiles/react-lottie-player'
import ghost from '../assets/ghost.json'

export function EmptyState({ description }: { description: string }) {
  return (
    <div className="px-2 py-4">
      <div className="py-4 text-center text-2xl font-semibold text-light">{description}</div>
      <Player speed={0.5} src={ghost} autoplay loop />
    </div>
  )
}
