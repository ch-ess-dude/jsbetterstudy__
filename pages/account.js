import React from 'react'
import AuthForm from '../components/AuthForm'

export default function Account() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Account</h2>
      <p className="text-zinc-600 mt-2">Profile details and settings (no payments).</p>
      <div className="mt-6">
        <AuthForm />
      </div>
    </div>
  )
}
