import Link from 'next/link'

import { H2, A, DeleteButton, Card, Row } from '../styles/content'
import { DeleteIcon } from '../styles/icons'

type NoteProps = {
  id: string
  title: string
  description: string
  loading: boolean
  handleDeleteNote: (id: string) => void
}

const Note = ({
  id,
  title,
  description,
  loading,
  handleDeleteNote,
}: NoteProps) => {
  return (
    <Card>
      <DeleteButton disabled={loading} onClick={() => handleDeleteNote(id)}>
        <DeleteIcon />
      </DeleteButton>
      <H2>{title}</H2>
      <p>{description}</p>
      <Row right>
        <Link href={`/${id}`} passHref>
          <A>Edit</A>
        </Link>
      </Row>
    </Card>
  )
}

export default Note
