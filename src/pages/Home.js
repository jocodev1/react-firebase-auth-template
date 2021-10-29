import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { appName } from '..'

const Home = () => {
  return (
    <Box>
      <Text as="h1" fontSize="xl">{appName}</Text>
      <Text as="p">Click your profile icon at the top of the page to view more options.</Text>
    </Box>
  )
}

export default Home