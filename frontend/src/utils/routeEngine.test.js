import { describe, it, expect } from 'vitest'
import { calculateRoute } from './routeEngine'

describe('routeEngine', () => {
  it('calculates a basic route correctly', () => {
    const route = calculateRoute('gate-a', 'north')
    expect(route).toBeDefined()
    expect(route.fromId).toBe('gate-a')
    expect(route.toId).toBe('north')
    expect(route.steps).toBeInstanceOf(Array)
    expect(route.steps.length).toBeGreaterThan(0)
    expect(route.eta).toBeDefined()
  })

  it('calculates an accessible route with extra steps', () => {
    const route = calculateRoute('gate-a', 'north', 'accessible')
    expect(route.mode).toBe('accessible')
    // Accessible route adds 2 steps
    expect(route.steps.some(step => step.includes('accessible'))).toBe(true)
  })

  it('calculates nearest amenity correctly', () => {
    // Test finding nearest restroom
    const route = calculateRoute('gate-a', 'nearest-restroom')
    expect(route.toId.includes('rest')).toBe(true)
  })

  it('throws error for invalid origin or destination', () => {
    expect(() => calculateRoute('invalid_1', 'north')).toThrow('Invalid origin or destination')
  })
})
