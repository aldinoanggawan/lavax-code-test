import { gql, useMutation, useQuery } from '@apollo/client'

import { H2, DeleteButton, Card } from '../styles/content'
import { DeleteIcon } from '../styles/icons'

export interface Notes {
  id: string
  title: string
  description: string
}

interface NotesData {
  notes: Notes[]
}

export const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      description
    }
  }
`

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
      title
    }
  }
`

const NotesList = () => {
  const { data } = useQuery<NotesData>(GET_NOTES)
  const [deleteNote, { loading }] = useMutation(DELETE_NOTE_MUTATION)

  const handleDeleteNote = (id: string) => {
    deleteNote({
      variables: { id },
      update: proxy => {
        const data: any = proxy.readQuery({
          query: GET_NOTES,
        })
        const newData: any = data.notes.filter((n: Notes) => n.id !== id)
        //Tell cache that the existing note data can be safely ignored (https://github.com/apollographql/apollo-client/issues/6451)
        proxy.evict({
          fieldName: 'notes',
          broadcast: false,
        })
        // Updated the cache without the deleted note
        proxy.writeQuery({
          query: GET_NOTES,
          data: {
            ...data,
            notes: newData,
          },
        })
      },
    })
  }

  return (
    <>
      {data?.notes.length ? (
        data?.notes.map(({ id, description, title }) => (
          <Card key={id}>
            <DeleteButton
              disabled={loading}
              onClick={() => handleDeleteNote(id)}
            >
              <DeleteIcon />
            </DeleteButton>
            <H2>{title}</H2>
            <p>{description}</p>
          </Card>
        ))
      ) : (
        <H2 center>No available note</H2>
      )}
    </>
  )
}

export default NotesList
