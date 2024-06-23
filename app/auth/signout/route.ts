import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";

export const POST = async (req:NextRequest) => {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies:()=>cookieStore})

    const {data:{session}} = await supabase.auth.getSession()

    if (session){
        await supabase.auth.signOut()
    }
  return NextResponse.redirect(new URL('/',req.url))
}

