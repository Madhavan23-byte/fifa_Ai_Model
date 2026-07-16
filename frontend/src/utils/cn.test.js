import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  it('merges classnames correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classnames', () => {
    const isTrue = true
    const isFalse = false
    expect(cn('base', isTrue && 'active', isFalse && 'inactive')).toBe('base active')
  })

  it('merges tailwind classes intelligently using tailwind-merge', () => {
    // bg-red-500 should override bg-blue-500
    expect(cn('bg-blue-500 p-4', 'bg-red-500')).toBe('p-4 bg-red-500')
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4')
  })
})
