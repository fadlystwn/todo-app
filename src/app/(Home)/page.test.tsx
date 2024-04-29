import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
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
    const inputTitle = screen.getByRole('textbox', { name: /create task/i })
    const inputDate = screen.getByRole('textbox', { name: /due date/i })

    expect(formTask).toBeInTheDocument()
    expect(inputDate).toBeInTheDocument()

    fireEvent.change(inputTitle, { target: { value: 'Task 1' } })
    fireEvent.change(inputDate, { target: { value: '2021-09-01' } })


    await waitFor(() => {
      expect(screen.getByTestId('task')).toBeInTheDocument()
      expect(screen.queryByTestId('form-task')).not.toBeInTheDocument()
    })

  })
  it('edit a task', async () => {
    render(<TodoApp />)
    expect(screen.getByText('Your Task')).toBeInTheDocument()
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    })

  })
})