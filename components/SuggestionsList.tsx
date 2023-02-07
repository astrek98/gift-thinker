import { Button, Card, List, Space, Text, Title } from '@mantine/core';

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

      <List spacing="xs" icon={<span>🎁</span>}>
        {gifts.map((gift) => (
          <List.Item key={gift}>
            <Text size="lg">{gift}</Text>
          </List.Item>
        ))}
      </List>

      {gifts.length === 0 && <Text size="lg">No suggestions yet.</Text>}

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
    </Card>
  );
}
