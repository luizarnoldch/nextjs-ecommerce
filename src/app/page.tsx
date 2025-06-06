import { HelloFromTurso } from '@/actions/example/hello'
import React from 'react'

type Props = {}

const Home = async (props: Props) => {

  const hello = await HelloFromTurso()
  return (
    <div>
    </div>
  )
}

export default Home