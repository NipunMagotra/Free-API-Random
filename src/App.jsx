import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.freeapi.app/api/v1/public/randomusers')
      .then(res => res.json())
      .then(data => {
        setUsers(data.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Random Users</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map(user => (
            <div key={user.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-24"></div>
              <div className="relative -mt-16 flex justify-center">
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                  {user.name.title} {user.name.first} {user.name.last}
                </h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                <div className="space-y-2 text-left">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-20">Gender:</span>
                    <span className="capitalize">{user.gender}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-20">Age:</span>
                    <span>{user.dob.age}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-20">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-20">Country:</span>
                    <span>{user.location.country}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
