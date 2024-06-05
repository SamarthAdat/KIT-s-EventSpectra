import React from 'react'
import BaseLayout from '../Layouts/BaseLayout'
import Hero from '../Components/OM/components/Hero'
import Plan from '../Components/OM/components/Plan'
import Technical from '../Components/OM/components/Technical'
import ImageSlider from '../Components/OM/components/ImageSlider'

function HomePage() {
  return (
    <BaseLayout>
        <Hero />
        <Plan />
        <Technical />
        <ImageSlider/>
    </BaseLayout>
  )
}

export default HomePage
