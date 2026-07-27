"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';


const RegisterForm = () => {
  return (
    <form className="space-y-4">
        <Card className="p-5 space-y-4">
            <Input name="email" type="email" placeholder="Write Your a valid Email" required />
            <Input name="password" type="password" placeholder="Enter a New Password" required />
            <Button type="submit">
                Sign Up
            </Button>
        </Card>
    </form>
  )
}

export default RegisterForm