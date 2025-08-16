import { render, screen } from '@testing-library/react'
import { MenuItem } from '../schema/menuItem.schema'

// Mock the MenuCrudTable component since we're testing the page structure
jest.mock('./menuCrudTable', () => {
  return {
    MenuCrudTable: jest.fn(() => <div data-testid="menu-crud-table">Menu CRUD Table</div>)
  }
})

// Import the page component
import CrudExposePage from '../page'

describe('CrudExposePage', () => {
  it('renders page title correctly', () => {
    render(<CrudExposePage />)
    
    expect(screen.getByText('Menu Management')).toBeInTheDocument()
  })

  it('renders page description', () => {
    render(<CrudExposePage />)
    
    expect(screen.getByText(/Manage your coffee shop menu items with full CRUD operations/)).toBeInTheDocument()
  })

  it('renders MenuCrudTable component', () => {
    render(<CrudExposePage />)
    
    expect(screen.getByTestId('menu-crud-table')).toBeInTheDocument()
  })

  it('has correct CSS classes for layout', () => {
    const { container } = render(<CrudExposePage />)
    
    const mainDiv = container.querySelector('.container')
    expect(mainDiv).toHaveClass('mx-auto', 'p-6')
  })
})
