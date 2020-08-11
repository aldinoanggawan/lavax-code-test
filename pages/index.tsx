import { gql, useQuery } from '@apollo/client'
import * as React from 'react'

import Layout from '../components/layout'
import { H1, H2, Card, Container } from '../styles/content'

interface Notes {
  title: string
  description: string
}

interface NotesData {
  notes: Notes[]
}

const GetNotes = gql`
  query GetNotes {
    notes {
      title
      description
    }
  }
`

const Home: React.FunctionComponent = () => {
  const { data, error, loading } = useQuery<NotesData>(GetNotes)
  return (
    <Layout title='| Home'>
      <Container>
        {loading && <H1>Loading...</H1>}
        {error && <H1>Uh oh an error occured :(</H1>}
        {data &&
          data.notes &&
          data.notes.map(({ title, description }, idx) => (
            <Card key={idx}>
              <H2>{title}</H2>
              <p>{description}</p>
            </Card>
          ))}
      </Container>
    </Layout>
  )
}

export default Home
