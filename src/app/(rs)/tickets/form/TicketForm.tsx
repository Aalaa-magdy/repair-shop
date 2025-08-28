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


import {useAction} from 'next-safe-action/hooks'
import { saveTicketAction } from "@/app/actions/saveTicketActions"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"

import { DisplayServerActionResponse } from "@/components/ui/DisplayServerActionResponse"

type Props = {
  customer: SelectCustomerSchemaType
  ticket?: SelectTicketSchemaType
  techs? :{
    id:string,
    description :string
  }[],
  isEditable? : boolean
}

export default function TicketForm({ customer, ticket , techs,isEditable = true }: Props) {
  const isManager = Array.isArray(techs)
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
    const {
       execute :executeSave,
       result:saveResult,
       isExecuting: isSaving,
       reset: resetSaveAction,
     } = useAction(saveTicketAction,{
       onSuccess({data}){
         toast.success("Success! 🎉",{
           description: data?.message
         })
       },
       onError({error}){
    
         toast.error("Error! ⭕",{
           description :"Save Failed" 
         })
       }
     })
     
     async function submitForm(data: InsertTicketSchemaType) {
       console.log(data)
       executeSave(data)
     }
   
     return (
       <div className="flex flex-col gap-1 sm:px-8">
          <DisplayServerActionResponse result={saveResult} /> 
         <div>
           <h2 className="text-2xl font-bold">
             {ticket?.id && isEditable ? 
             `Edit Ticket # ${ticket.id}`:
                 ticket?.id ?`View Ticket # ${ticket.id}`:"New Ticket Form"}
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
                nameInSchema="title"
                disabled= {!isEditable} />


             {isManager? (
               <SelectWithLabel<InsertTicketSchemaType>
                 fieldTitle="Tech ID"
                 nameInSchema="tech"
                 data={[{id:'new-ticket@example.com',
                  description :'new-ticket@example.com'},...techs ]} />
             ):(
              <InputWithLabel<InsertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech" 
                disabled={true}/>
             )}
            
              
              {
                ticket?.id?(
                <CheckboxWithLabel<InsertTicketSchemaType>
                  fieldTitle="Completed" nameInSchema="completed"
                  message="Yes" disabled={!isEditable}
                />
                ) : null 
              }
                
              
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
                 {isEditable ? (
                       <div className='flex gap-2'>
                   <Button type ='submit' className='w-3/4'
                     variant='default' title='Save' disabled={isSaving}
                    > 
                     {
                      isSaving ?(
                        <>
                          <LoaderCircle className='animate-spin'/> Saving
                        </>
                      ) :"Save"
                    }
                   </Button>

                     <Button type ='button' 
                      variant='destructive' title='Reset'
                      onClick={
                        ()=>{ form.reset(defaultValues)
                        resetSaveAction()}
                      }
                    > 
                      Reset
                   </Button>
                </div> 
                 ):null}
            
            
             </div>

             
           </form>
         </Form>
       </div>
     )
}
