
import React from 'react'
import dynamic from 'next/dynamic'

// const MapWithTileLayer = dynamic(() => import("@/components/organisms/MapContainer/MapWithTileLayer"), { ssr: false });

const FireRiskPage = dynamic(() => import("@/screens/docs/fire/page"), {ssr : false})

const DocPage = () => {
  return (
    <FireRiskPage></FireRiskPage>
  )
}

export default DocPage