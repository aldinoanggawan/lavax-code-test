import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { initializeApollo } from '../../apollo/client'
import Layout from '../../components/layout'
import UpdateNoteForm, { GET_NOTE } from '../../components/UpdateNoteForm'
import { Container, Section } from '../../styles/content'

const Note: NextPage = () => {
  const router = useRouter()
  const { noteId } = router.query

  return (
    <Layout title='| Edit Note'>
      <Section edit>
        <Container>
          <UpdateNoteForm noteId={noteId} />
        </Container>
      </Section>
    </Layout>
  )
}

// export getServerSideProps for Server Side Rendering
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_NOTE,
    variables: {
      id: params?.noteId,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Note
