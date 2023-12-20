import { Hero } from 'src/components/hero'

export function Home() {
  return (
    <div className="pb-10">
      <Hero />
      <hr className="mb-8" />
      <div className="px-2">
        <p className="primary-text">Featured Posts</p>
      </div>
    </div>
  )
}
