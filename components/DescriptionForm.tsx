import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import { Button, Card, Space, Text, Textarea, Title } from '@mantine/core';
import { FormEvent, useRef } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from './icons/IconCheck';
import { IconX } from './icons/IconX';

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
      title: 'Generating gifts suggestions',
      message: '',
      autoClose: false,
      disallowClose: true,
    });

    try {
      const params = new URLSearchParams();
      params.append('description', description);
      const suggestions = await fetch(`/api/gift?${params.toString()}`).then(
        (r) => {
          setLoading(false);
          updateNotification({
            id: notificationId,
            color: 'teal',
            title: 'Done!',
            message: '',
            icon: <IconCheck size={16} />,
            autoClose: 2500,
          });
          return r.json();
        }
      );
      setSuggestions(suggestions);
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
      <Title order={3}>Welcome!</Title>
      <Text>
        Don&apos;t know what you can give to that special person? Don&apos;t
        worry! Just give me a description and I&apos;ll give you some
        suggestions.
      </Text>
      <Space h="lg" />
      <form onSubmit={handleSubmit}>
        <Textarea
          ref={descriptionInputRef}
          placeholder="write simething"
          minRows={8}
          label="Description"
          description="Example: likes DC superheroes, likes swimming, boy, 16 years old, travels a lot."
          withAsterisk
        />

        <Button
          fullWidth
          type="submit"
          variant="light"
          color="blue"
          mt="md"
          radius="md"
        >
          Start thinking!
        </Button>
      </form>
    </Card>
  );
}
