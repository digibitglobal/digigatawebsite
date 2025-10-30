import type { Meta, StoryObj } from '@storybook/react'
import { Sheet, SheetContent, SheetTrigger } from './sheet'

const meta: Meta = {
  title: 'UI/Sheet',
}
export default meta

type Story = StoryObj

export const Basic: Story = {
  render: () => (
    <div style={{ height: 300 }}>
      <Sheet>
        <SheetTrigger>
          <span>Open sheet</span>
        </SheetTrigger>
        <SheetContent>
          <div className="p-4">Hello from the sheet!</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

