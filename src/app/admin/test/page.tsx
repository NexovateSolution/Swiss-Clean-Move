'use client'

import AdminLayout from '@/components/admin/AdminLayout'

export default function TestDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Test Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Dashboard is working!</h2>
          <p>If you can see this, the basic layout is functioning correctly.</p>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">Test Card 1</h3>
              <p className="text-2xl font-bold text-blue-600">123</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">Test Card 2</h3>
              <p className="text-2xl font-bold text-green-600">456</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-900">Test Card 3</h3>
              <p className="text-2xl font-bold text-yellow-600">789</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-medium text-red-900">Test Card 4</h3>
              <p className="text-2xl font-bold text-red-600">101</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
