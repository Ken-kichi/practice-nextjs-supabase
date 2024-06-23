'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const updateWatch = async (formData:any)=>{
    const watchId = Number(formData.get('id'))
    const model = formData.get('model')
    const brand = formData.get('brand')
    const referenceNumber = formData.get('referenceNumber')

    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if(!user){
        console.error('User is not authenticated within update server action')
        return
    }

    const {data,error} = await supabase
        .from('watches')
        .update({
            model,
            brand,
            reference_number:referenceNumber,
        }).match({id:watchId,user_id:user.id})

    if(error){
        console.error('Errror updating data',error)
        return
    }

    revalidatePath('/watch-list')

    return {message:'Success'}
}
