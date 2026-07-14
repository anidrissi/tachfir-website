# Tachfir — www.tachfir.com

Site vitrine trilingue **arabe (défaut, RTL) / français / anglais** avec CMS
intégré, pour Tachfir : développement web & mobile, cybersécurité, conseil IT
& nearshore, formation et fourniture de matériel informatique au Maroc.

**Stack** : Next.js 16 (App Router, TypeScript strict, RSC) · Tailwind CSS v4
(propriétés logiques, RTL-first) · next-intl (pathnames localisés, slugs
arabes) · Payload CMS 3 intégré (`/admin`) · SQLite en dev / Postgres en prod ·
Vercel Blob (médias) · React Hook Form + Zod · Resend · next-themes ·
SSG + revalidation à la demande.

---

## 1. Démarrage local (aucun compte externe requis)

Prérequis : Node.js ≥ 20.9 (recommandé 22), npm 10+.

```bash
git clone [REPO_GITHUB] && cd website
npm install
cp .env.example .env        # compléter PAYLOAD_SECRET (openssl rand -hex 32)
npm run seed                # crée le schéma SQLite + admin + contenus de démo
npm run dev                 # http://localhost:3000
```

- Site : `http://localhost:3000` (arabe), `/fr`, `/en`
- Admin : `http://localhost:3000/admin` — identifiants du `.env`
  (`PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD`)
- Emails : sans `RESEND_API_KEY`, les soumissions de formulaires s'affichent
  dans la console serveur.

### Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` / `npm start` | build de production / serveur de prod |
| `npm run lint` / `npm run typecheck` | ESLint / `tsc --noEmit` |
| `npm run seed` | seed **idempotent** (schéma dev + admin + settings + contenus) |
| `npm run generate:types` | régénère `src/payload-types.ts` après un changement de collections |
| `npm run generate:importmap` | régénère l'import map de l'admin |
| `npm run payload` | CLI Payload (`-- migrate:create`, `-- migrate`, …) |

## 2. Structure

```
messages/{ar,fr,en}.json          textes d'interface (400 clés/locale, parité vérifiée)
src/
  app/(frontend)/[locale]/        pages du site (SSG, RTL-first)
  app/(payload)/                  admin Payload + API REST (/admin, /api)
  app/api/{quote,contact,og}/     formulaires + images OG dynamiques
  app/{sitemap.ts,robots.ts}      SEO technique
  collections/ globals/           schéma CMS (posts, formations, testimonials,
                                  clients, media, users + global settings)
  components/                     UI, layout, contenus, formulaires, SEO
  config/company.ts               données entreprise (placeholders [EN_ATTENTE])
  config/editorial.ts             slugs stables des contenus seedés (maillage interne)
  i18n/routing.ts                 locales + pathnames localisés (AR en arabe)
  proxy.ts                        middleware next-intl + redirections 301
  seed/                           seed idempotent + contenus de lancement
```

## 3. Gérer les contenus (équipe Tachfir)

Connexion sur `/admin` (interface en français ; chaque utilisateur peut passer
en AR/EN dans son compte). Rôles : **admin** (tout) · **editor** (contenus
uniquement — pas d'accès aux utilisateurs).

**Ajouter un article** : Articles (blog) → « Créer » → renseigner titre,
extrait, contenu, catégorie, image (alt obligatoire) → onglet de langue
(العربية / Français / English) pour saisir chaque version — le slug se génère
depuis le titre (en arabe pour la version arabe) → « Publier ». La page est
revalidée automatiquement : l'article apparaît immédiatement sur le site, le
sélecteur de langue et les hreflang utilisent les slugs localisés.

**Ajouter une formation** : Formations → « Créer » → catégorie, résumé, durée,
modalités, objectifs, programme (modules), public, prérequis, SEO → versions
AR/FR/EN → « Publier ».

**Témoignages / Clients (logos) / Réglages du site** : collections dédiées ;
le global « Réglages » alimente footer, contact, JSON-LD et le bouton WhatsApp.

Brouillons : un contenu « brouillon » n'est **jamais** visible des visiteurs.

## 4. Déploiement (GitHub → Vercel → Neon → Blob)

### 4.1 Repo GitHub

```bash
gh repo create tachfir/website --private --source=. --push
# ou : créer le repo sur github.com puis
git remote add origin git@github.com:tachfir/website.git
git push -u origin main
```

La CI (`.github/workflows/ci.yml`) tourne sur chaque push/PR : lint,
typecheck, seed SQLite, build — sans aucun service externe.

### 4.2 Vercel

1. vercel.com → Add New → Project → importer le repo (framework Next.js
   détecté automatiquement).
2. L'intégration Git fait le reste : **preview** sur chaque PR, **production**
   sur `main`. Aucun step de déploiement dans GitHub Actions.

### 4.3 Base Postgres (Neon ou Vercel Postgres)

1. Créer une base (neon.tech → New Project, région eu-central recommandée).
2. Copier la chaîne **pooled** `postgres://…?sslmode=require` → variable
   `DATABASE_URI` (production).

### 4.4 Vercel Blob (médias)

Storage → Blob → Create store → copier `BLOB_READ_WRITE_TOKEN` → variable
d'environnement (production). Les uploads de l'admin partent alors sur Blob.

### 4.5 Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Development | Preview | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | URL de preview (facultatif) | `https://www.tachfir.com` |
| `PAYLOAD_SECRET` | secret local | secret dédié | **secret fort unique** |
| `DATABASE_URI` | `file:./tachfir.db` | Neon (branche dev) ou SQLite | Neon **pooled** |
| `PAYLOAD_ADMIN_EMAIL/PASSWORD` | local | — | pour le seed initial |
| `BLOB_READ_WRITE_TOKEN` | (vide = disque) | (vide) | token Blob |
| `RESEND_API_KEY` | (vide = console) | (vide) | clé Resend |
| `EMAIL_FROM` / `CONTACT_EMAIL` | défauts | — | domaine vérifié / boîte devis |
| `NEXT_PUBLIC_GA4_ID` | (vide) | (vide) | `G-…` |
| `GOOGLE_SITE_VERIFICATION` | (vide) | (vide) | jeton Search Console |

### 4.6 Base de données en production : schéma + seed

Depuis votre poste, en pointant la base de production :

```bash
# .env.production.local : DATABASE_URI=postgres://… (Neon) + PAYLOAD_SECRET prod
# 1) Créer et appliquer la migration initiale (recommandé)
DATABASE_URI="postgres://…" npm run payload -- migrate:create initial
DATABASE_URI="postgres://…" npm run payload -- migrate

# 2) Seed de production (admin + settings + contenus de lancement)
DATABASE_URI="postgres://…" PAYLOAD_SECRET="…" \
PAYLOAD_ADMIN_EMAIL="admin@tachfir.com" PAYLOAD_ADMIN_PASSWORD="…" \
npm run seed
```

> Alternative rapide (prototypage uniquement) : exécuter le seed avec la
> `DATABASE_URI` de prod crée aussi le schéma par push. Pour toute évolution
> ultérieure du schéma en production, utilisez **toujours** les migrations.

Ensuite : redéployer sur Vercel → `/admin` → se connecter → **changer le mot
de passe admin** → compléter les Réglages du site (TODO-CLIENT.md).

### 4.7 Domaine & indexation

Vercel → Domains → `www.tachfir.com` (+ redirection apex) · Search Console →
vérifier la propriété (`GOOGLE_SITE_VERIFICATION`) → soumettre
`https://www.tachfir.com/sitemap.xml`.

## 5. Workflow Git

- `main` = production (protégée). Travailler en branches `feat/*`, `fix/*`,
  `content/*` → Pull Request → CI verte → merge → déploiement auto.
- Messages de commit : **Conventional Commits**
  (`feat:`, `fix:`, `chore:`, `content:`, `ci:`).
- Version livrée : tag `v1.0.0`.

## 6. Notes de maintenance

- **Changement de schéma CMS** (collections/globals) : `npm run
  generate:types` (+ `generate:importmap` si composants admin), migration
  Postgres avant déploiement (cf. 4.6).
- **Nouvelle langue / nouvelle page** : ajouter la route dans
  `src/i18n/routing.ts` (pathnames 3 locales), les clés dans
  `messages/*.json` (garder la parité des clés) et l'entrée sitemap est
  automatique (routes statiques listées dans `src/app/sitemap.ts`).
- **RTL** : uniquement des propriétés logiques (`ms-`, `me-`, `ps-`, `pe-`,
  `text-start/end`) — la CI n'a pas de garde-fou automatique, la revue de PR
  doit y veiller.
- Documents de référence : `DECISIONS.md` (arbitrages techniques),
  `TODO-CLIENT.md` (données à fournir), `docs/PROMPT-CLAUDE-CODE-TACHFIR.md`
  (cahier des charges d'origine).
