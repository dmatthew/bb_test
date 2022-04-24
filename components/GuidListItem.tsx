import { ReactElement, useState } from "react"
import EditGuidListItemForm from "components/EditGuidListItemForm"
import styles from './GuidListItem.module.css'

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
    <div className={styles.container}>
      {isEditing ? (
        <EditGuidListItemForm
          guid={guid}
          user={user}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ): (
        <>
          <div className={styles.column}>{guid}</div>
          <div className={styles.column}>{user}</div>
          <div className={styles.column}>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <div className={styles.column}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}
    </div>
  )
}