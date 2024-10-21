
import React from 'react'
import dynamic from 'next/dynamic'

const AirRiskPage = dynamic(() => import('@/screens/docs/air/page'), {ssr : false}); 
const DocPage = () => {
  return (
    <AirRiskPage></AirRiskPage>
  )
}

export default DocPage