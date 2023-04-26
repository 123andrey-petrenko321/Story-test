import { useStories } from '@/pages/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ErrorPage from '../error/ErrorPage';
import Loader from '../loader/Loader';

const NewsList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  const { stories, isLoading, isError } = useStories(page);

  useEffect(() => {
    if (!dataLength) {
      setDataLength(stories?.nbPages);
    }
  }, [stories?.nbPages]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorPage />}
      {stories?.hits?.length && (
        <ul className='space-y-4 text-gray-500 list-disc list-inside list-none dark:text-gray-400 '>
          {stories?.hits?.map((el: any) => (
            <li key={el.objectID} className='flex flex-col items-start'>
              <Link
                href={`story/${el.objectID}`}
                className='pb-1 text-gray-800'
              >
                {el?.title}
              </Link>
              <a
                href={el?.url}
                target='_blank'
                className='text-sm text-gray-400'
              >
                {el?.url}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className='flex flex-col items-center'>
        <span className='text-sm text-gray-700 dark:text-gray-400'>
          Showing{' '}
          <span className='font-semibold text-gray-900 dark:text-white'>
            {' '}
            {page * 10 || 1}
          </span>{' '}
          to{' '}
          <span className='font-semibold text-gray-900 dark:text-white'>
            {page * 10 + 10}
          </span>{' '}
          of{' '}
          <span className='font-semibold text-gray-900 dark:text-white'>
            {dataLength * 10}
          </span>{' '}
          Entries
        </span>
        <div className='inline-flex mt-2 xs:mt-0'>
          <button
            disabled={!page}
            onClick={() => setPage((prev) => prev - 1)}
            className='px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className='px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsList;
