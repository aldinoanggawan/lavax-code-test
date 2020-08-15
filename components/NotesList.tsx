import { gql, useMutation, useQuery } from '@apollo/client'

import Note from './Note'
import { H2, Button } from '../styles/content'

interface Notes {
  id: string
  title: string
  description: string
  updatedAt: number
}

interface NotesData {
  totalCount: number
  notes: [Notes]
}

interface NotesVars {
  first: number
  skip: number
  search: string
}

export const GET_NOTES = gql`
  query GetNotes($first: Int, $skip: Int, $search: String) {
    totalCount
    notes(
      orderBy: { field: "updatedAt", order: DESC }
      first: $first
      skip: $skip
      search: $search
    ) {
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

export const notesQueryVars = {
  first: 5,
  skip: 0,
  search: '',
}

const NotesList = () => {
  const { data, fetchMore } = useQuery<NotesData, NotesVars>(GET_NOTES, {
    variables: notesQueryVars,
  })
  // to fix the order after updating the note in SSR mode
  const sortedNotes = [...data?.notes].sort((a, b) => b.updatedAt - a.updatedAt)

  const [deleteNote, { loading }] = useMutation(DELETE_NOTE_MUTATION)

  const handleDeleteNote = (id: string) => {
    deleteNote({
      variables: { id },
      update: proxy => {
        const data: NotesData = proxy.readQuery({
          query: GET_NOTES,
          variables: notesQueryVars,
        })
        const newData: any = data.notes.filter((n: Notes) => n.id !== id)
        //Tell cache that the existing note data can be safely ignored (https://github.com/apollographql/apollo-client/issues/6451)
        proxy.evict({
          fieldName: 'notes',
          broadcast: false,
        })
        // Update the cache without the deleted note
        proxy.writeQuery({
          query: GET_NOTES,
          variables: notesQueryVars,
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

  // fetch more notes on click
  const loadMoreNotes = () => {
    fetchMore({
      variables: {
        skip: data?.notes.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          notes: [...prev.notes, ...fetchMoreResult.notes],
        })
      },
    })
  }

  const areMoreNotes = data?.notes.length < data?.totalCount

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
      {areMoreNotes && (
        <Button moreNotes onClick={() => loadMoreNotes()}>
          More Notes
        </Button>
      )}
    </>
  )
}

export default NotesList
