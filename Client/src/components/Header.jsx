import React from 'react'

const Header = ({ children }) => {
  return (
    <header className="w-full bg-[#FBFBFF] m-0">
      <div className="py-4 px-5 p-2 md:py-4 md:px-16">
        <div className="w-full m-auto flex flex-row justify-between">
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header