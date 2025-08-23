import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import CustomerForm from "./CutomerForm";

export default async function CustomerFormPage({
    searchParams,
}:{
    searchParams:  Promise <{[key: string]:string | undefined}>
}){
    try{
        const {customerId} = await searchParams
        if(customerId){
            const customer = await getCustomer(parseInt(customerId))
            if(!customer){
                return (
                    <>
                      <h2 className='mb-2 text-2xl'> Customer Id #{customerId} not found</h2>
                       <BackButton title="Go Back" variant="default"/>
                    </>
                )
            }
            
          console.log(customer)
          return <CustomerForm customer={customer} />
        }
      
        else{
            // new customer form
          return  <CustomerForm />
        }
        

    }catch(error){
        if(error instanceof Error){
            throw error
        }
    }
}