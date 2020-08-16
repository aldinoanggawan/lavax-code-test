import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Button, Form, Input } from '../styles/content'
import { SearchIcon } from '../styles/icons'

const SearchBar = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(submitData => {
    router.push(`/search/${submitData.search}`)
  })
  return (
    <Form nav onSubmit={onSubmit}>
      <Input
        nav
        name='search'
        type='text'
        placeholder='Search...'
        ref={register}
      />
      <Button navButton type='submit'>
        <SearchIcon />
      </Button>
    </Form>
  )
}

export default SearchBar
