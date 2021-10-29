import { Box, Container } from '@chakra-ui/react'
import Header from '../components/Header'

const AdminLayout = ({ children }) => (
  <Box>
    <Header />
    <Container maxW="container.lg">
      <Box pt={15}>
        { children }
      </Box>
    </Container>
  </Box>
)

export default AdminLayout
