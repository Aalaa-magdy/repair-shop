import Image from "next/image"
 
export const metadata={
    title: "Page Not Found"
}

export default function NotFound() {
  return (
<div className='w-full px-2 '>
    <div className='flex flex-col items-center justify-center gap-4 py-4 mx-auto '>
        <h2 className='text-2xl'>Page Not Found</h2>
        <Image 
          className='m-0 rounded-xl'
          src="/images/notfound.jpg"
          width={400}
          height={300}
          sizes="300px"
          alt="Page Not Found"
          priority={true}
          title="Page Not Found"
         />
           <div className="absolute inset-0 z-0 bg-black/60" /> 
        </div>
    </div>
  )
}