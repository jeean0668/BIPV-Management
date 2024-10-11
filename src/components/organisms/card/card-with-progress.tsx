

import React, { ReactNode } from 'react'
import { Progress } from '@/components/ui/customizable-progress'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'


interface CardWithProgressProps {
    title : string, 
    description? : string, 
    value : number 
    color : string
    children? : ReactNode
}

export const CardWithProgress = ({children, title, description, value, color} : CardWithProgressProps) => {
  return (
    <CardContent className='w-full flex flex-row justify-start items-start'>
        {children}
        <div className="flex flex-col items-start">
            <CardTitle className='mt-3'>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <Progress value={value} className="w-2/3" indicatorColor={color}></Progress>
        </div>
    </CardContent>
  )
}
