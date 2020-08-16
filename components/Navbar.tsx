import Link from 'next/link'

import SearchBar from './SearchBar'
import { A, Container, Header } from '../styles/content'

const Navbar = () => {
  return (
    <Header>
      <Container nav>
        <Link href='/'>
          <A nav>
            <img src='/LavaNote.svg' alt='logo' />
          </A>
        </Link>
        <SearchBar />
      </Container>
    </Header>
  )
}

export default Navbar
