import { Anchor, Button, Card, List, Space, Text, Title } from '@mantine/core';
import Image from 'next/image';
import GiftImage from '@/public/gift_32.png';

type SuggestionsListProps = {
  gifts: string[];
};

export function SuggestionsList({ gifts = [] }: SuggestionsListProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Title order={2}>💡 Suggestions</Title>
      </Card.Section>
      <Space h="md"></Space>

      <List spacing="xs" icon={<Image src={GiftImage} alt="gift icon" />}>
        {gifts.map((gift) => {
          return (
            <List.Item key={gift}>
              <Anchor
                size="lg"
                href={`https://www.google.com/search?q=${gift}&tbm=shop`}
                target="_blank"
              >
                {gift}
              </Anchor>
            </List.Item>
          );
        })}
      </List>

      {/* eslint-disable-next-line multiline-ternary */}
      {gifts.length === 0 ? (
        <Text size="lg">No suggestions yet.</Text>
      ) : (
        <Button
          fullWidth
          variant="light"
          color="blue"
          mt="md"
          radius="md"
          size="lg"
        >
          Save
        </Button>
      )}
    </Card>
  );
}
