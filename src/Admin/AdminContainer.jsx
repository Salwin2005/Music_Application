import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'

const AdminContainer = () => {
  return (
    <section className='basis-[83%]  flex '>
        <AdminSidebar/>
        <AdminContent/>
    </section>
  )
}

export default AdminContainer