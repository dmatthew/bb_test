import React, { useState } from "react";

export default function EditGuidListItemForm({guid, user, onSave, onCancel}) {
  const [userInput, setUserInput] = useState(user)

  function handleSave(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    onSave(guid, userInput)
  }

  return (
    <form>
      <div>{guid}</div>
      <input
        type="text"
        value={userInput}
        name="user"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  )
}
