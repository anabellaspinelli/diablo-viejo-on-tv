import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'
import { getAirTimes as mockedGetAirTimes } from './transport'

jest.mock('./transport', () => ({
  getAirTimes: jest.fn(),
}))

test('renders the home page with airtimes', async () => {
  mockedGetAirTimes.mockResolvedValueOnce([{ hora_inicio: '18:00', day: 22 }])

  render(<App />)

  const pageTitle = await screen.findByText('¿Cuándo pasan Diablo Viejo?')
  expect(pageTitle).toBeInTheDocument()

  const airtime = await screen.findByText(/18:00$/)
  expect(airtime).toBeInTheDocument()

  expect(mockedGetAirTimes).toHaveBeenCalledTimes(1)
  expect(mockedGetAirTimes).toHaveBeenCalledWith()
})

test('renders the home page empty state', async () => {
  mockedGetAirTimes.mockResolvedValueOnce([])

  render(<App />)

  const pageTitle = await screen.findByText('¿Cuándo pasan Diablo Viejo?')
  expect(pageTitle).toBeInTheDocument()

  const emptyState = await screen.findByText('No la pasan este mes :(')
  expect(emptyState).toBeInTheDocument()

  expect(mockedGetAirTimes).toHaveBeenCalledTimes(1)
  expect(mockedGetAirTimes).toHaveBeenCalledWith()
})
