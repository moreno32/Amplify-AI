import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button Component', () => {
  it('should render the button with its children', () => {
    const buttonText = 'Click Me'
    render(<Button>{buttonText}</Button>)

    // Find the button by its role and accessible name (the text content)
    const buttonElement = screen.getByRole('button', { name: /click me/i })

    // Assert that the button is in the document
    expect(buttonElement).toBeInTheDocument()
  })

  it('should apply default variant and size classes', () => {
    render(<Button>Default Button</Button>)
    const buttonElement = screen.getByRole('button')

    // Check for classes associated with the default variant
    expect(buttonElement).toHaveClass('bg-primary', 'text-primary-foreground')
    // Check for classes associated with the default size
    expect(buttonElement).toHaveClass('h-9', 'px-4', 'py-2')
  })

  it('should render as a different element when using asChild', () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>
    )

    // The component should now be a link, not a button
    const linkElement = screen.getByRole('link', { name: /link button/i })
    expect(linkElement).toBeInTheDocument()

    // Ensure no button role is found
    const buttonElement = screen.queryByRole('button')
    expect(buttonElement).not.toBeInTheDocument()
  })
}) 