import NewsList from '@/components/newsList/NewsList';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
    >
      <h1 className={`mb-3 text-2xl ${inter.className}`}>Best news</h1>
      <NewsList />
    </main>
  );
}
