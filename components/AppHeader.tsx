import {
  Anchor,
  Container,
  Flex,
  Header,
  MediaQuery,
  Text,
  Title,
} from '@mantine/core';
import Image from 'next/image';
import Logo from '@/public/gift-bag_64.png';
import GithubSVG from '@/public/github.svg';

export function AppHeader() {
  return (
    <Header height={{ base: 60, xs: 75 }} px="md">
      <Container size="lg" px={0}>
        <Flex align="center" h="100%" justify="space-between">
          <HeaderTitleSection />
          <HeaderActionsSection />
        </Flex>
      </Container>
    </Header>
  );
}

function HeaderTitleSection() {
  return (
    <Flex>
      <MediaQuery query="(max-width: 500px)" styles={{ width: 48, height: 48 }}>
        <Image src={Logo} alt="Gift Thinker logo" />
      </MediaQuery>
      <Title order={1} pl={8}>
        <MediaQuery query="(max-width: 500px)" styles={{ fontSize: 36 }}>
          <Text
            span
            variant="gradient"
            gradient={{ from: 'red.7', to: 'red.6', deg: 45 }}
            size={44}
            fw={800}
          >
            Gift
          </Text>
        </MediaQuery>
        <MediaQuery query="(max-width: 500px)" styles={{ fontSize: 24 }}>
          <Text
            span
            size={32}
            fw={700}
            variant="gradient"
            gradient={{ from: 'violet', to: 'grape.5', deg: 45 }}
          >
            Thinker
          </Text>
        </MediaQuery>
      </Title>
    </Flex>
  );
}

function HeaderActionsSection() {
  return (
    <Flex align="center" gap="sm">
      <Anchor href="https://github.com/astrek98/gift-thinker" target="_blank">
        <Image src={GithubSVG} width={56} height={56} alt="Github icon" />
      </Anchor>
    </Flex>
  );
}
