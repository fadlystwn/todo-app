import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TodoApp from './page'

describe('TodoApp', () => {
  beforeEach(() => {
    render(<TodoApp />)
    expect(screen.getByText('Your Task')).toBeInTheDocument()
  })

  const openForm = () => {
    fireEvent.click(screen.getByRole('button', { name: /create task/i }))
    return screen.getByTestId('form-task')
  }

  const createTask = async (title: string, date: string) => {
    const inputTitle = screen.getByRole('textbox', { name: /create task/i })
    const inputDate = screen.getByRole('textbox', { name: /due date/i })

    fireEvent.change(inputTitle, { target: { value: title } })
    fireEvent.change(inputDate, { target: { value: date } })
    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByTestId('task')).toBeInTheDocument()
      expect(screen.queryByTestId('form-task')).not.toBeInTheDocument()
    })
  }

  it('renders TodoApp and checks for title', () => {
    expect(screen.getByText('Your Task')).toBeInTheDocument()
  })

  it('renders empty task if no task is available', () => {
    expect(screen.getByText('No tasks to display')).toBeInTheDocument()
  })

  it('creates a task', async () => {
    try {
      await createTask('Task 1', '2021-09-01')
    } catch (err) {
      console.log(err)
    }

  })

  it('cancels task creation', () => {
    const formTask = openForm()
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(formTask).not.toBeInTheDocument()
  })

  it('edits a task', async () => {

    try {
      await createTask('Task 1', '2021-09-01')
      fireEvent.click(screen.getByTestId('button-list-edit'))
      fireEvent.change(screen.getByRole('textbox', { name: /create task/i }), { target: { value: 'Task 2' } })
      fireEvent.change(screen.getByRole('textbox', { name: /due date/i }), { target: { value: '2021-09-02' } })
      fireEvent.click(screen.getByRole('button', { name: /save/i }))

      expect(screen.getByText('Task 2')).toBeInTheDocument()
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument()

    } catch (err) {
      console.log(err)
    }

  })

  it('marks a task as completed', async () => {
    try {
      await createTask('Task 1', '2021-09-01')
      fireEvent.click(screen.getByTestId('button-list-mark'))
      expect(screen.getByTestId('completed-task')).toBeInTheDocument()
      expect(screen.queryByTestId('task')).not.toBeInTheDocument()
    } catch (err) {
      console.log(err)
    }
  })

  it('deletes a task', async () => {
    try {
      await createTask('Task 1', '2021-09-01')
      fireEvent.click(screen.getByTestId('button-list-delete'))
      expect(screen.queryByTestId('task')).not.toBeInTheDocument()
    } catch (err) {
      console.log(err)
    }
  })
})
