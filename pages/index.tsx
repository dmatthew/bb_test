import { ReactElement, useState } from 'react'
import GuidList from 'components/GuidList'
import NewGuidForm from 'components/NewGuidForm'

export default function Home({ data }): ReactElement {
  const [items, setItems] = useState(data.items)

  async function reloadItems() {
    const response = await fetch('/guids')
    const data = await response.json()
    setItems(data.items)
  }

  return (
    <div className="container">
      <h1>
        BlackBerry Coding Test - Matthew Davis
      </h1>

      <main>
        <h2>Add GUID</h2>
        <NewGuidForm updateHandler={reloadItems} />
        <GuidList items={items} updateHandler={reloadItems} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.BASE_URL}/guids`)
  const data = await response.json()
  return {
    props: { data }
  }
}
