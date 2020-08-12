import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

import { GET_NOTES } from './NotesList'
import { Form, Input } from '../styles/content'

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($title: String!, $description: String!) {
    createNote(title: $title, description: $description) {
      id
      title
      description
    }
  }
`

const AddNoteForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [createNote, { loading }] = useMutation(CREATE_NOTE_MUTATION)

  const handleOnChangeTitle = (e: any) => {
    setTitle(e.target.value)
  }

  const handleOnChangeDescription = (e: any) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    createNote({
      variables: { title, description },
      update: (proxy, { data: { createNote } }) => {
        const data: any = proxy.readQuery({
          query: GET_NOTES,
        })
        // Update the cache with the new note
        proxy.writeQuery({
          query: GET_NOTES,
          data: {
            ...data,
            notes: [...data.notes, createNote],
          },
        })
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name='title'
        type='text'
        placeholder='Enter title...'
        value={title}
        onChange={handleOnChangeTitle}
      />
      <Input
        name='description'
        type='text'
        placeholder='Enter description...'
        value={description}
        onChange={handleOnChangeDescription}
      />
      <Input
        type='submit'
        disabled={loading}
        value={loading ? 'LOADING...' : 'SUBMIT'}
      />
    </Form>
  )
}

export default AddNoteForm
