import SearchBar from './SearchBar'
import { Container, Header } from '../styles/content'

const Navbar = () => {
  return (
    <Header>
      <Container nav>
        <SearchBar />
      </Container>
    </Header>
  )
}

export default Navbar
