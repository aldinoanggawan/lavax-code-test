import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'

import { GET_NOTES } from './NotesList'
import { Form, Input } from '../styles/content'

type FormData = {
  title: string
  description: string
}

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($noteInput: NoteInput!) {
    createNote(noteInput: $noteInput) {
      id
      title
      description
    }
  }
`

const AddNoteForm = () => {
  const { register, handleSubmit, reset } = useForm<FormData>()

  const [createNote, { loading }] = useMutation(CREATE_NOTE_MUTATION)

  const onSubmit = handleSubmit(formData => {
    createNote({
      variables: { noteInput: formData },
      update: (proxy, { data: { createNote } }) => {
        const data: any = proxy.readQuery({
          query: GET_NOTES,
        })
        // Update the cache with the new note
        proxy.writeQuery({
          query: GET_NOTES,
          data: {
            ...data,
            notes: [createNote, ...data.notes],
          },
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
