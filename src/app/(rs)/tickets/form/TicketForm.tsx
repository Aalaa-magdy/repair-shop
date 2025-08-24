"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import  {InputWithLabel} from "@/components/inputs/InputWithLabel" 
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/ChekboxWithLabel"
import {
  insertTicketSchema,
  type InsertTicketSchemaType,
  type SelectTicketSchemaType,
} from "@/zod-schemas/ticket"

import { SelectCustomerSchemaType } from "@/zod-schemas/customer"

type Props = {
  customer: SelectCustomerSchemaType
  ticket?: SelectTicketSchemaType
}

export default function TicketForm({ customer, ticket }: Props) {
  const defaultValues: InsertTicketSchemaType = {
    id: ticket?.id ?? "New", // ✅ must match union type
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  }

  const form = useForm<InsertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  })

     async function submitForm(data: InsertTicketSchemaType) {
       console.log(data)
     }
   
     return (
       <div className="flex flex-col gap-1 sm:px-8">
         <div>
           <h2 className="text-2xl font-bold">
             {ticket?.id ? "Edit" : "New"} Ticket {ticket ?.id ?`# ${ticket.id}`:"Form"}
           </h2>
         </div>
   
         <Form {...form}>
           <form
             onSubmit={form.handleSubmit(submitForm)}
              className="flex flex-col gap-16 mt-5 md:flex-row"
          >
             
          <div className='flex flex-col w-full max-w-xs gap-4'>
              <InputWithLabel<InsertTicketSchemaType>
                fieldTitle="Title"
                nameInSchema="title" />

              <InputWithLabel<InsertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech" 
                disabled={true}/>
              <CheckboxWithLabel<InsertTicketSchemaType>
                
                fieldTitle="Completed" nameInSchema="completed"
                 message="Yes"
                />
                <div className='mt-4 space-y-2'>
                    <h3 className='text-lg'>Customer Info</h3>
                    <hr className='w-4/5'/>
                    <p>{customer.firstName} {customer.lastName}</p>
                    <p>{customer.address1}</p>
                    {customer.address2 ?<p>{customer.address1}</p> : null}
                    <p>{customer.city}, {customer.state} {customer.zip}</p>
                    <hr className='w-4/5' />
                    <p>{customer.email}</p>  
                    <p>Phone: {customer.phone}</p>
                </div>
          </div>
          
           <div className='flex flex-col w-full max-w-xs gap-4 '>

              <TextAreaWithLabel<InsertTicketSchemaType>  
                fieldTitle="Description" nameInSchema="description" className='h-96'
                />

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
