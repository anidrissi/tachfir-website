/** Concatène des classes conditionnelles (clsx minimal, sans dépendance). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
