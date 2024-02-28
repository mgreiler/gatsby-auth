import firebase from "gatsby-plugin-firebase"
import React from "react"
import { AuthContext } from "../../context/auth"
import Icon from "../Icon/Icon"
import "./LoginForm.css"

const LoginForm = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [showSignUp, setShowSignUp] = React.useState(true)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { user, setUser } = React.useContext(AuthContext)

  const signUp = async event => {
    event.preventDefault()

    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      if (!result.user.emailVerified) {
        sendVerificationLink()
      } else {
        setUser(result.user)
        window.location.reload()
      }
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const logIn = async event => {
    event.preventDefault()

    try {
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      setUser(result.user)
    } catch (err) {
      setErrorMessage("Invalid username or password.")
    }
  }

  const sendVerificationLink = async () => {
    await firebase.auth().currentUser.sendEmailVerification()
  }

  const toggleSignUpForm = visible => {
    setShowSignUp(visible)
    setErrorMessage("")
  }

  if (user && !user.emailVerified) {
    return (
      <section className="login-form">
        <h3 className="login-form__headline">You've got mail!</h3>
        <p className="login-form__intro">
          An activation link has been sent to your email address. Click it to
          verify your account.
        </p>
        <div className="login-form__icon">
          <Icon name="mail" />
        </div>
        <small className="login-form__subtext">
          Didn't get the mail?{" "}
          <button
            className="login-form__toggle"
            type="button"
            onClick={() => sendVerificationLink()}
          >
            Send it again
          </button>
        </small>
      </section>
    )
  }

  return (
    <section className="login-form">
      {showSignUp ? (
        <>
          <h3 className="login-form__headline">
            This article is for members only.
          </h3>
          <p className="login-form__intro">
            Sign up today and unlock exclusive access!
          </p>
          <form
            className="login-form__form"
            method="post"
            onSubmit={e => signUp(e)}
          >
            <label className="login-form__field">
              <span className="login-form__label">Email</span>
              <input
                type="text"
                name="email"
                placeholder="you@example.com"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label className="login-form__field">
              <span className="login-form__label">Password</span>
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            {errorMessage && (
              <small className="login-form__error">{errorMessage}</small>
            )}
            <input
              className="login-form__submit"
              type="submit"
              value="Sign up"
            />
          </form>
          <small className="login-form__subtext">
            Already have an account?{" "}
            <button
              className="login-form__toggle"
              type="button"
              onClick={() => toggleSignUpForm(false)}
            >
              Log in
            </button>
          </small>
        </>
      ) : (
        <>
          <h3 className="login-form__headline">Welcome back!</h3>
          <p className="login-form__intro">
            Log-in to access all code review resources
          </p>
          <form
            className="login-form__form"
            method="post"
            onSubmit={e => logIn(e)}
          >
            <label className="login-form__field">
              <span className="login-form__label">Email</span>
              <input
                type="text"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
            <label className="login-form__field">
              <span className="login-form__label">Password</span>
              <input
                type="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            {errorMessage && (
              <small className="login-form__error">{errorMessage}</small>
            )}
            <input
              className="login-form__submit"
              type="submit"
              value="Log in"
            />
          </form>
          <small className="login-form__subtext">
            Don't have an account?{" "}
            <button
              className="login-form__toggle"
              type="button"
              onClick={() => toggleSignUpForm(true)}
            >
              Sign up
            </button>
          </small>
        </>
      )}
    </section>
  )
}

export default LoginForm
