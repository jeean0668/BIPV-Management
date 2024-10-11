

import React, { ReactNode } from 'react'
import { Progress } from '@/components/ui/customizable-progress'
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CgChevronRight } from 'react-icons/cg'
import { useRouter } from 'next/navigation'

interface CardWithTitleProps {
    title : string, 
    children? : ReactNode
}

export const CardWithTitle = ({children, title} : CardWithTitleProps) => {
  const router = useRouter(); 

  return (
    <Card className='w-full p-2'>
        <Button variant={'ghost'} className='w-full flex flex-row justify-between' onClick={() => {router.push('detail')}}>
            <CardTitle className=''>{title}</CardTitle>
            <CgChevronRight></CgChevronRight>
        </Button>
    </Card>
  )
}
