'use client';

import { usePathname } from 'next/navigation';
import { PageCard, tituloDe } from '../shell';

// Páginas ainda por fazer: só mostram o título da navbar
export default function EmConstrucao() {
  const path = usePathname();
  return (
    <PageCard titulo={tituloDe(path)}>
      <div className='flex flex-1 items-center justify-center p-6 text-sm opacity-60'>
        Página em construção
      </div>
    </PageCard>
  );
}
