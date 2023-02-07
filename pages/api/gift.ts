import cohere from '@/lib/cohere';
import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import type { NextApiRequest, NextApiResponse } from 'next';

const PROMPT_TEMPLATE = `This program generates a list of 5 gifts that you can give to a person given a description.

Description: introvert, man, travels a lot
Gifts:
1. A comfortable and functional travel pillow.
2. Noise-canceling headphones.
3. A travel mug or water bottle.
4. A compact and versatile power bank.
5. A travel-friendly toiletry bag.
--
Description: woman, wedding, likes cats, likes exercising
Gifts:
1. a set of sheets.
2. A cat-themed wedding guest book.
3. A personalized cat collar or ID tag for the couple's new pet.
4. A gift card to a local gym or yoga studio.
5. A pair of yoga pants or workout gear.
--
Description: kid, 10 years old, likes superheroes, likes swimming
Gifts:
1. A superhero-themed swimming towel.
2. A set of superhero-themed swimming trunks.
3. A beach ball.
4. a superhero costume.
5. A superhero-themed water bottle.
--
Description: {1}
Gifts:
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GiftSuggestion>
) {
  const { method, query } = req;
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  const description = query.description?.toString() || "It's his/her birthday";
  const prompt = PROMPT_TEMPLATE.replace('{1}', description);

  try {
    const response = await cohere.generate({
      model: 'command-xlarge-20221108',
      prompt,
      max_tokens: 250,
      temperature: 0.8,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ['--'],
      return_likelihoods: 'NONE',
    });

    const { text } = response.body.generations[0];
    const gifts = text
      .split('\n')
      .filter((gift) => gift.length && gift.match(/^\d/));

    res.status(200).json({ text, gifts });
  } catch (error: any) {
    console.error({ error: error.message });
    res.status(500);
  }
}
