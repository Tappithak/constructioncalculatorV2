import * as React from 'react'
import LoginForm from '../../../components/auth/LoginForm'

export default function Login() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900/40 to-slate-900 flex items-center justify-center p-4">
        <LoginForm />
    </div>
  )
}
