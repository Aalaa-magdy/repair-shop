"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import  {InputWithLabel} from "@/components/inputs/InputWithLabel" 
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/ChekboxWithLabel"
import {StatesArray} from "@/constants/StatesArray"
import {
  insertCustomerSchema,
  type InsertCustomerSchemaType,
  type SelectCustomerSchemaType,
} from "@/zod-schemas/customer"

type Props = {
  customer?: SelectCustomerSchemaType
}

export default function CustomerForm({ customer }: Props) {
 
  const {getPermission, isLoading} = useKindeBrowserClient()
  const isManager= !isLoading && getPermission('manager')?.isGranted
  

  

  const defaultValues: InsertCustomerSchemaType = {
    id: customer?.id || 0,
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    address1: customer?.address1 || "",
    address2: customer?.address2 || "",
    city: customer?.city || "",
    state: customer?.state || "",
    zip: customer?.zip || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
    notes: customer?.notes || "",
    active: customer?.active ?? true,
  }

  const form = useForm<InsertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues, 
  })

  async function submitForm(data: InsertCustomerSchemaType) {
    console.log(data)
  }

  return (
    <div className="flex flex-col gap-4 mt-4 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer {customer?.id ?`# ${customer.id}` :"Form"}
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col gap-16 mt-5 md:flex-row"
        >

          <div className='flex flex-col w-full max-w-xs gap-4'>
              <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="First Name"
                nameInSchema="firstName" /> 
                
               <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Last Name"
                nameInSchema="lastName" /> 

                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Address 1"
                nameInSchema="address1" />  

                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="Address 2"
                nameInSchema="address2" />  

                
                <InputWithLabel<InsertCustomerSchemaType>
                fieldTitle="City"
                nameInSchema="city" />  

                <SelectWithLabel<InsertCustomerSchemaType>
                  fieldTitle="State"
                  nameInSchema="state"
                  data={StatesArray} />

          </div>
          <div className='flex flex-col w-full max-w-xs gap-4 '>
                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Zip Code"
                  nameInSchema="zip" />
                  
                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Email"
                  nameInSchema="email" />  

                <InputWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Phone"
                  nameInSchema="phone" />    

                
                <TextAreaWithLabel<InsertCustomerSchemaType>  
                 fieldTitle="Notes" nameInSchema="notes" className='h-40 '
                  />
                
                {isLoading ? <p>Loading.....</p>: isManager &&customer?.id ?(
                  <CheckboxWithLabel<InsertCustomerSchemaType>
                  fieldTitle="Active"
                  nameInSchema="active"
                  message="Yes"
                  />
                ) : null}
                

                  
                <div className='flex gap-2'>
                   <Button type ='submit' className='w-3/4'
                     variant='default' title='Save'
                    > 
                     Save
                   </Button>

                     <Button type ='button' 
                      variant='destructive' title='Reset'
                      onClick={()=> form.reset(defaultValues)}
                    > 
                      Reset
                   </Button>
                </div>
             
          </div>
         
        </form>
      </Form>
    </div>
  )
}
 