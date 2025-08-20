import { BackButton } from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
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
        }
      
        else{
            
        }
        

    }catch(error){
        if(error instanceof Error){
            throw error
        }
    }
}