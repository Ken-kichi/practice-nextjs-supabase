import { cookies } from "next/headers"
import EditWatch from "../components/EditWatch"
import WatchForm from "../components/WatchForm"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import deleteWatch from "../server-actions/deleteWatch"

type WatchProps = {id:string,reference_number:string,brand:string,model:string}

const WatchList = async () => {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({cookies:()=>cookieStore})
    const {data:{session}} = await supabase.auth.getSession()
    const user = session?.user

    const {data:watches,error} = await supabase
    .from('watches')
    .select('*')
    .eq('user_id',user?.id)
    .order('brand',{ascending:true})

    if(error){
        console.log('Error fetching watches')
    }

  return (
   <div>
    <div>
        <div>
            <h1>My Watch List</h1>
            <form action="/auth/signout" method='post'><button type='submit'>Sign Out</button></form>
        </div>
        <WatchForm />
        <div>
            {watches?.map((watch:WatchProps)=>(
                <div key={watch.id}>
                    <h2>{watch.brand} - {watch.model}</h2>
                    <div>
                        <form action={deleteWatch}>
                            <input type="hidden" name="id" value={watch.id}/>
                            <button type="submit">Delete</button>
                        </form>
                        <EditWatch watch={watch} />
                    </div>
                </div>
            ))}
        </div>
    </div>
   </div>
  )
}

export default WatchList
