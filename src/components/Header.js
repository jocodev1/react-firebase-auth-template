import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  useDisclosure,
  Text,
  Container
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import defaultProfilePic from '../assets/default_prof_pic.jpg'

export const SideMenu = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const logout = () => {
    auth.signOut()
  }

  return (
    <>
      <Box h={85} w={50} display="flex" justifyContent="center" alignItems="center" color="pink.400" fontWeight={600}>
        { user !== null
          ? <Image className="profile" src={user?.photoURL} alt="profile" onClick={onOpen} ref={btnRef} />
          : <Image className="profile" src={defaultProfilePic} alt="profile" onClick={onOpen} ref={btnRef} />
        }
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            { user !== null
              ? <Image className="profile" src={user?.photoURL} alt="profile" />
              : <Image className="profile" src={defaultProfilePic} alt="profile" />
            }
            <Text mt={2} fontSize="0.9em">{user?.displayName}</Text>
          </DrawerHeader>
          <DrawerBody>
            <DrawerLink path="/" onClick={onClose}>Home</DrawerLink>
            <DrawerLink onClick={() => { logout(); onClose(); }}>Logout</DrawerLink>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const DrawerLink = ({ children, path, onClick }) => {
  const history = useHistory()

  return (
    <Box my={3} py={2}>
      <a href="/" onClick={e => {
        e.preventDefault()
        onClick()
        path && history.push(path)
      }}>
        <Text fontWeight={600}>
          {children}
        </Text>
      </a>
    </Box>
  )
}

export const Header = ({ color = 'gray.700', links, ...props }) => (
  <Box className="header header-white" zIndex={1100} boxShadow="0 2px 15px rgb(0, 0, 0, 0.1)">
    <Container maxW="container.lg">
      <SideMenu links={links} />
    </Container>
  </Box>
)

export default Header;
