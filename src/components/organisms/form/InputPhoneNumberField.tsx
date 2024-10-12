

import React from 'react'
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem } from '@/components/ui/form'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'

interface InputPhoneNumberFieldProps {
    form : UseFormReturn<any>
    label : string
    description : string
}

export const InputPhoneNumberField = ({form, label, description} : InputPhoneNumberFieldProps) => {
  return (
    <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input placeholder="건영빌딩" {...field} />
                </FormControl>
                <FormDescription>
                  {description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  )
}
