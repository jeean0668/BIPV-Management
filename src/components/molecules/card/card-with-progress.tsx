

import React, { ReactNode } from 'react'
import { Progress } from '@/components/ui/customizable-progress'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'


interface CardWithProgressProps {
    title : string, 
    description? : string, 
    value : number 
    color : string
    children? : ReactNode
    minWidth? : string // ex: 300px
    maxWidth? : string // ex: 300px
}

export const CardWithProgress = ({children, title, description, value, color, minWidth, maxWidth} : CardWithProgressProps) => {
  return (
    <CardContent className='w-full flex flex-col justify-start items-start'>
        <CardTitle className='mt-3'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Progress value={value} className={`w-full min-w-[${minWidth}] max-w-[${maxWidth}]`} indicatorColor={color}></Progress>
        
    </CardContent>
  )
}
