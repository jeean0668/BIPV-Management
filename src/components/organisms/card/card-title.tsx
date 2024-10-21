

import React, { ReactNode } from 'react'
import { Progress } from '@/components/ui/customizable-progress'
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CgChevronRight } from 'react-icons/cg'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'

interface CardWithTitleProps {
    title : string, 
    children? : ReactNode
    description? : string
    url : string
}

export const CardWithTitle = ({children, title, description, url} : CardWithTitleProps) => {
  const router = useRouter(); 

  return (
    <Card className='w-full p-3'>
        <Button variant={'ghost'} className='w-full text-1xl flex flex-row justify-between' onClick={() => {router.push(url)}}>
            <div className = "flex flex-col items-start space-y-1">
              <CardTitle className=''>{title}</CardTitle>
              {description && 
                (<Label className="text-gray-400 texg-base">
                  {description}
                </Label>)}
            </div>
            <CgChevronRight></CgChevronRight>
        </Button>
    </Card>
  )
}
