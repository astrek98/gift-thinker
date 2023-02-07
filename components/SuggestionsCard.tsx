import { ReactNode } from 'react';
import {
  ActionIcon,
  Anchor,
  Card,
  Group,
  List,
  Menu,
  Space,
  Text,
  Title,
} from '@mantine/core';
import Image from 'next/image';
import GiftImage from '@/public/gift_32.png';
import { IconDots } from './icons/IconDots';
import { IconEye } from './icons/IconEye';

type SuggestionsCardProps = {
  gifts: string[];
  openSavedSuggestion: () => void;
  children?: ReactNode | null;
};

export function SuggestionsCard({
  gifts = [],
  openSavedSuggestion,
  children,
}: SuggestionsCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Title order={2}>💡 Suggestions</Title>

          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={36} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconEye size={20} />}
                onClick={openSavedSuggestion}
              >
                <Text size="md">Open saved suggestion</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Space h="md"></Space>

      <List spacing="xs" icon={<Image src={GiftImage} alt="gift icon" />}>
        {gifts.map((gift) => (
          <SuggestionItem key={gift} gift={gift} />
        ))}
      </List>

      {gifts.length === 0 && <Text size="lg">No suggestions yet.</Text>}

      {children}
    </Card>
  );
}

function SuggestionItem({ gift }: { gift: string }) {
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
}
