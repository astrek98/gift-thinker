import { GiftSuggestion } from '@/models/GiftSuggestion.model';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent, useRef, useState } from 'react';

export default function Home() {
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDescription, setLastDescription] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<GiftSuggestion | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) {
      console.log('Already loading');
      return;
    }
    const description = descriptionInputRef.current?.value;
    if (!description) {
      console.log('No description');
      return;
    }
    console.log({ description });
    if (lastDescription === description) {
      console.log('Same description');
      return;
    }
    setLastDescription(description);
    setIsLoading(true);

    const params = new URLSearchParams();
    params.append('description', description);
    const suggestions = await fetch(`/api/gift?${params.toString()}`).then(
      (r) => {
        setIsLoading(false);
        return r.json();
      }
    );
    console.log({ suggestions });
    setSuggestions(suggestions);
  }

  return (
    <>
      <Head>
        <title>Gift Thinker</title>
      </Head>
      <header>
        <h1>
          <Image
            src="/gift_128.png"
            alt="Gift"
            width={96}
            height={96}
            priority
          />{' '}
          Gift Thinker
        </h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Give a short description of the person <span>*</span>
            <textarea
              ref={descriptionInputRef}
              defaultValue=""
              placeholder="Example: Introvert, man, likes the beach, likes DC superheroes"
              rows={6}
              required={true}
            ></textarea>
          </label>

          <div>
            <button>Think gifts</button>
          </div>
        </form>

        <section>
          <h2>Suggestions:</h2>
          {suggestions && (
            <ul>
              {suggestions.gifts.map((gift) => (
                <li key={gift}>
                  <span>{gift}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <footer>
        <a
          href="https://www.flaticon.es/iconos-gratis/presente"
          title="presente iconos"
        >
          Presente iconos creados por QudaDesign - Flaticon
        </a>
      </footer>
    </>
  );
}
