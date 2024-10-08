import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4000/login', { username, password }, { withCredentials: true });
      navigate('/dashboard'); // Redirect to the dashboard upon successful login
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
    <Box>
      <Heading>Login</Heading>
      <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
      <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <Button onClick={handleSubmit}>Login</Button>
      {error && <Text color="red.500">{error}</Text>} {/* Display error message */}
    </Box>
  );
};

export default Login;
