

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface LabelButtonPlaceholder {
    label : string,
    placeholder : string, 
}
export const LabelButtonPlaceholder = ({label, placeholder} : LabelButtonPlaceholder) => {

    const props = {
        label,
        placeholder, 
    }

  return <LabelButtonPlaceholderView label={label} placeholder={placeholder}></LabelButtonPlaceholderView>
}

const LabelButtonPlaceholderView = ({label, placeholder} : any) => {
    return (
        <div className="absolute left-2"
            style={{
              zIndex: 9999, // z-index를 높게 설정
            }}
          >
            <div className="grid w-full items-center justify-start gap-1.5 mb-4 mt-4">
                {/* <Label htmlFor="email" className="bg-white">{label}</Label> */}
                <Input placeholder={placeholder} className="bg-white"></Input>
            </div>
        </div>
      )
}
