import { ApolloServer } from 'apollo-server-micro'

import { schema } from '../../apollo/schema'
import dbConnect from '../../utils/dbConnect'

dbConnect()

const apolloServer = new ApolloServer({ schema })

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
