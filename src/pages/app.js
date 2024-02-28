import { Router } from "@reach/router"
import React from "react"
import Layout from "../components/layout"
import LoginForm from "../components/Login/LoginForm"

const App = () => (
  <Layout>
    <Router>
      <LoginForm path="/app/login" />
    </Router>
  </Layout>
)

export default App
