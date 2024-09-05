import React from 'react'
import { destroyModal } from '../../utils/modal'

interface HeaderProps {
  title: string
  date?: string
}

const Header: React.FC<HeaderProps> = ({ title, date }) => {
  return (
    <header className='h-14 flex items-center justify-between px-4 border-b border-gray-200
    text-sm font-medium'>
      <h5>{`${title} (${date})`}</h5>
      <button className='w-9 h-9 rounded hover:bg-gray-100 flex items-center justify-center'
        onClick={destroyModal}>
        x
      </button>
    </header>
  )
}

export default Header