import ErrorPage from '@/components/error/ErrorPage';
import Loader from '@/components/loader/Loader';
import { useStory } from '@/pages/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Index: React.FC = () => {
  const { query } = useRouter();
  const { story, isLoading, isError } = useStory(query.story);

  return (
    <main className={`flex min-h-screen flex-col items-center p-12`}>
      <Link
        href='/'
        className='border-2 border-slate-400 rounded-lg	p-2 absolute left-3 top-1 cursor-pointer'
      >
        Back
      </Link>
      {isLoading && <Loader />}
      {isError && <ErrorPage />}
      {story && (
        <div className='flex flex-col gap-1 w-1/4 border-2 border-slate-400 rounded-lg	p-4	'>
          <div>{story?.title}</div>
          <div>Author: {story?.author}</div>
          <div>Points: {story?.points}</div>
        </div>
      )}
    </main>
  );
};

export default Index;
