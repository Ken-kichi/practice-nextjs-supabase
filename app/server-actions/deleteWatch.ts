'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const deleteWatch = async (formData:any) => {
    const watchId = formData.get('id')

    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    if(!user){
        console.error('User is not authenticationed within delete server action')
        return
    }

    const {error} = await supabase
        .from('watches')
        .delete()
        .match({id:watchId,user_id:user.id})

    if(error){
        console.error('Error delete',error)
        return
    }

    revalidatePath('/watch-list')

  return {message:'Success'}
}

export default deleteWatch
