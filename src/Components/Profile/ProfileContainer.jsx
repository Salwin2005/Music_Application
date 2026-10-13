import React from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileContent from './ProfileContent'

const ProfileContainer = () => {
  return (
    <section className='flex w-[100%] text-white'>
        <ProfileSidebar/>
        <ProfileContent/>
    </section>
  )
}

export default ProfileContainer