import { createMenuItemSchema, updateMenuItemSchema } from '../menuItemValidation.schema'

describe('MenuItemValidation Schemas', () => {
  describe('createMenuItemSchema', () => {
    it('validates correct menu item data', () => {
      const validData = {
        name: 'Espresso',
        price: 2.50
      }

      const result = createMenuItemSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects empty name', () => {
      const invalidData = {
        name: '',
        price: 2.50
      }

      const result = createMenuItemSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Name must be at least 2 characters')
      }
    })

    it('rejects name that is too long', () => {
      const invalidData = {
        name: 'A'.repeat(101),
        price: 2.50
      }

      const result = createMenuItemSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects negative price', () => {
      const invalidData = {
        name: 'Espresso',
        price: -1.0
      }

      const result = createMenuItemSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects zero price', () => {
      const invalidData = {
        name: 'Espresso',
        price: 0
      }

      const result = createMenuItemSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects price that is too high', () => {
      const invalidData = {
        name: 'Espresso',
        price: 1000
      }

      const result = createMenuItemSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('updateMenuItemSchema', () => {
    it('validates correct update data', () => {
      const validData = {
        name: 'Updated Espresso',
        price: 3.00
      }

      const result = updateMenuItemSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('has same validation rules as create schema', () => {
      const invalidData = {
        name: 'A',
        price: -5
      }

      const result = updateMenuItemSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
