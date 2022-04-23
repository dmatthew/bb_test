import React, { useState } from "react";

export default function EditGuidListItemForm({guid, user, onSave, onCancel}) {
  const [guidInput, setGuidInput] = useState(guid)
  const [userInput, setUserInput] = useState(user)

  function handleSave(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    onSave(guidInput, userInput)
  }

  return (
    <form>
      <input
        type="text"
        value={guidInput}
        name="guid"
        onChange={(e) => setGuidInput(e.target.value)}
      />
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