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
    setIsLoading(true);
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
        <h1 className="text-5xl text-blue-500 font-bold flex items-center">
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
      <main className="mb-24">
        <form onSubmit={handleSubmit}>
          <label className="font-medium">
            Give a short description of the person{' '}
            <span className="text-red-500">*</span>
            <textarea
              ref={descriptionInputRef}
              defaultValue=""
              placeholder="Example: Introvert, man, likes the beach, likes DC superheroes"
              rows={6}
              required={true}
              className="font-normal rounded-md w-full py-3 px-4 border border-gray-300 focus:outline-none focus:border-blue-300"
            ></textarea>
          </label>

          <div className="flex justify-end">
            <button className="mt-2 border py-0 px-5 h-12 rounded-md font-semibold w-auto bg-blue-500 text-white">
              Think gifts
            </button>
          </div>
        </form>

        <section>
          <h2 className='font-bold text-2xl mb-2'>Suggestions:</h2>
          {suggestions && (
            <ul>
              {suggestions.gifts.map((gift) => (
                <li key={gift}>
                  <span className="text-xl">{gift}</span>
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
