export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {children}
    </div>
  )
}