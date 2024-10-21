

import React, { ReactNode } from 'react'
import { Progress } from '@/components/ui/customizable-progress'
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CgChevronRight } from 'react-icons/cg'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface CardWithDetailDescriptionProps {
    title : string, 
    children? : ReactNode
    description? : string
    url : string
}

export const CardWithDetailDescription = ({children, title, description, url} : CardWithDetailDescriptionProps) => {
  const router = useRouter(); 

  return (
    <Card className='w-full p-3 flex flex-col space-y-2 py-4'>
        <div className = "flex flex-col items-start space-y-1">
          <CardTitle className=''>{title}</CardTitle>
          {description && 
            (<Label className="text-gray-400 texg-base">
              {description}
            </Label>)}
        </div>
        <Separator/>
        {children}
    </Card>
  )
}
