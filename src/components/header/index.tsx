import React, { ReactNode } from 'react'
import { Menu, Search } from 'lucide-react'

interface IProps {
  leftNode?: ReactNode
}
export function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-white/20 bg-black shadow-lg shadow-white/10 lg:hidden">
      <div className="flex items-center justify-between px-2 py-4">
        <p className="primary-text">Bunnies</p>
        <div className="flex flex-row items-center gap-x-2">
          <Search color="white" />
          <Menu color="white" />
        </div>
      </div>
    </div>
  )
}
