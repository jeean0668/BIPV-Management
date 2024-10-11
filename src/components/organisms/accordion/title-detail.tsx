import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


const AccordionTitleDetailView = ({title, detail} : any) => {
    return (
        <Accordion type="single" collapsible>
        <AccordionItem value={`item-${title}`}>
          <AccordionTrigger className='text-lg'>{title}</AccordionTrigger>
          <AccordionContent>
            {detail}
          </AccordionContent>
        </AccordionItem>
    </Accordion>
    )
} 

interface AccordionTitleDetailProps {
    title : string, 
    detail : string, 
}
export const AccordionTitleDetail = ({title, detail} : AccordionTitleDetailProps) => {

    const props = {
        title,
        detail, 
    }; 

  return <AccordionTitleDetailView {...props}></AccordionTitleDetailView>
}
