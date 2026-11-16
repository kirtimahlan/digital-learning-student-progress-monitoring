import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <main className="login-page">
      <section className="login-showcase" aria-label="LearnHub introduction">
        <h1 className="login-showcase-title">LearnHub</h1>
      </section>

      <section className="login-form-side">
        <div className="login-card">
          <div className="login-card-icon" aria-hidden="true" />
          <p className="login-card-kicker">WELCOME BACK</p>
          <h2>Sign in to LearnHub</h2>
          <p className="login-card-description">Enter your details to continue to your dashboard.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="login-password">Password</label>
            <div className="login-password-wrap">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
              <button
                className="password-visibility"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button type="submit" className="primary-btn login-submit">
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="login-note">Your classroom community is just one step away.</p>
        </div>
      </section>
    </main>
  )
}

export default Login
