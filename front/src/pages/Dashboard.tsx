import React from 'react';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Switch,
  useColorMode,
  useToast, // Import useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Tooltip,
  Legend,
} from 'chart.js';

import withAuth from '../util/withAuth';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast(); // Initialize the toast

  // Example data for the chart
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Paper Trading Data',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Function to delete a cookie
  function deleteCookie(cookieName: string): void {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Logout function
  const logOut = async () => {
    try {
      deleteCookie('token');
      toast({ // Show toast notification
        title: "Logged Out",
        description: "You have successfully logged out.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Redirect to the landing page after logout
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <Box p={5} borderRadius="md" shadow="md">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading>Dashboard</Heading>
        <Switch 
          isChecked={colorMode === 'dark'} 
          onChange={toggleColorMode} 
          colorScheme="teal"
          size="lg"
        />
      </Flex>
      <Flex mb={4}>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Statistics</Tab>
            <Tab>Reports</Tab>
          </TabList>
        </Tabs>
        <Spacer />
        <Button colorScheme="teal" ml={3} onClick={onProfileOpen}>
          Profile
        </Button>
        <Button colorScheme="teal" ml={3} onClick={onSettingsOpen}>
          Settings
        </Button>
        <Button colorScheme="red" ml={3} onClick={logOut}>
          Log Out
        </Button>
      </Flex>

      <Flex mb={4} justifyContent="center">
        <Box width="70%">
          <Line data={chartData} />
        </Box>
      </Flex>

      <Tabs variant="soft-rounded">
        <TabPanels>
          <TabPanel>
            <Text fontSize="lg" mb={2}>Welcome to your dashboard!</Text>
          </TabPanel>
          <TabPanel>
            <Text fontSize="lg" mb={2}>Statistics content goes here.</Text>
          </TabPanel>
          <TabPanel>
            <Text fontSize="lg" mb={2}>Reports content goes here.</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Profile Modal */}
      <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your profile details go here.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onProfileClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Settings options go here.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSettingsClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default withAuth(Dashboard);
