

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface LabelPlaceholder {
    label : string,
    placeholder : string, 
}
export const LabelPlaceholder = ({label, placeholder} : LabelPlaceholder) => {

    const props = {
        label,
        placeholder, 
    }
  return <LabelPlaceholderView label={label} placeholder={placeholder}></LabelPlaceholderView>
}

const LabelPlaceholderView = ({label, placeholder} : any) => {
    return (
        <div className="grid w-2/3 items-center justify-start gap-1.5 mb-4 mt-4">
            <Label htmlFor="email" className="bg-white">{label}</Label>
            <Input placeholder={placeholder} className="bg-white"></Input>
        </div>
      )
}
