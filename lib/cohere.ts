import cohere from 'cohere-ai';

const cohereApiKey = process.env.COHERE_API_KEY || '';
cohere.init(cohereApiKey);
console.log('Cohere initialized');

export default cohere;
