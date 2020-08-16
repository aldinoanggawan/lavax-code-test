import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { initializeApollo } from '../../apollo/client'
import NotesList, { GET_NOTES } from '../../components/NotesList'
import Layout from '../../components/layout'
import { Section, Container, H2 } from '../../styles/content'

const search = () => {
  const router = useRouter()
  const { search } = router.query

  const searchQueryVars = {
    search,
  }

  return (
    <Layout title={`| ${search}`}>
      <Section>
        <Container>
          <H2 center>Showing results for '{search}'</H2>
          <NotesList searchQueryVars={searchQueryVars} />
        </Container>
      </Section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_NOTES,
    variables: {
      search: params?.search,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default search
