import { DescriptionForm } from '@/components/DescriptionForm';
import { Layout } from '@/components/Layout';
import { SuggestionsCard } from '@/components/SuggestionsCard';
import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/components/utils/notifications';
import { Anchor, Button, Container, Grid, Stack } from '@mantine/core';
import { useState } from 'react';
import {
  getSavedGiftSuggestion,
  saveGiftSuggestion,
} from '@/services/suggestions';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GiftSuggestion | null>(null);

  const saveSuggestion = () => {
    if (!suggestions) return;
    saveGiftSuggestion(suggestions);
    showSuccessNotification({
      id: 'save-data',
      title: 'Saved!',
    });
  };

  const openSavedSuggestion = () => {
    const suggestion = getSavedGiftSuggestion();
    if (!suggestion) {
      showErrorNotification({ id: 'no-saved-data', title: 'No saved data found' });
      return;
    }
    setSuggestions(suggestion);
    showSuccessNotification({
      id: 'open-data',
      title: 'Done!',
    });
  };

  const gifts = suggestions?.gifts ?? [];

  return (
    <Layout>
      <Container size="lg" px={0}>
        <Grid>
          <Grid.Col sm={6}>
            <DescriptionForm
              loading={loading}
              setLoading={setLoading}
              setSuggestions={setSuggestions}
            />
          </Grid.Col>
          <Grid.Col sm={6}>
            <Stack>
              <SuggestionsCard
                gifts={gifts}
                openSavedSuggestion={openSavedSuggestion}
              >
                {gifts.length > 0 && (
                  <Button
                    fullWidth
                    variant="light"
                    color="blue"
                    mt="md"
                    radius="md"
                    size="lg"
                    onClick={saveSuggestion}
                  >
                    Save
                  </Button>
                )}
              </SuggestionsCard>

              {suggestions?.gifts?.length && (
                <Anchor
                  href="https://www.flaticon.es/iconos-gratis/presente"
                  target="_blank"
                  size="sm"
                >
                  Gift box icon created by QudaDesign - Flaticon
                </Anchor>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  );
}
