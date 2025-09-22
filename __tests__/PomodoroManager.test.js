import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock supabase and useTasks
jest.mock('../lib/supabaseClient', () => ({ supabase: { auth: { getUser: jest.fn().mockResolvedValue({ data: { user: null } }) } } }))
jest.mock('../hooks/useTasks', () => {
  return jest.fn(() => ({ tasks: [], loading: false, createTask: jest.fn(), updateTask: jest.fn(), deleteTask: jest.fn(), refresh: jest.fn() }))
})

import PomodoroManager from '../components/PomodoroManager'

describe('PomodoroManager smoke', () => {
  it('renders basic controls', () => {
    render(<PomodoroManager />)
    expect(screen.getByText(/Start/i)).toBeInTheDocument()
    expect(screen.getByText(/Reset/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Session name/i)).toBeInTheDocument()
  })
})
