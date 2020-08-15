import { gql, useMutation, useQuery } from '@apollo/client'

import Note from './Note'
import { H2 } from '../styles/content'

interface NoteItem {
  id: string
  title: string
  description: string
  updatedAt: number
}

interface Notes {
  currentPage: number
  totalPages: number
  notes: NoteItem[]
}

interface NotesData {
  notes: Notes
}

export const GET_NOTES = gql`
  query GetNotes($search: String, $page: Int, $limit: Int) {
    notes(
      orderBy: { field: "updatedAt", order: DESC }
      search: $search
      page: $page
      limit: $limit
    ) {
      currentPage
      totalPages
      notes {
        id
        title
        description
        updatedAt
      }
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
  // to fix the order after updating the note in SSR mode
  const sortedNotes = [...data?.notes.notes].sort(
    (a, b) => b.updatedAt - a.updatedAt
  )

  const [deleteNote, { loading }] = useMutation(DELETE_NOTE_MUTATION)

  const handleDeleteNote = (id: string) => {
    deleteNote({
      variables: { id },
      update: proxy => {
        const data: any = proxy.readQuery({
          query: GET_NOTES,
        })
        const newData: any = data.notes.notes.filter(
          (n: NoteItem) => n.id !== id
        )
        //Tell cache that the existing note data can be safely ignored (https://github.com/apollographql/apollo-client/issues/6451)
        proxy.evict({
          fieldName: 'notes',
          broadcast: false,
        })
        // Update the cache without the deleted note
        proxy.writeQuery({
          query: GET_NOTES,
          data: {
            ...data,
            notes: {
              ...data.notes,
              notes: newData,
            },
          },
        })
      },
    })
  }

  return (
    <>
      <H2>Current Page: {data?.notes.currentPage}</H2>
      <p>Total Pages: {data?.notes.totalPages}</p>
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
