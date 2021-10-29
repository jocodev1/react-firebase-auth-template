import { Box } from '@chakra-ui/react'

const DefaultLayout = ({ children }) => (
  <Box display="flex" h="100vh" placeContent="center">
    <Box placeSelf="center">
      { children }
    </Box>
  </Box>
)

export default DefaultLayout
