import { slugify } from '@/lib/slugify';
import { formationsSeed } from './content/formations-data';
import { postCertifications } from './content/post-certifications';
import { postMarchesPublics } from './content/post-marches-publics';
import { postNearshore } from './content/post-nearshore';

/** Vérifie les contraintes de longueur du seed + l'idempotence des slugs. */
let issues = 0;

function check(label: string, value: string, max: number) {
  if (value.length > max) {
    issues++;
    console.log(`✗ ${label} : ${value.length} > ${max}\n   « ${value} »`);
  }
}

function checkSlug(label: string, slug: string) {
  const normalized = slugify(slug);
  if (normalized !== slug) {
    issues++;
    console.log(`✗ slug non stable ${label} :\n   déclaré  ${slug}\n   slugifié ${normalized}`);
  }
}

for (const [name, post] of Object.entries({
  marchesPublics: postMarchesPublics,
  nearshore: postNearshore,
  certifications: postCertifications,
})) {
  for (const locale of ['ar', 'fr', 'en'] as const) {
    const d = post[locale];
    check(`${name}.${locale}.excerpt`, d.excerpt, 300);
    check(`${name}.${locale}.seo.metaTitle`, d.seo.metaTitle, 60);
    check(`${name}.${locale}.seo.metaDescription`, d.seo.metaDescription, 155);
    checkSlug(`${name}.${locale}`, d.slug);
  }
}

for (const f of formationsSeed) {
  for (const locale of ['ar', 'fr', 'en'] as const) {
    const d = f[locale];
    check(`${f.key}.${locale}.summary`, d.summary, 300);
    check(`${f.key}.${locale}.seo.metaTitle`, d.seo.metaTitle, 60);
    check(`${f.key}.${locale}.seo.metaDescription`, d.seo.metaDescription, 155);
    checkSlug(`${f.key}.${locale}`, d.slug);
  }
}

console.log(issues === 0 ? '✓ Toutes les contraintes respectées' : `${issues} problème(s)`);
process.exit(issues === 0 ? 0 : 1);
