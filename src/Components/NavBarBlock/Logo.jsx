import React from 'react'
import BattleFieldLogo from "../../Assets/phot.png"

const Logo = () => {
  return (
    <aside className='basis-[15%]   '>
        <figure className='w-full h-[100px] flex justify-center'>
            <img src={BattleFieldLogo}
             alt="BattleFieldLogo" 
             className='w-[120px] h-[100px]'/>
        </figure>
    </aside>
  )
}

export default Logo