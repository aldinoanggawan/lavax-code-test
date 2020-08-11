import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Query {
    notes: [Note]!
  }

  type Note {
    title: String!
    description: String!
  }
`
