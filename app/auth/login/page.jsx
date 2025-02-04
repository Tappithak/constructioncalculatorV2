'use client';
import * as React from 'react'
import LoginForm from '../../../components/auth/LoginForm'
import axios from 'axios'

export default function Login() {
  React.useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get('/api/validate-token', {
          withCredentials: true 
        })
        if (response.data.valid) {
          // ถ้า Token ถูกต้อง อัพเดท User
          window.location.href = '/pages/home';
        }
      } catch (error) {
        // ถ้า Token ไม่ถูกต้อง ให้ลบ Token ออกจาก Cookies
        //  window.location.href = '/auth/login';
         console.log(error);
      }
    }
    if (typeof window !== "undefined") {
      validateToken();
    }
  }, [])
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900/40 to-slate-900 flex items-center justify-center p-4">
        <LoginForm />
    </div>
  )
}
