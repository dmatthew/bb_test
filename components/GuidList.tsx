import GuidListItem from 'components/GuidListItem'
import { GuidType } from 'lib/types'
import { ReactElement } from 'react'

export default function GuidList({
  items,
  updateHandler
}: {
  items: GuidType[],
  updateHandler: () => {}
}): ReactElement {
  
  return (
    <div>
      <h1>Guid List</h1>
      {items && items.length > 0 ? (
        items.map((guid, index) => {
          return (
            <GuidListItem 
              key={index}
              guid={guid.guid} 
              user={guid.user} 
              updateHandler={updateHandler}
            />
          )
        })
      ): (
        <div>No GUIDs have been added. Add them using the form above</div>
      )}
    </div>
  )
}
