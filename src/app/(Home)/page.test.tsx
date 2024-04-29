import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TodoApp from './page'

describe('TodoApp', () => {
  it('renders TodoApp and checks for title', async () => {
    render(<TodoApp />)
    expect(screen.getByText('Your Task')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))
    const formTask = screen.getByTestId('form-task')
    expect(formTask).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(formTask).not.toBeInTheDocument()

  })

  it('render empty task if no task is available', async () => {
    render(<TodoApp />)
    expect(screen.getByText('Your Task')).toBeInTheDocument()

    const noTask = screen.getByText('No tasks to display')
    expect(noTask).toBeInTheDocument()
  })

  it('create a task', async () => {
    render(<TodoApp />)
    expect(screen.getByText('Your Task')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))
    const formTask = screen.getByTestId('form-task')
    expect(formTask).toBeInTheDocument()

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Task 1' } })
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByTestId('task')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByTestId('form-task')).not.toBeInTheDocument()
    })

  })
})