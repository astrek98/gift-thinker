import { GiftSuggestion } from '@/models/GiftSuggestion.model';

export function getSuggestion(description: string): Promise<GiftSuggestion> {
  const params = new URLSearchParams();
  params.append('description', description);
  return fetch(`/api/gift?${params.toString()}`).then((r) => r.json());
}

export function saveGiftSuggestion(suggestion: GiftSuggestion) {
  window.localStorage.setItem('suggestion', JSON.stringify(suggestion));
}

export function getSavedGiftSuggestion(): GiftSuggestion | null {
  const item = window.localStorage.getItem('suggestion');
  return item ? JSON.parse(item) : null;
}
