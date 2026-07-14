import { CmsImage } from '@/components/content/cms-image';
import { Container } from '@/components/ui/container';
import { getClients } from '@/lib/content';

/**
 * Bandeau logos clients (CMS). Tant que les logos ne sont pas fournis,
 * les noms sont affichés en wordmarks sobres.
 */
export async function ClientsBand({ title }: { title: string }) {
  const clients = await getClients();
  if (clients.length === 0) return null;

  return (
    <section className="border-b border-border py-10">
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          {title}
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {clients.map((client) => (
            <li key={client.id} className="flex items-center">
              {client.logoLight && typeof client.logoLight !== 'number' ? (
                <>
                  <CmsImage
                    media={client.logoLight}
                    size="thumbnail"
                    className="h-8 w-auto opacity-80 transition-opacity hover:opacity-100 dark:hidden"
                    sizes="160px"
                  />
                  <CmsImage
                    media={
                      client.logoDark && typeof client.logoDark !== 'number'
                        ? client.logoDark
                        : client.logoLight
                    }
                    size="thumbnail"
                    className="hidden h-8 w-auto opacity-80 transition-opacity hover:opacity-100 dark:block"
                    sizes="160px"
                  />
                </>
              ) : (
                <span className="font-display text-lg font-bold uppercase tracking-wide text-muted/80">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
