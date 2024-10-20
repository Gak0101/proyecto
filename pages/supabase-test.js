import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SupabaseTest() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .limit(5)

        if (error) throw error
        setUsers(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h1>Prueba de Supabase</h1>
      {error && <p>Error: {error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name || user.email}</li>
          ))}
        </ul>
      ) : (
        <p>Cargando usuarios...</p>
      )}
    </div>
  )
}