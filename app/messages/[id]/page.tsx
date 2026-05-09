import { notFound } from 'next/navigation';
import { messageThreads, findThreadById } from '@/data/messages';
import DMThreadView from './DMThreadView';

export function generateStaticParams() {
  return messageThreads.map((m) => ({ id: m.id }));
}

export default function DMThreadPage({ params }: { params: { id: string } }) {
  const thread = findThreadById(params.id);
  if (!thread) return notFound();
  return <DMThreadView thread={thread} />;
}
