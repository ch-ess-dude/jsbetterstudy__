import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import useTasks from '../hooks/useTasks'

// Mock supabase client used by the hook
jest.mock('../lib/supabaseClient', () => {
  return {
    supabase: {
      from: jest.fn(() => ({ select: jest.fn(() => ({ order: jest.fn().mockResolvedValue({ data: [], error: null }) })) })),
    }
  }
})

describe('useTasks hook', () => {
  it('initializes without crashing and exposes functions', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTasks())
    // Wait for initial fetch
    await waitForNextUpdate()
    expect(Array.isArray(result.current.tasks)).toBe(true)
    expect(typeof result.current.createTask).toBe('function')
    expect(typeof result.current.updateTask).toBe('function')
    expect(typeof result.current.deleteTask).toBe('function')
  })
})
