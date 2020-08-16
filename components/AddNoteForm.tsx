import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { GET_NOTES, notesQueryVars } from './NotesList'
import { H2, Card, Div, Form, Input, Label, TextArea } from '../styles/content'

type FormData = {
  title: string
  description: string
  important: boolean
}

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($noteInput: NoteInput!, $important: Boolean) {
    createNote(noteInput: $noteInput, important: $important) {
      id
      title
      description
      updatedAt
      important
    }
  }
`

const AddNoteForm = () => {
  const { register, handleSubmit, reset } = useForm<FormData>()

  const [createNote, { loading }] = useMutation(CREATE_NOTE_MUTATION)

  const onSubmit = handleSubmit(({ title, description, important }) => {
    createNote({
      variables: { noteInput: { title, description }, important },
      update: (cache, { data: { createNote } }) => {
        const data: any = cache.readQuery({
          query: GET_NOTES,
          variables: notesQueryVars,
        })
        // Update the cache with the new note
        cache.writeQuery({
          query: GET_NOTES,
          variables: notesQueryVars,
          data: {
            ...data,
            notes: [createNote, ...data.notes],
          },
        })
        //Tell cache that the existing note data can be safely ignored (https://github.com/apollographql/apollo-client/issues/6451)
        cache.evict({
          fieldName: 'notes',
          broadcast: false,
        })
      },
    })
    reset()
  })

  return (
    <Card form='true'>
      <H2 center>Add Note</H2>
      <Form onSubmit={onSubmit}>
        <Input
          name='title'
          type='text'
          placeholder='Enter title...'
          ref={register}
        />
        <TextArea
          name='description'
          placeholder='Enter description...'
          ref={register}
        />
        <Div form='true'>
          <input
            name='important'
            id='important'
            type='checkbox'
            ref={register}
          />
          <Label htmlFor='important'>Important</Label>
        </Div>
        <Input
          button
          type='submit'
          disabled={loading}
          value={loading ? 'LOADING...' : 'SUBMIT'}
        />
      </Form>
    </Card>
  )
}

export default AddNoteForm
