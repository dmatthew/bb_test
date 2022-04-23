import { useState } from 'react'
import GuidListItem from 'components/GuidListItem'
import { GuidType } from 'lib/types'

export default function GuidList({ items, updateHandler }) {
  // const [guids, setGuids] = useState<GuidType[]>(items)
  
  return (
    <div>
      <h1>GuidList</h1>
      {items && items.length > 0 && items.map((guid, index) => {
        return (
          <GuidListItem 
            guid={guid.guid} 
            user={guid.user} 
            index={index}
            updateHandler={updateHandler}
          />
        )
      })}
    </div>
  )
}
