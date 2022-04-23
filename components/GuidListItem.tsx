import { ReactElement, useState } from "react"
import EditGuidListItemForm from "components/EditGuidListItemForm"

export default function GuidListItem({
  guid, user, updateHandler
}: {
  guid: string,
  user: string,
  updateHandler: () => {}
}): ReactElement {
  const [isEditing, setIsEditing] = useState(false)

  async function handleSave(guid, user) {
    const response = await fetch(
      `/guid/${guid}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({guid: guid, user: user}),
      }
    )
    setIsEditing(false)
    updateHandler()
  }

  async function handleDelete(
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
    <div>
      {isEditing ? (
        <div>
          <EditGuidListItemForm
            guid={guid}
            user={user}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ): (
        <div>
          <div>{guid}</div>
          <div>{user}</div>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  )
}