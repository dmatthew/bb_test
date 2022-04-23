import { useState } from 'react'
import GuidList from 'components/GuidList'
import NewGuidForm from 'components/NewGuidForm'

export default function Home({ data }) {
  const [items, setItems] = useState(data.items)

  async function reloadItems() {
    console.log('reloadItems!')
    const response = await fetch('/guids')
    const data = await response.json()
    console.log('data',data)
    setItems(data.items)
  }

  return (
    <div className="container">
      <h1 className="title">
        BB Coding Test
      </h1>

      <main>
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
