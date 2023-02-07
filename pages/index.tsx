import { DescriptionForm } from '@/components/DescriptionForm';
import { Layout } from '@/components/Layout';
import { SuggestionsList } from '@/components/SuggestionsList';
import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import { Anchor, Container, Grid, Stack } from '@mantine/core';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GiftSuggestion | null>(null);

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
              <SuggestionsList
                gifts={suggestions?.gifts ?? []}
              ></SuggestionsList>
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
