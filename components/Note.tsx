import moment from 'moment'
import Link from 'next/link'

import { H2, P, A, DeleteButton, Card, Row, Span } from '../styles/content'
import { DeleteIcon } from '../styles/icons'

type NoteProps = {
  id: string
  title: string
  description: string
  loading: boolean
  important: boolean
  isSearchPage: boolean
  updatedAt: number
  handleDeleteNote: (id: string) => void
}

const Note = ({
  id,
  title,
  description,
  loading,
  important,
  isSearchPage,
  updatedAt,
  handleDeleteNote,
}: NoteProps) => {
  const date = moment(updatedAt).format('lll')
  return (
    <Card>
      {!isSearchPage && (
        <DeleteButton disabled={loading} onClick={() => handleDeleteNote(id)}>
          <DeleteIcon />
        </DeleteButton>
      )}
      <H2 important={important}>{title}</H2>
      <P>{description}</P>
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
