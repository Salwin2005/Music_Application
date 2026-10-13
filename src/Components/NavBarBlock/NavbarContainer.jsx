import React from 'react' 
import Logo from './Logo'
import Menu from './Menu'

const NavbarContainer = () => {
  return (
    <header className='h-[70px] w-full bg-[#000000] shadow  flex justify-between items-center'>
        <Logo/>
        <Menu/>
    </header>
  )
}

export default NavbarContainer