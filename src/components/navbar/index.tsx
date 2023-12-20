import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 bg-black ">
      <div className="flex justify-between px-2 py-4 sm:px-4">
        <Link to={'/'}>
          <h1 className="text-xl font-bold text-gray-50">Vite Bunny</h1>
        </Link>

        <p className="text-light">-</p>
      </div>
    </div>
  )
}
