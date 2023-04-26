import useSWR from 'swr';

const getStories = async <T>(url: string): Promise<T> =>
  await fetch(url).then((r) => r.json());

export const useStories = (page: number) => {
  const { data, error, isLoading } = useSWR(
    `http://hn.algolia.com/api/v1/search?page=${page}&hitsPerPage=10&query=`,
    getStories,
    { revalidateOnReconnect: true, revalidateIfStale: false }
  );
  return {
    stories: <any>data,
    isLoading,
    isError: error,
  };
};

export const useStory = (id: number) => {
  const { data, error, isLoading } = useSWR(
    `http://hn.algolia.com/api/v1/items/${id}`,
    getStories,
    { revalidateOnReconnect: true, revalidateIfStale: false }
  );
  return {
    story: <any>data,
    isLoading,
    isError: error,
  };
};
