'use client'

import { Auth } from "@supabase/auth-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
    // Import predefined theme
    ThemeSupa,
  } from '@supabase/auth-ui-shared'

const AuthForm = () => {
    const supabase = createClientComponentClient()
  return (
    <Auth
    supabaseClient={supabase}
    view='magic_link'
    showLinks={false}
    providers={[]}
    redirectTo="https://practice-nextjs-supabase.vercel.app/auth/callback"
    appearance={{ theme: ThemeSupa }}
    />

  )
}

export default AuthForm
