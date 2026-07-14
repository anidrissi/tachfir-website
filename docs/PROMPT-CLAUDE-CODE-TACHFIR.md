# PROMPT MAÎTRE — Refonte tachfir.com · Next.js trilingue (AR par défaut / FR / EN) · CMS intégré · Git & CI/CD · SEO Maroc

> **Mode d'emploi**
> 1. `mkdir tachfir-v2 && cd tachfir-v2`
> 2. Placez le logo dans le dossier (ex. `./assets/logo.svg`) — sinon Claude utilisera un placeholder
> 3. Lancez `claude` puis collez l'intégralité de ce prompt
> 4. Si vous connaissez déjà les valeurs de la **section 12**, remplacez-les avant de coller ; sinon laissez, tout sera listé dans `TODO-CLIENT.md`
> 5. Le build local fonctionne sans aucun compte externe (SQLite). Pour la mise en ligne, il vous faudra : GitHub + Vercel + une base Postgres (Neon ou Vercel Postgres) — le README généré vous guidera pas à pas.

---

## 1. Rôle et mission

Tu es un développeur senior Next.js doublé d'un expert SEO international (marchés arabophone et francophone). Ta mission : construire **de zéro** le nouveau site de **Tachfir** (`https://www.tachfir.com`), production-ready, trilingue **arabe (langue par défaut), français, anglais**, avec **CMS intégré** pour que l'équipe gère elle-même le blog, les formations et les contenus clés, le tout **versionné sous Git avec pipeline CI/CD**. Objectif business : générer des leads — devis, bons de commande, inscriptions formations, contacts nearshore depuis la France — et ranker sur Google Maroc en arabe et en français.

Règles de conduite :
- Prends les décisions techniques standards toi-même et consigne-les dans `DECISIONS.md`. Ne me pose une question que si c'est réellement bloquant.
- Aucune donnée inventée présentée comme réelle : tout chiffre, adresse ou témoignage non fourni utilise un placeholder `[EN_ATTENTE]` visible.
- Si une brique précise pose problème à l'installation (version, incompatibilité), choisis l'alternative standard la plus proche et consigne-la dans `DECISIONS.md` au lieu de bloquer.
- À la fin, génère `TODO-CLIENT.md` listant tout ce qui reste à fournir/remplacer.

## 2. Contexte entreprise (réel — à réutiliser tel quel)

- **Tachfir** — société marocaine de services IT (« Building Trust through Secure Tech »). ADN : la sécurité.
- **4 pôles d'activité** :
  1. **Développement** — web, mobile, UX/UI (stack : React, Spring Boot, AWS, Azure, Figma, méthodologie Scrum/SAFe)
  2. **Cybersécurité** — tests d'intrusion, audits de sécurité
  3. **Conseil IT & nearshore** — régie, AMOA, TMA pour clients marocains et français
  4. **Formation** — formations IT certifiantes (nouveau pôle à mettre en avant)
  - **+ Fourniture de matériel informatique** — vente **sur demande, sans catalogue en ligne** : l'entreprise répond aux bons de commande et demandes de prix des administrations publiques et sociétés marocaines.
- **Chiffres clés** : 20+ clients, 34+ projets, 30+ experts.
- **Références clients** (logos à récupérer/recréer) : Intelcia, Proxiad, Alten, SFR, Fuzyo.
- **Certifications des consultants** (liste réelle, page dédiée) : Professional Scrum Master (PSM), Certified SAFe® 5, Oracle Certified Professional Java, Oracle Certified Expert Java EE, CCNA Switching/Routing/Wireless, Cisco CyberOps Associate, CKAD (Kubernetes), HashiCorp Terraform Associate (003), Oracle Cloud Infrastructure Certified, OCI AI Certified, OCI Generative AI Certified.
- **Cibles** : DSI et acheteurs publics marocains (marchés publics, bons de commande), PME/entreprises marocaines, PME/ETI françaises (nearshore), professionnels et entreprises pour la formation.
- **Réseaux** : LinkedIn `https://www.linkedin.com/company/tachfir/`

## 3. Stack technique imposée

- **Next.js 15+ — App Router, TypeScript strict, React Server Components** par défaut
- **Tailwind CSS v4** — uniquement des propriétés logiques (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`) ; **jamais** `ml-`/`mr-`/`text-left` codés en dur (compatibilité RTL)
- **next-intl** pour l'i18n du front (routing + messages d'interface)
- **Payload CMS 3 intégré dans la même app Next.js** (admin sur `/admin`) pour les contenus éditables — spec complète en **§8**. Base de données : **SQLite en local/dev** (`@payloadcms/db-sqlite`), **Postgres (Neon ou Vercel Postgres) en production** via `DATABASE_URI`. Médias : disque local en dev, **Vercel Blob** en prod (`@payloadcms/storage-vercel-blob`).
- **next-themes** pour le toggle clair/sombre (le site actuel l'a, on le conserve)
- Formulaires : **React Hook Form + Zod**, API Routes, envoi email via **Resend** (fallback `console.log` en dev si clé absente)
- Images : `next/image` exclusivement, formats AVIF/WebP
- Déploiement cible : **Vercel** · Rendu : **SSG** (`generateStaticParams`) + **revalidation à la demande** déclenchée par les hooks Payload (`afterChange`/`afterDelete` → `revalidatePath`/`revalidateTag`)
- `metadataBase` : `https://www.tachfir.com`

## 4. Git & pipeline CI/CD

- **`git init` dès l'étape 1** : `.gitignore` complet (node_modules, `.next`, `.env*`, base SQLite locale, médias locaux) + **`.env.example` exhaustif et commenté** (chaque variable expliquée en une ligne).
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `content:`, `ci:`) — **au minimum un commit atomique à la fin de chaque étape du plan (§13)**, historique lisible. Tag `v1.0.0` à la livraison.
- Branche `main` = production. Workflow `feat/*` + Pull Request documenté dans le README.
- **GitHub Actions** — `.github/workflows/ci.yml` déclenché sur push et PR : `npm ci` (avec cache), lint, typecheck (`tsc --noEmit`), `npm run build`. Le workflow définit des env factices sûres (`PAYLOAD_SECRET` de test, `DATABASE_URI` SQLite locale) pour que le build passe **sans aucun service externe**.
- **Déploiement = intégration Git de Vercel** : previews automatiques sur chaque PR, production sur `main`. Pas de step de déploiement custom dans Actions.
- Le README final contient le guide pas à pas : créer le repo GitHub (`gh repo create` ou manuel) → push → connecter Vercel → créer la base Neon/Vercel Postgres → activer Vercel Blob → renseigner les variables d'env (tableau par environnement : dev / preview / production) → lancer le seed en production.

## 5. i18n & RTL — règles strictes

1. Locales : `ar` (défaut), `fr`, `en`. `localePrefix: 'as-needed'` → racine `/` = arabe, `/fr/...`, `/en/...`.
2. `<html lang dir>` dynamiques : `dir="rtl"` pour l'arabe, `ltr` sinon. Tester visuellement chaque page en RTL **et** dans les deux thèmes clair/sombre.
3. **Pathnames localisés** via `pathnames` de next-intl : FR/EN en latin (`/fr/services/developpement`, `/en/services/development`), **AR en écriture arabe** (recommandé SEO, ex. `/خدمات/تطوير-المواقع`). Si contrainte technique réelle, fallback : slugs FR partagés pour l'arabe — documente le choix dans `DECISIONS.md`.
4. **Zéro texte codé en dur** : interface via `messages/{ar,fr,en}.json`, contenus éditoriaux via le CMS (champs localisés). Nombres, dates : formatés par locale.
5. Polices via `next/font/google`, `display: swap` :
   - Arabe : **IBM Plex Sans Arabic** (corps) + **Cairo** (titres) — ou propose mieux si justifié
   - Latin : **Inter** (corps) + une display de caractère cohérente avec la marque tech/sécurité (ex. Space Grotesk)
   - Vérifie l'harmonie AR/latin (hauteurs, graisses) quand les deux cohabitent (chiffres, noms de technologies).
6. Sélecteur de langue dans le header : conserve la page courante lors du changement (mapping via pathnames **et via les slugs localisés du CMS** pour les articles/formations), avec attributs `hreflang` sur les liens.
7. Arabe = **arabe standard moderne professionnel** (fusha), pas de traduction mot à mot depuis le français. Terminologie marocaine officielle : المعلوميات (informatique), سند الطلب (bon de commande), عرض أثمان (devis/offre de prix), الصفقات العمومية (marchés publics), طلب عروض (appel d'offres).

## 6. Arborescence complète (× 3 locales)

| Route (FR) | Contenu clé |
|---|---|
| `/` Accueil | Hero (proposition de valeur sécurité + 4 pôles), bandeau logos clients (CMS), chiffres clés, aperçu services, bandeau certifications, 2-3 témoignages (CMS), aperçu formations (CMS), bloc fourniture IT avec CTA bon de commande, derniers articles (CMS), CTA final |
| `/services` | Hub des 4 pôles + fourniture |
| `/services/developpement-web-mobile` | Web, mobile, UX/UI ; stack ; méthodologie ; cas d'usage ; FAQ |
| `/services/cybersecurite` | Pentest, audit ; démarche ; livrables ; FAQ |
| `/services/conseil-it-nearshore` | Régie, AMOA, TMA ; argumentaire nearshore pour clients français (fuseau, francophonie, coûts) ; FAQ |
| `/services/fourniture-informatique` | **Page SANS catalogue** — voir spec dédiée §9 |
| `/formations` | Catalogue **piloté par le CMS**, filtrable par catégorie (Développement, Cloud, DevOps, Cybersécurité, Agile, Bureautique) |
| `/formations/[slug]` | Fiche CMS : objectifs, programme, durée, public, prérequis, modalités (présentiel/distanciel/intra), CTA « Demander un devis formation » |
| `/references` | Logos clients (CMS), chiffres clés, témoignages (CMS), secteurs servis |
| `/certifications` | Les 11 certifications réelles (grille avec badges), argumentaire confiance |
| `/blog` + `/blog/[slug]` | Articles **gérés via le CMS** (collection `posts`) |
| `/devis` | Formulaire devis & bon de commande (spec §10) |
| `/contact` | Formulaire simple + NAP + carte `[EN_ATTENTE]` + WhatsApp |
| `/a-propos` | Histoire, mission sécurité, équipe/experts, valeurs |
| `/mentions-legales`, `/politique-confidentialite` | Conformité **Loi 09-08 (CNDP)** |
| `/admin` | Interface d'administration Payload — `noindex`, hors sitemap, `Disallow` dans robots (ainsi que `/api`) |
| 404 localisée | Message + liens utiles par locale |

Navigation : `Accueil · Services ▾ · Formations · Références · Blog · Contact` + bouton CTA permanent **« Devis / Bon de commande »** + sélecteur langue + toggle thème. Fil d'Ariane visible sur toutes les pages internes (+ schema BreadcrumbList). Footer riche : NAP complet (depuis le global `settings` du CMS), liens par pôle, certifications (mini), LinkedIn, mentions légales.

Redirections 301 depuis l'ancien site : `/contact` → `/{locale}/contact` (middleware).

## 7. Stratégie SEO — exigences non négociables

### 7.1 Mots-clés cibles par page (à intégrer dans H1, title, meta, contenu — naturellement, sans bourrage)

| Page | AR (principal) | FR (principal) | EN (principal) |
|---|---|---|---|
| Accueil | شركة معلوميات بالمغرب | société de services informatiques au Maroc (ESN) | IT services company in Morocco |
| Dév. | تطوير المواقع والتطبيقات بالمغرب | développement web et mobile Maroc | software development Morocco |
| Cybersécurité | الأمن السيبراني بالمغرب | cybersécurité et test d'intrusion Maroc | cybersecurity & pentesting Morocco |
| Conseil | استشارات معلوماتية للشركات بالمغرب | conseil IT et nearshore Maroc | nearshore IT consulting Morocco |
| Formations | تكوين في المعلوميات بالمغرب | formation informatique certifiante au Maroc | certified IT training Morocco |
| Fourniture | توريد العتاد والمعدات المعلوماتية بالمغرب | fourniture de matériel informatique au Maroc | IT hardware supply Morocco |

Secondaires à disséminer (pages, FAQ, blog) — AR : سند طلب معدات معلوماتية، شركة تطوير مواقع، دورات تكوينية في البرمجة، الصفقات العمومية المعلوماتية، شركة أمن سيبراني · FR : bon de commande informatique, fournisseur matériel informatique administrations publiques, appel d'offres informatique Maroc, création site web `[VILLE]`, centre de formation IT, externalisation informatique France-Maroc · EN : IT outsourcing Morocco, offshore development Morocco.

### 7.2 Technique
- `generateMetadata` par page et par locale : title ≤ 60 car. (pattern `%s | Tachfir`), description ≤ 155 car. **rédigée pour le clic** (pas générique), canonical, `alternates.languages` complets (`ar`, `fr`, `en`, `x-default` → `ar`). Pour les articles et formations, title/description proviennent des **champs SEO localisés du CMS** ; les alternates hreflang sont générés à partir des slugs localisés du même document.
- **JSON-LD** (composant réutilisable, validé) : `Organization` + `ProfessionalService` (NAP, `areaServed: MA/FR`, logo, sameAs LinkedIn) globaux · `Service` sur chaque page service · `Course` (+ `hasCourseInstance`, `provider`) sur chaque formation · `Article` sur le blog · `FAQPage` sur chaque bloc FAQ · `BreadcrumbList` partout.
- `sitemap.ts` multilingue avec alternates hreflang, **alimenté dynamiquement par le CMS** (posts + formations publiés) · `robots.ts` (Disallow `/admin`, `/api`) · OG images dynamiques par locale via `next/og` (titre AR/FR/EN sur fond de marque).
- Un seul H1 par page, hiérarchie Hn logique, `alt` localisés sur toutes les images (champ obligatoire dans la collection `media`).
- Maillage interne : chaque page service pointe vers devis + formation liée + 1 article de blog lié ; chaque article pointe vers 1 service + `/devis`.
- Performance : LCP < 2,5 s mobile, cible Lighthouse ≥ 90 (perf) et 100 (SEO). Pas de librairie lourde côté client sans justification.
- Env prévues : `NEXT_PUBLIC_GA4_ID`, `GOOGLE_SITE_VERIFICATION` (meta), `NEXT_PUBLIC_SITE_URL`.

## 8. CMS — Payload 3 : collections & gouvernance des contenus

Pourquoi Payload : intégré au même repo et au même déploiement Vercel (zéro serveur supplémentaire), open source, localisation des champs native, admin traduite.

- Config : `localization: { locales: ['ar', 'fr', 'en'], defaultLocale: 'ar', fallback: true }`.
- **Collections** (tous les champs textuels marqués `localized: true`) :
  - `posts` : titre, **slug localisé**, extrait, contenu riche (éditeur Lexical), image de couverture, catégorie, champs SEO (title/description par locale), statut brouillon/publié, date de publication, auteur.
  - `formations` : titre, slug localisé, catégorie (Développement / Cloud / DevOps / Cybersécurité / Agile / Bureautique), objectifs, programme (blocs/sections), durée, public visé, prérequis, modalités, champs SEO, statut.
  - `testimonials` : auteur, fonction, société, citation (localisée), visible (bool), ordre.
  - `clients` : nom, logo clair + logo sombre, URL, ordre.
  - `media` : uploads avec champ **`alt` localisé obligatoire**.
  - **Global `settings`** : adresse, téléphone, WhatsApp, email, LinkedIn, textes de bandeaux (ex. « Réponse sous 24-48 h ») — consommé par le footer, la page contact et le JSON-LD.
- **Admin** : interface en **français par défaut** (i18n Payload, activer aussi ar/en). Rôles : `admin` (tout) / `editor` (contenus uniquement — pas d'accès aux utilisateurs ni aux settings destructifs). Utilisateur admin initial créé par le seed depuis `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD` (mot de passe à changer à la première connexion — le rappeler dans `TODO-CLIENT.md`).
- **Front** : lecture via la **Local API de Payload dans les Server Components** (pas de fetch REST interne). `generateStaticParams` sur les slugs publiés + hooks `afterChange`/`afterDelete` → revalidation ciblée. Access control : les brouillons ne sont **jamais** servis aux visiteurs anonymes. Live preview Payload pour `posts` et `formations` si l'intégration reste simple, sinon le noter dans `DECISIONS.md`.
- **Script `npm run seed` idempotent** : injecte les 9 articles, les 6 formations, 3 témoignages `[EN_ATTENTE]`, les 5 clients et les settings placeholders (§12).

## 9. Contenus à générer (3 langues — professionnels et vendeurs)

Ton : expert, rassurant, orienté résultats et conformité — crédible face à un DSI, un acheteur public marocain et un décideur français. Chaque locale est **rédigée nativement** (pas traduite littéralement) avec le même sens.

- **Accueil** : hero percutant reliant sécurité + 4 pôles ; bénéfices concrets, pas de blabla.
- **Pages services** : problème → approche → livrables → pourquoi Tachfir (certifications, références) → FAQ (5-6 questions, schema FAQPage) → CTA.
- **Page Fourniture informatique (spéciale, sans catalogue)** :
  - Message central : « Pas de catalogue en ligne : chaque demande est traitée sur mesure. Envoyez votre besoin ou votre bon de commande, recevez un عرض أثمان / devis sous 24-48 h. »
  - Familles couvertes (texte, pas de fiches produit) : postes de travail & portables, serveurs & stockage, réseau & sécurité, impression & scan, licences logicielles, consommables & accessoires.
  - Bloc réassurance secteur public : réponse aux **bons de commande et appels d'offres**, facturation conforme (ICE, RC), délais de livraison engagés, garantie constructeur, SAV, livraison `[ZONES — ex. tout le Maroc]`.
  - Timeline du processus : Demande → Devis 24-48 h → Validation/BC → Livraison & installation → Facturation.
  - CTA double : « Envoyer votre bon de commande » (formulaire avec upload) + bouton WhatsApp.
- **Formations — 6 fiches complètes seedées dans le CMS**, alignées sur les certifications réelles de l'équipe : ① Développement web full-stack React/Spring Boot ② Cybersécurité opérationnelle (esprit CyberOps) ③ Cloud AWS/Azure/OCI ④ DevOps Kubernetes & Terraform ⑤ Gestion de projet Agile Scrum/SAFe ⑥ Bureautique & digitalisation (cible administrations). Mention `[À VALIDER]` dans `TODO-CLIENT.md`.
- **Blog — 3 articles de lancement × 3 langues, seedés dans le CMS en statut publié** (800-1200 mots, SEO on-page complet) : ① « Marchés publics : réussir votre commande de matériel informatique au Maroc » / سند الطلب للمعدات المعلوماتية: دليل الإدارات المغربية ② « Nearshore au Maroc : pourquoi les entreprises françaises externalisent leur développement » ③ « Les certifications IT les plus demandées au Maroc » / أهم الشهادات المعلوماتية المطلوبة في المغرب.
- **Témoignages** : 3 placeholders réalistes seedés, clairement marqués `[EN_ATTENTE — à remplacer par de vrais témoignages]`.

## 10. Formulaires & conversion

- **/devis (formulaire principal)** : type de demande (Développement / Cybersécurité / Conseil / Formation / **Fourniture matériel**) · raison sociale · secteur (public / privé) · ICE (optionnel) · nom & fonction · email · téléphone · description du besoin · budget estimatif (fourchettes) · délai souhaité · **upload fichier** (BC, CPS, cahier des charges — PDF/images, ≤ 10 Mo, joint à l'email) · case consentement **Loi 09-08**.
- **/contact** : nom, email, téléphone, message, consentement.
- Backend : API Routes + validation Zod côté serveur, honeypot + rate-limit simple, envoi via Resend (`RESEND_API_KEY`, `CONTACT_EMAIL`) avec pièce jointe, messages de succès/erreur localisés, états de chargement.
- **Bouton WhatsApp flottant** sur tout le site : `https://wa.me/[NUMERO_WHATSAPP]` avec message pré-rempli localisé (« Bonjour Tachfir, je souhaite un devis pour… » / نص عربي مكافئ).
- Bandeau de réassurance près de chaque CTA : « Réponse sous 24-48 h » (texte éditable via le global `settings`).

## 11. Design

- Logo : utiliser le fichier fourni dans `./assets/` (le copier dans `/public/brand/`). S'il est absent, wordmark temporaire « Tachfir » + note dans `TODO-CLIENT.md`.
- **Avant de coder l'UI**, produis un mini design system et présente-le en 5 lignes (puis applique-le sans attendre) : palette 4-6 couleurs hex nommées dérivées du logo `[si absent : univers confiance/sécurité — bleus profonds/teal + 1 accent chaud, éviter les palettes IA génériques crème/terracotta ou noir/vert acide]` · paire typographique AR + latin · concept de layout · **1 élément signature** mémorable lié à l'identité (ex. motif géométrique inspiré du chiffrement — « tachfir » = تشفير — utilisé avec parcimonie).
- Sobriété corporate premium : beaucoup de blanc, hiérarchie typographique forte, une seule prise de risque visuelle (l'élément signature). Pas de décoration gratuite, pas d'animations dispersées — au plus une révélation au scroll discrète et des micro-interactions au survol. `prefers-reduced-motion` respecté.
- Design **RTL-first** : composer d'abord en arabe, vérifier ensuite LTR.
- Responsive irréprochable (mobile prioritaire — trafic majoritaire au Maroc), focus clavier visibles, contrastes AA.

## 12. Données à fournir (placeholders centralisés dans `src/config/company.ts` + global `settings` du CMS)

| Clé | Valeur |
|---|---|
| `[VILLE]` / `[ADRESSE_COMPLETE]` | ex. Marrakech — à confirmer |
| `[TELEPHONE]` / `[NUMERO_WHATSAPP]` | format international +212… |
| `[EMAIL_CONTACT]` | ex. contact@tachfir.com |
| `[ICE]` / `[RC]` | identifiants légaux |
| `[ZONES_LIVRAISON]` | ex. tout le Maroc |
| `[REPO_GITHUB]` | ex. github.com/tachfir/website |
| `DATABASE_URI` | Postgres Neon ou Vercel Postgres (prod) — SQLite en dev |
| `PAYLOAD_SECRET` | secret aléatoire fort (généré) |
| `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD` | compte admin initial — mot de passe à changer |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (médias en prod) |
| `RESEND_API_KEY` / `CONTACT_EMAIL` | envoi des emails de formulaires |
| `[GA4_ID]` / `[GOOGLE_SITE_VERIFICATION]` | analytics & Search Console |
| Logos clients HD + vrais témoignages + photos équipe | à remplacer |

## 13. Plan d'exécution (chaque étape se termine par `npm run build` sans erreur **puis un commit**)

1. **Scaffold + Git + CI** : create-next-app (TS, Tailwind v4, ESLint), `git init` + premier commit, `.gitignore`, `.env.example`, next-intl, fonts, `company.ts`, layout racine (lang/dir dynamiques, thème), `.github/workflows/ci.yml`.
2. **Design system & shell** : tokens, header (nav + langues + thème + CTA), footer, breadcrumb, boutons, cards, WhatsApp flottant.
3. **CMS Payload** : installation intégrée, `localization` ar/fr/en, collections + global `settings`, rôles & access control, admin en français, adapters DB/médias par environnement, squelette du script de seed.
4. **Pages statiques + contenus d'interface** : toutes les routes §6, messages complets AR/FR/EN.
5. **Blog & formations côté front** : listings et fiches branchés sur le CMS (Local API), filtres, JSON-LD Course/Article, hooks de revalidation, slugs localisés dans le sélecteur de langue.
6. **Formulaires & API** : devis (avec upload), contact, emails, états localisés.
7. **SEO technique** : metadata + hreflang, JSON-LD globaux, sitemap dynamique, robots, OG dynamiques, redirections.
8. **Seed complet des contenus** : 9 articles, 6 formations, témoignages, clients, settings — puis vérification du rendu réel des pages.
9. **QA finale & rapport** : checklist §14, `DECISIONS.md`, `TODO-CLIENT.md`, `README.md` (installation, guide GitHub → Vercel → Neon → Blob → env → seed, ajout d'un article/formation via l'admin), tag `v1.0.0`.

## 14. Checklist de validation finale (exécuter et rapporter le résultat point par point)

- [ ] `npm run build` et lint sans erreur ni warning TS ; les commandes du pipeline CI (lint, typecheck, build) passent localement avec les env de `.env.example`
- [ ] Historique Git propre : ≥ 1 commit par étape, messages Conventional Commits, tag `v1.0.0`
- [ ] Les 3 locales se rendent ; RTL visuellement correct (header, cards, formulaires, breadcrumb, admin non concerné) en clair **et** sombre
- [ ] Aucun texte hors fichiers de traduction/CMS ; aucun `ml-/mr-/text-left` résiduel
- [ ] `/admin` accessible : connexion admin seedée OK, création d'un article de test en 3 langues → visible sur le site après revalidation, puis suppression du test
- [ ] Rôle `editor` : ne peut modifier ni les utilisateurs ni la configuration ; brouillons invisibles côté public
- [ ] Canonical + hreflang (ar/fr/en/x-default) présents sur 100 % des pages, y compris articles et formations (slugs localisés)
- [ ] JSON-LD valide sur : accueil, 1 service, 1 formation, 1 article, FAQ
- [ ] Sitemap dynamique et robots cohérents ; `/admin` et `/api` exclus et bloqués
- [ ] Formulaires : soumission OK, erreurs localisées, honeypot actif, upload ≤ 10 Mo
- [ ] Lighthouse mobile : Perf ≥ 90, SEO = 100, Accessibilité ≥ 95
- [ ] 404 localisée fonctionnelle ; sélecteur de langue conserve la page (y compris sur un article)
- [ ] `TODO-CLIENT.md` exhaustif

---

**Commence maintenant par l'étape 1 et avance jusqu'au bout sans t'arrêter, sauf blocage réel.**
