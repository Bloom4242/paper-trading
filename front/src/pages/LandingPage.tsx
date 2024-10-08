import React, { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Text,
  Image,
  Center,
  VStack,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// CSS for the moving background
const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/random/1920x1080?nature) no-repeat center center fixed',
    backgroundSize: 'cover',
    animation: 'move 15s linear infinite',
  },
  '@keyframes move': {
    '0%': { backgroundPosition: '0% 0%' },
    '100%': { backgroundPosition: '100% 0%' },
  },
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Modal controls for Signup and Login
  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  // State for form inputs
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/signup', signupData);
      setSignupData({ username: '', email: '', password: '' }); // Clear form
      onSignupClose(); // Close modal after submitting
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:4000/login',
        { username: loginData.username, password: loginData.password },
        { withCredentials: true }
      );
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Invalid credentials. Please try again.');
        console.error('Login error:', error.response?.data);
      } else {
        setError('An unexpected error occurred. Please try again later.');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Box textAlign="center" py={10} px={6} color="white">
        <Heading as="h1" size="4xl" mb={4}>
          Welcome to the Paper Trading Site
        </Heading>
        <Text fontSize="lg" mb={8}>
          Trade wisely, practice safely, and explore the world of trading.
        </Text>
        <Flex justifyContent="center" gap={4}>
          <Button colorScheme="blue" size="lg" onClick={onSignupOpen}>
            Sign Up
          </Button>
          <Button colorScheme="teal" size="lg" onClick={onLoginOpen}>
            Log In
          </Button>
        </Flex>

        <Center mt={10}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Image 
              src="https://placedog.net/300/200" 
              alt="Placeholder for business" 
              borderRadius="md" 
              boxShadow="lg"
              objectFit="cover"
              w={{ base: '100%', md: '300px' }} // Responsive size
            />
            <Image 
              src="https://placedog.net/300/200" 
              alt="Placeholder for finance" 
              borderRadius="md" 
              boxShadow="lg"
              objectFit="cover"
              w={{ base: '100%', md: '300px' }} // Responsive size
            />
          </Stack>
        </Center>
      </Box>

      {/* Signup Modal */}
      <Modal isOpen={isSignupOpen} onClose={onSignupClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSignupSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input 
                    name="username" 
                    value={signupData.username} 
                    onChange={handleSignupChange} 
                    placeholder="Enter your username"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email" 
                    name="email" 
                    value={signupData.email} 
                    onChange={handleSignupChange} 
                    placeholder="Enter your email"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input 
                    type="password" 
                    name="password" 
                    value={signupData.password} 
                    onChange={handleSignupChange} 
                    placeholder="Enter your password"
                    variant="filled"
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" mt={4}>
                  Sign Up
                </Button>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onSignupClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleLogin}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input 
                    type="text" 
                    name="username" 
                    value={loginData.username} 
                    onChange={handleLoginChange} 
                    placeholder="Enter your username"
                    variant="filled"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input 
                    type="password" 
                    name="password" 
                    value={loginData.password} 
                    onChange={handleLoginChange} 
                    placeholder="Enter your password"
                    variant="filled"
                  />
                </FormControl>
                <Button type="submit" colorScheme="teal" mt={4}>
                  Log In
                </Button>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onLoginClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LandingPage;
