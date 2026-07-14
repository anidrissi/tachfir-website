'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Locale } from '@/i18n/routing';

/**
 * Permet aux pages à slug localisé (articles, formations) de fournir au
 * sélecteur de langue l'URL équivalente dans chaque locale.
 * Sans override, le sélecteur bascule la locale sur la route courante.
 */
export type LocaleAlternates = Partial<Record<Locale, string>>;

type Ctx = {
  alternates: LocaleAlternates | null;
  setAlternates: (a: LocaleAlternates | null) => void;
};

const AlternatesContext = createContext<Ctx>({
  alternates: null,
  setAlternates: () => {},
});

export function AlternatesProvider({ children }: { children: React.ReactNode }) {
  const [alternates, setAlternates] = useState<LocaleAlternates | null>(null);
  return (
    <AlternatesContext.Provider value={{ alternates, setAlternates }}>
      {children}
    </AlternatesContext.Provider>
  );
}

export function useAlternates() {
  return useContext(AlternatesContext);
}

/** À rendre dans une page CMS pour enregistrer ses URLs alternées. */
export function SetAlternates({ alternates }: { alternates: LocaleAlternates }) {
  const { setAlternates } = useAlternates();
  useEffect(() => {
    setAlternates(alternates);
    return () => setAlternates(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(alternates)]);
  return null;
}
