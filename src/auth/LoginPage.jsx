'use client'

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { postData } from "@/utils/fetch-api-data"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { Navigate, useNavigate } from "react-router-dom"
import { LockIcon, MailIcon } from "lucide-react"

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    try {
      const { response } = await postData("user/login", data)

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data))
        navigate("/")
        toast.success("Logged in successfully!")
      } else {
        toast.error("Failed to log in. Please check your credentials.")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Failed to log in. Please check your credentials.")
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="h-screen w-full flex items-center justify-center p-5">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter admin credentials to access </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-left w-full flex">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" name="email"required />
            </div>
            <div className="space-y-2">
              <label className="text-left w-full flex">Password</label>
              <Input id="password" type="password" placeholder="**********" name="password"required />
            </div>
            <Button type="submit" className="w-full">Login In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
