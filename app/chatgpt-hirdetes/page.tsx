import type { Metadata } from 'next';
import { ChatGptPage } from '@/components/chatgpt-hirdetes/ChatGptPage';

export const metadata: Metadata = {
  title: 'ChatGPT-hirdetés — új lehetőség, alacsony verseny | NEZOR',
  description: 'Hirdess a ChatGPT-n, mielőtt mindenki más felfedezi. Beállítjuk neked gyorsan.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChatGptLandingRoute() {
  return <ChatGptPage />;
}
