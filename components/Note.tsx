import moment from 'moment'
import Link from 'next/link'

import { H2, A, DeleteButton, Card, Row, Span } from '../styles/content'
import { DeleteIcon } from '../styles/icons'

type NoteProps = {
  id: string
  title: string
  description: string
  loading: boolean
  updatedAt: number
  handleDeleteNote: (id: string) => void
}

const Note = ({
  id,
  title,
  description,
  loading,
  updatedAt,
  handleDeleteNote,
}: NoteProps) => {
  const date = moment(updatedAt).format('lll')
  return (
    <Card>
      <DeleteButton disabled={loading} onClick={() => handleDeleteNote(id)}>
        <DeleteIcon />
      </DeleteButton>
      <H2>{title}</H2>
      <p>{description}</p>
      <Row>
        <Span date>{date}</Span>
        <Link href={`/${id}`} passHref>
          <A>Edit</A>
        </Link>
      </Row>
    </Card>
  )
}

export default Note
