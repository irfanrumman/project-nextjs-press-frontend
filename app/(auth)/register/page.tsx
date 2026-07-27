import RegisterForm from '../_components/registerForm';
const RegisterPage = () => {
  return (
   <>
   <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">

      {/* form generic text */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <p className="text-gray-500">
          Create a new account to get started your journey with us. 
        </p>
      </div>

      {/* form */}
      <RegisterForm />



    </div>
   </div>
   </>
  )
}

export default RegisterPage
