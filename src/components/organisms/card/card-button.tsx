

import React, { ReactNode } from 'react'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CardButtonProps {
    title : string, 
    description? : string, 
    url : string, 
    children? : ReactNode
}

export const CardButton = ({children, title, description, url} : CardButtonProps) => {
  return (
    <CardContent className='w-full flex flex-row justify-start items-start'>
        {children}
        <div className="flex flex-col items-start">
            <CardTitle className='mt-3'>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <Button asChild>
              <Link href={url}></Link>
            </Button>
        </div>
    </CardContent>
  )
}
