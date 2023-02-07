import { Anchor, Container, Flex, Footer, Text } from '@mantine/core';

export function AppFooter() {
  return (
    <Footer height={60} p="md" bg="gray.0">
      <Container size="lg" px={0}>
        <Flex justify="space-between" align="center" columnGap={4}>
          <Text>Made with ❤️</Text>
          <Anchor href="https://cohere.ai/" target="_blank">co:here</Anchor>
        </Flex>
      </Container>
    </Footer>
  );
}
