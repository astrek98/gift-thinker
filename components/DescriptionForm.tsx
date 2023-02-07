import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import { Button, Card, Space, Text, Textarea, Title } from '@mantine/core';
import { FormEvent, useRef } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from './icons/IconCheck';
import { IconX } from './icons/IconX';
import { getSuggestion } from '@/services/suggestions';

const removeListItemNumber = (gift: string) => gift.replace(/^\d\./, '').trim();

type DescriptionProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSuggestions: (suggestions: GiftSuggestion | null) => void;
};

export function DescriptionForm({
  loading,
  setLoading,
  setSuggestions,
}: DescriptionProps) {
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) {
      console.log('Loading...');
      return;
    }
    const description = descriptionInputRef.current?.value;
    if (!description) {
      console.error('No description');
      return;
    }

    setLoading(true);
    const notificationId = 'load-data';
    showNotification({
      id: notificationId,
      loading: true,
      title: 'Generating gift suggestions',
      message: '',
      autoClose: false,
      disallowClose: true,
    });

    try {
      const suggestion = await getSuggestion(description);
      suggestion.gifts = suggestion.gifts.map(removeListItemNumber);
      setLoading(false);
      setSuggestions(suggestion);
      updateNotification({
        id: notificationId,
        color: 'teal',
        title: 'Done!',
        message: '',
        icon: <IconCheck size={16} />,
        autoClose: 2500,
      });
    } catch (e: any) {
      updateNotification({
        id: notificationId,
        color: 'red',
        title: 'Ups, something went wrong, try again',
        message: e.message || '',
        icon: <IconX size={16} />,
        autoClose: 2500,
      });
    }
  }
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={2}>Welcome!</Title>
      <Text size="lg">
        Don&apos;t know what you can give to that special someone? Don&apos;t
        worry! Just give me a description and I&apos;ll help you with some
        suggestions 💡.
      </Text>
      <Space h="lg" />
      <form onSubmit={handleSubmit}>
        <Textarea
          size="lg"
          ref={descriptionInputRef}
          placeholder="write something"
          minRows={6}
          label="Description"
          description="Example: likes walking, boy, 16 years old, travels a lot, it's his birthday."
          withAsterisk
        />

        <Button
          fullWidth
          type="submit"
          variant="light"
          color="blue"
          mt="md"
          radius="md"
          size="lg"
        >
          Start thinking!
        </Button>
      </form>
    </Card>
  );
}
