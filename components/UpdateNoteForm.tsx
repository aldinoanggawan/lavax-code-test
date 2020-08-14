import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Form, Input } from '../styles/content'

type FormData = {
  title: string
  description: string
}

type UpdateNoteFormProps = {
  noteId: string | string[] | undefined
}

export const GET_NOTE = gql`
  query GetNoteById($id: ID) {
    note(id: $id) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($id: ID!, $noteInput: NoteInput!) {
    updateNote(id: $id, noteInput: $noteInput) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

const UpdateNoteForm = ({ noteId }: UpdateNoteFormProps) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormData>()

  const { data } = useQuery(GET_NOTE, {
    variables: {
      id: noteId,
    },
  })
  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION)

  const onSubmit = handleSubmit(formData => {
    updateNote({
      variables: { id: noteId, noteInput: formData },
    })
    router.push('/')
  })

  return (
    <Form onSubmit={onSubmit}>
      <Input
        name='title'
        type='text'
        ref={register}
        defaultValue={data.note.title}
      />
      <Input
        name='description'
        type='text'
        ref={register}
        defaultValue={data.note.description}
      />
      <Input button type='submit' value='SAVE' />
    </Form>
  )
}

export default UpdateNoteForm
