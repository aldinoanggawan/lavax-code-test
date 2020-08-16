import { NextPage, GetStaticProps } from 'next'

import { initializeApollo } from '../apollo/client'
import AddNoteForm from '../components/AddNoteForm'
import NotesList, { GET_NOTES, notesQueryVars } from '../components/NotesList'
import Layout from '../components/layout'
import { Container, Footer, Section } from '../styles/content'

const Home: NextPage = () => {
  return (
    <Layout title='| Home'>
      <Section>
        <Container>
          <AddNoteForm />
          <NotesList />
        </Container>
      </Section>
      <Footer>
        This is a static page, to get the latest update, refresh the page 2
        times.
      </Footer>
    </Layout>
  )
}

// export getStaticProps for SSG
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_NOTES,
    variables: notesQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1, // Next will attempt to regenerate when a request comes in at most once every second
  }
}

export default Home
