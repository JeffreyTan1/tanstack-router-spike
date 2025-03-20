import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_authenticated')({
  component: LayoutComponent,
})

function LayoutComponent() {
    return (
      <div className="p-2">
        <div className="border-b">I'm a pathless layout</div>
        <div>
          <Outlet />
        </div>
      </div>
    )
  }
  