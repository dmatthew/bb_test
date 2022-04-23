export default function GuidListItem({ guid, user, index, updateHandler }) {

  async function handleDeleteGuid(
    event: React.FormEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault()

    const response = await fetch(
      `/guid/${guid}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    updateHandler()
  }
  return (
    <div key={index}>
      <div>{guid}</div>
      <div>{user}</div>
      <div>
        <button onClick={handleDeleteGuid}>Delete</button>
      </div>
    </div>
  )
}