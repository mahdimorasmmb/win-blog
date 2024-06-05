import SigninForm from '@/components/auth/signin-form'
import WarperForm from '@/components/auth/warper-form'
import React from 'react'

const SignInPage = () => {
  return (
    <WarperForm>
        <SigninForm/>
    </WarperForm>
  )
}

export default SignInPage