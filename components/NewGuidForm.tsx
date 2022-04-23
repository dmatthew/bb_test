import { useState } from 'react'

export default function newGuidForm({ updateHandler }) {
  const [guid, setGuid] = useState('')
  const [user, setUser] = useState('')

  async function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()

    const response = await fetch(
      `/guid/${guid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({guid: guid, user: user})
      }
    )
    updateHandler()
  }
  
  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="guid">Guid</label>
      <input
        type="text"
        value={guid}
        onChange={(e) => setGuid(e.target.value)}
        name="guid"
      />
      <label htmlFor="user">User</label>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        name="user"
      />
      <input type="submit" value="Save" />
    </form>
  )
}