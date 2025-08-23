"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

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
             className="flex flex-col gap-4 sm:flex-row sm:gap-8"
           >
             <p>{JSON.stringify(form.getValues())}</p>
           </form>
         </Form>
       </div>
     )
}
