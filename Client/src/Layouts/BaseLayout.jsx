import React from 'react'
import NavBar from '../Components/OM/components/Navbar'
import Footer from '../Components/OM/components/Footer'

function BaseLayout({children}) {
  return (
    <>
      <NavBar/>
         {children}
       <Footer/>
    </>
  )
}

export default BaseLayout
