import { Box, Flex, Text, Button } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
                    NextChakraApp
        </Text>
      </Flex>

      <Box display="flex" width="auto" alignItems="center">
        <Button variant="outline" _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}>
                    Home
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
