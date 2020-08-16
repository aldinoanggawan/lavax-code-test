import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { GET_NOTES, notesQueryVars } from './NotesList'
import { Form, Input } from '../styles/content'

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
      update: (proxy, { data: { createNote } }) => {
        const data: any = proxy.readQuery({
          query: GET_NOTES,
          variables: notesQueryVars,
        })
        // Update the cache with the new note
        proxy.writeQuery({
          query: GET_NOTES,
          variables: notesQueryVars,
          data: {
            ...data,
            notes: [createNote, ...data.notes],
          },
        })
        //Tell cache that the existing note data can be safely ignored (https://github.com/apollographql/apollo-client/issues/6451)
        proxy.evict({
          fieldName: 'notes',
          broadcast: false,
        })
      },
    })
    reset()
  })

  return (
    <Form onSubmit={onSubmit}>
      <Input
        name='title'
        type='text'
        placeholder='Enter title...'
        ref={register}
      />
      <Input
        name='description'
        type='text'
        placeholder='Enter description...'
        ref={register}
      />
      <div>
        <input name='important' id='important' type='checkbox' ref={register} />
        <label htmlFor='important'>Important ?</label>
      </div>
      <Input
        button
        type='submit'
        disabled={loading}
        value={loading ? 'LOADING...' : 'SUBMIT'}
      />
    </Form>
  )
}

export default AddNoteForm
