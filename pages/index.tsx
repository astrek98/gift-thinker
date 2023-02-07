import { DescriptionForm } from '@/components/DescriptionForm';
import { Layout } from '@/components/Layout';
import { SuggestionsList } from '@/components/SuggestionsList';
import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import { Container, Grid, Stack } from '@mantine/core';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GiftSuggestion | null>(null);

  return (
    <Layout>
      <Container size="md">
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
              <SuggestionsList
                gifts={suggestions?.gifts ?? []}
              ></SuggestionsList>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  );
}
