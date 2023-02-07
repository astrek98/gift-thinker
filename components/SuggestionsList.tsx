import { Button, Card, List, Space, Text, Title } from '@mantine/core';

type SuggestionsListProps = {
  gifts: string[];
};

export function SuggestionsList({ gifts = [] }: SuggestionsListProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Title order={3}>💡 Suggestions</Title>
      </Card.Section>
      <Space h="md"></Space>

      <List spacing="xs" icon={<span>🎁</span>}>
        {gifts.map((gift) => (
          <List.Item key={gift}>{gift}</List.Item>
        ))}
      </List>

      {gifts.length === 0 && (<Text>No suggestions yet.</Text>)}

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Save suggestions
      </Button>
    </Card>
  );
}
