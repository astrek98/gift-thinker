import {
  Container,
  Flex,
  Header,
  MediaQuery,
  Text,
  Title,
} from '@mantine/core';
import Image from 'next/image';

export function AppHeader() {
  return (
    <Header height={{ base: 60, xs: 75 }} px="md">
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Flex>
            <MediaQuery
              query="(max-width: 500px)"
              styles={{ width: 48, height: 48 }}
            >
              <Image
                src="/gift-bag_64.png"
                alt="Gift Thinker"
                width={64}
                height={64}
              />
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
          <Flex align="center" gap="sm">
            <a
              href="https://github.com/astrek98/gift-thinker"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/github.svg"
                width={56}
                height={56}
                alt="Github icon"
              />
            </a>
          </Flex>
        </div>
      </Container>
    </Header>
  );
}
