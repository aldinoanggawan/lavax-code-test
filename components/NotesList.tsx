import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

import Note from './Note'
import { H2, Button, Div, Span } from '../styles/content'

interface Notes {
  id: string
  title: string
  description: string
  important: boolean
  updatedAt: number
}

interface NotesData {
  totalCount: number
  notes: [Notes]
}

interface NotesVars {
  first?: number
  skip?: number
  search?: string | string[]
  important?: boolean
}

interface NotesListProps {
  searchQueryVars?: NotesVars
}

export const GET_NOTES = gql`
  query GetNotes(
    $first: Int
    $skip: Int
    $search: String
    $important: Boolean
  ) {
    totalCount
    notes(
      orderBy: { field: "updatedAt", order: DESC }
      first: $first
      skip: $skip
      search: $search
      important: $important
    ) {
      id
      title
      description
      important
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
  important: false,
}

const NotesList = ({ searchQueryVars }: NotesListProps) => {
  const [isNotFiltered, setIsNotFiltered] = useState(true)

  const { data, fetchMore } = useQuery<NotesData, NotesVars>(GET_NOTES, {
    variables: searchQueryVars ?? notesQueryVars,
  })
  // to fix the order after updating the note in SSR mode
  const sortedNotes = [...data?.notes].sort((a, b) => b.updatedAt - a.updatedAt)

  const [deleteNote, { loading }] = useMutation(DELETE_NOTE_MUTATION)

  const handleDeleteNote = (id: string) => {
    deleteNote({
      variables: { id },
      update: cache => {
        const data = cache.readQuery<NotesData>({
          query: GET_NOTES,
          variables: notesQueryVars,
        })
        const newData = data?.notes.filter((n: Notes) => n.id !== id)
        //Tell cache that the existing note data can be safely ignored (https://github.com/apollographql/apollo-client/issues/6451)
        cache.evict({
          fieldName: 'notes',
          broadcast: false,
        })
        // Update the cache without the deleted note
        cache.writeQuery({
          query: GET_NOTES,
          variables: notesQueryVars,
          data: {
            ...data,
            notes: {
              ...data?.notes,
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

  const toggleFilter = () => {
    setIsNotFiltered(prevState => !prevState)

    fetchMore({
      variables: {
        first: 0,
        important: isNotFiltered,
      },
      updateQuery: (prev, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          notes: [...fetchMoreResult.notes],
        })
      },
    })
  }

  const areMoreNotes = data?.notes.length < data?.totalCount
  const showButton = isNotFiltered && !searchQueryVars

  return (
    <>
      {!searchQueryVars && (
        <Div>
          <Span>
            Filter:{' '}
            <Button
              filter='true'
              bright={!isNotFiltered}
              onClick={() => toggleFilter()}
            >
              Important
            </Button>
          </Span>
        </Div>
      )}
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
        <H2 center light>
          No available note
        </H2>
      )}
      {areMoreNotes && showButton && (
        <Button moreNotes onClick={() => loadMoreNotes()}>
          More Notes
        </Button>
      )}
    </>
  )
}

export default NotesList
