import { gql, useQuery } from '@apollo/client'

import Layout from '../components/layout'
import { H1 } from '../styles/content'

const GetHello = gql`
  query GetHello {
    hello
  }
`

const Home = () => {
  const { data, error, loading } = useQuery(GetHello)

  return (
    <Layout title='| Home'>
      {loading && <H1>Loading...</H1>}
      {error && <H1>Uh oh an error occured :(</H1>}
      {data && <H1>{data.hello}</H1>}
    </Layout>
  )
}

export default Home
