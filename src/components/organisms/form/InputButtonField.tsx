

import React from 'react'
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem } from '@/components/ui/form'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
interface InputButtonFieldProps {
    form : UseFormReturn<any>
    label : string
    description : string
    onClick : () => void 
}

export const InputButtonField = ({form, label, description, onClick} : InputButtonFieldProps) => {
  return (
    
    <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <div className="flex flex-row space-x-2" onClick={onClick}>
                    <Input disabled {...field} />
                    {/* Input이 Button의 하위 컴포넌트가 아니기 때문에, Input 값이 변경되지 않음 */}
                    <Button disabled {...field} className="bg-gray-400 w-[40px] "><span>찾기</span></Button>
                  </div>
                </FormControl>
                <FormDescription>
                  {description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
  );
}
