import React from 'react'
import AboutHero from './AboutHero.tsx'
import AboutCommitment from './AboutCommitment.tsx'
import FunFact from './FunFact.tsx'
import WhyChooseUs from './WhyChooseUs.tsx'
import AboutCallToAction from './AboutCallToAction.tsx'

function AboutUsWhole() {
 
  React.useEffect(() => {

    window.scrollTo({
      top: 0    
    })

  }, []);
 
  
  return (
    <div className='mx-auto container flex flex-col gap-20 px-5 text-darkBrown mb-40 sm:gap-28'>
      <AboutHero />
      <AboutCommitment />
      <FunFact />
      <WhyChooseUs />
      <AboutCallToAction />
    </div>
  )
}

export default AboutUsWhole
