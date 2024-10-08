import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for createRoot
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!); // Ensure to use non-null assertion if you are confident 'root' exists

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
