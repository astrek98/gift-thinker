import cohere from '@/lib/cohere';
import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GiftSuggestion>
) {
  const { method, query } = req;
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  const { prompt = 'Give a list of 5 birthday gifts' } = query;

  const response = await cohere.generate({
    model: 'command-xlarge-20221108',
    //   model: 'medium',
    prompt: prompt.toString(),
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
  const gifts = text.split('\n').filter((gift) => gift.length);

  res.status(200).json({ text, gifts });
}
