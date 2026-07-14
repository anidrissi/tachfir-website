import { cn } from '@/lib/utils';

/**
 * Élément signature : « matrice de chiffrement ».
 * Le mot TACHFIR encodé en binaire (7 caractères × 8 bits), rendu en
 * matrice de points. Purement décoratif (aria-hidden), hérite de currentColor.
 */
const WORD = 'TACHFIR';
const BITS: number[] = Array.from(WORD).flatMap((ch) =>
  ch
    .charCodeAt(0)
    .toString(2)
    .padStart(8, '0')
    .split('')
    .map(Number),
);

const COLS = 14; // 7×8 = 56 bits → grille 14×4
const ROWS = Math.ceil(BITS.length / COLS);
const CELL = 10;
const DOT = 3.2;

export function CipherPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      aria-hidden="true"
      className={cn('pointer-events-none select-none', className)}
    >
      {BITS.map((bit, i) => {
        const x = (i % COLS) * CELL + CELL / 2;
        const y = Math.floor(i / COLS) * CELL + CELL / 2;
        return bit === 1 ? (
          <rect
            key={i}
            x={x - DOT / 2}
            y={y - DOT / 2}
            width={DOT}
            height={DOT}
            rx={0.8}
            fill="currentColor"
          />
        ) : (
          <circle key={i} cx={x} cy={y} r={0.9} fill="currentColor" opacity={0.35} />
        );
      })}
    </svg>
  );
}

/** Bande décorative fine (séparateur de sections). */
export function CipherDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center py-2 text-sarcelle/40 dark:text-sarcelle-vif/30', className)} aria-hidden="true">
      <CipherPattern className="h-6 w-auto" />
    </div>
  );
}
