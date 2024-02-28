import React from "react"
import { AuthContext } from "../context/auth"
import LoginForm from "./Login/LoginForm"

const PrivateSection = ({ html }) => {
  const { user } = React.useContext(AuthContext)

  if (!user || !user.emailVerified) {
    return <LoginForm path="/app/login" />
  }

  return <section dangerouslySetInnerHTML={{ __html: html }}></section>
}

export default PrivateSection
