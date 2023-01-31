import cohere from '@/lib/cohere';
import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import type { NextApiRequest, NextApiResponse } from 'next';

const PROMPT_TEMPLATE =
  'Give me a list of 5 gifts that I can give to a person with the next characteristics: {1}';

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

  const response = await cohere.generate({
    model: 'command-xlarge-20221108',
    prompt,
    max_tokens: 300,
    temperature: 1,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE',
  });

  const { text } = response.body.generations[0];
  const gifts = text
    .split('\n')
    .filter((gift) => gift.length && gift.match(/^\d/));

  res.status(200).json({ text, gifts });
}
