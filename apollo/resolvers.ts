import Note from '../models/Note'

export const resolvers = {
  Query: {
    notes: () => Note.find({}),
  },
}
