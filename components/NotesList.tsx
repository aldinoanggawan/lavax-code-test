import { gql, useMutation, useQuery } from '@apollo/client'

import Note from './Note'
import { H2 } from '../styles/content'

interface Notes {
  id: string
  title: string
  description: string
  updatedAt: number
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
      updatedAt
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
  const sortedNotes = [...data?.notes].sort((a, b) => b.updatedAt - a.updatedAt)

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
      {sortedNotes.length ? (
        sortedNotes.map(note => (
          <Note
            key={note.id}
            {...note}
            handleDeleteNote={handleDeleteNote}
            loading={loading}
          />
        ))
      ) : (
        <H2 center>No available note</H2>
      )}
    </>
  )
}

export default NotesList
