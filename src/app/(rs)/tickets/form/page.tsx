import { getCustomer } from "@/lib/queries/getCustomer"
import { getTicket } from "@/lib/queries/getTicket"
import { BackButton } from "@/components/BackButton"
import * as Sentry from "@sentry/nextjs"
import TicketForm from "./TicketForm"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Users, init as KindeInit } from "@kinde/management-api-js"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}){
     const {customerId,ticketId} = await searchParams
     if(!customerId && !ticketId) return {
      title: 'Missing Ticket ID or Customer ID'
     }
     
     if (customerId) return {
       title : `New Ticket for #${customerId}`
     }

     if(ticketId){
       title : `Edit Ticket #${ticketId}`
     }
}


export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId, ticketId } = await searchParams
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="mb-2 text-2xl">
            Ticket ID or Customer Id required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      )
    }

    const {getRoles, getPermission, getUser } = getKindeServerSession()
   const [roles, managerPermission, user] = await Promise.all([
  getRoles(),
  getPermission("manager"),
  getUser(),
])

const isManager =
  managerPermission?.isGranted 


    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))
      if (!customer) {
        return (
          <>
            <h2 className="mb-2 text-2xl">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="mb-2 text-2xl">
              Customer ID #{customerId} is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }

      if (isManager) {
         KindeInit()
        const { users } = await Users.getUsers()

        const techs = users
          ? users.map((user) => ({
              id: user.email!,
              description: user.email!,
            }))
          : []
        return <TicketForm customer={customer} techs={techs} />
      } else {
        
        return <TicketForm customer={customer} />
      }
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId))

      if (!ticket) {
        return (
          <>
            <h2 className="mb-2 text-2xl">
              Ticket ID # {ticketId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        )
      }
      const customer = await getCustomer(ticket.customerId)

      if (isManager) {
        KindeInit()
        const { users } = await Users.getUsers()
        const techs = users
          ? users.map((user) => ({
              id: user.email!,
              description: user.email!,
            }))
          : []
        return (
          <TicketForm customer={customer} ticket={ticket} techs={techs} />
        )
      } else {
        const isEditable = user?.email?.toLocaleLowerCase() === ticket.tech.toLocaleLowerCase()
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }
  }
}
