import { gql, useQuery } from '@apollo/client'

import { H2, Card } from '../styles/content'

interface Notes {
  title: string
  description: string
}

interface NotesData {
  notes: Notes[]
}

export const GET_NOTES = gql`
  query GetNotes {
    notes {
      title
      description
    }
  }
`

const NotesList = () => {
  const { data } = useQuery<NotesData>(GET_NOTES)

  return (
    <>
      {data?.notes.map(({ title, description }, idx) => (
        <Card key={idx}>
          <H2>{title}</H2>
          <p>{description}</p>
        </Card>
      ))}
    </>
  )
}

export default NotesList
