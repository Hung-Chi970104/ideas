import { LoginBrand } from "@/components/login/login-brand"
import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Brand */}
      <div className="flex items-center justify-center p-8">
        <LoginBrand />
      </div>

      {/* Right side - Auth form */}
      <div className="flex items-center justify-center p-8">
        {/* <LoginForm /> */}
        <SignIn/>
      </div>
      
    </div>
  )
}
