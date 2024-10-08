import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Heading } from '@chakra-ui/react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState(''); // New state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Send username along with email and password
      await axios.post('http://localhost:4000/signup', { username, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Signup error', error);
    }
  };

  return (
    <Box>
      <Heading>Signup</Heading>
      <Input 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)} // Set username
        value={username} 
      />
      <Input 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <Input 
        placeholder="Password" 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <Button onClick={handleSubmit}>Signup</Button>
    </Box>
  );
};

export default Signup;
