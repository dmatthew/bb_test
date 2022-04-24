import React, { useState } from "react"
import styles from './GuidListItem.module.css'

export default function EditGuidListItemForm({guid, user, onSave, onCancel}) {
  const [userInput, setUserInput] = useState(user)

  function handleSave(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    onSave(guid, userInput)
  }

  return (
    <form className={styles.container}>
      <div className={styles.column}>{guid}</div>
      <div className={styles.column}>
        <input
          type="text"
          value={userInput}
          name="user"
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <div className={styles.column}>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className={styles.column}>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
