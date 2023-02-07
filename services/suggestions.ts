import { GiftSuggestion } from '@/models/GiftSuggestion.model';

export function saveGiftSuggestion(suggestion: GiftSuggestion) {
  window.localStorage.setItem('suggestion', JSON.stringify(suggestion));
}

export function getSavedGiftSuggestion(): GiftSuggestion | null {
  const item = window.localStorage.getItem('suggestion');
  return item ? JSON.parse(item) : null;
}
