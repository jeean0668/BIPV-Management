

import React from 'react'
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem } from '@/components/ui/form'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'

interface InputFieldProps {
    id : string, 
    form : UseFormReturn<any>
    label : string
    description? : string
    disabled? : true
}

export const InputField = ({id, form, label, description, disabled} : InputFieldProps) => {
  return (
    <FormField
            control={form.control}
            name={id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  {disabled ? <Input disabled placeholder="건영빌딩" {...field}/> : <Input placeholder="건영빌딩" {...field} />}
                  {/* <Input placeholder="건영빌딩" {...field} /> */}
                </FormControl>
                {description &&
                  <FormDescription>
                    {description}
                  </FormDescription>
                }
                <FormMessage />
              </FormItem>
            )}
          />
  )
}
