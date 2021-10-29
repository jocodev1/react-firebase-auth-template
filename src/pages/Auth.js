import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import { appName } from '..'

const Auth = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const [user] = useAuthState(auth)

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch(error) {
      console.log(error)
    }
  }

  const logout = () => {
    auth.signOut()
  }

  return (
    <Box w={300} py={10} backgroundColor="white" border="1px solid #f9f9f9" borderRadius="1em" textAlign="center">
      <Text fontSize="xl" fontWeight="bold">{appName}</Text>
      { user !== null
        ? (
          <div>
            <img className="profile" src={user?.photoURL} alt="profile" />
            <p>Logged in as: {user?.displayName}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )
        : <Button mt={10} colorScheme="teal" onClick={handleLogin}>Login with Google</Button>
      }
    </Box>
  )
}

export default Auth
