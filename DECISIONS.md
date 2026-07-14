# DECISIONS.md — choix techniques et arbitrages

Journal des décisions prises pendant la construction, comme demandé dans le
cahier des charges. Chaque entrée : contexte → décision → conséquence.

## Framework & outillage

1. **Next.js 16.2.10 (et non 15.x)** — Payload 3.86 exige en peer dependency
   `>=15.4.11 <15.5.0 || >=16.2.6 <17` : la ligne 15.5 installée par
   create-next-app était exclue. Next 16 étant officiellement supporté et plus
   pérenne, le projet a été monté sur 16 (l'exigence « Next.js 15+ » reste
   satisfaite). Build Turbopack (défaut Next 16) validé avec Payload.
2. **`"type": "module"` dans package.json** — requis par la CLI Payload
   (`payload run`, `generate:*`) : ses dépendances utilisent le top-level
   await, incompatible avec le chargement CommonJS.
3. **`src/proxy.ts` plutôt que `middleware.ts`** — convention Next 16 (le
   middleware y est renommé proxy). Contient le middleware next-intl et les
   redirections 301 de l'ancien site.
4. **npm** (pas pnpm/yarn) — imposé par l'énoncé (`npm ci` en CI, `npm run seed`).

## Base de données & CMS

5. **Adapter par environnement** — `payload.config.ts` choisit l'adapter selon
   `DATABASE_URI` : SQLite (`file:`) en local/CI, Postgres (`postgres://`) en
   production. Les deux packages sont installés ; aucun code applicatif ne
   change entre environnements.
6. **Pas de migrations commitées ; push en dev/CI** — les fichiers de migration
   Payload sont spécifiques au dialecte (SQLite ≠ Postgres). Le schéma dev/CI
   est créé par le push automatique (seed exécuté avec NODE_ENV=development).
   Pour la production, le workflow `migrate:create`/`migrate` pointé sur Neon
   est documenté dans le README (§ Déploiement). À partir de la v1 en prod,
   toute évolution de schéma doit passer par une migration.
7. **Le seed exige un top-level await** — `payload run` appelle
   `process.exit(0)` dès la fin de l'évaluation du module ; un `main()` non
   attendu est tué en plein vol. Le script est écrit en top-level await.
8. **GraphQL Payload désactivé** — non utilisé (Local API côté front), surface
   d'attaque et temps de build réduits.
9. **Live preview Payload non intégré en v1** — l'intégration draft-mode par
   route ajoutait de la complexité hors périmètre. Les brouillons restent
   consultables via l'aperçu de l'admin. Ajout possible ultérieurement.
10. **Auteur d'article = champ texte** (défaut « Tachfir »), pas une relation
    vers `users` — évite d'exposer les comptes admin dans l'API publique.
11. **Le rôle `editor` peut modifier le global `settings`** (coordonnées,
    bandeaux : c'est du contenu opérationnel) mais pas les utilisateurs ; le
    champ `role` est protégé par un access field-level (pas d'auto-promotion —
    testé).
12. **Slugs arabes : slugify préservant les hamzas** — NFD → suppression du
    tashkil uniquement → NFC. (Le NFKD initial transformait الإدارات en
    الا-دارات ; corrigé et couvert par `src/seed/check-lengths.ts`.)

## i18n & SEO

13. **Pathnames arabes natifs** (ex. `/خدمات/الأمن-السيبراني`) — recommandation
    SEO du cahier des charges, validée fonctionnellement (routing, SSG avec
    slugs percent-encodés, hreflang). Fallback slugs latins non nécessaire.
14. **Redirections legacy → `/fr/...`** — l'ancien site étant francophone, les
    URLs latines sans préfixe (`/contact`, `/services`…) redirigent en 301
    vers la version française. À ajuster si les vraies URLs historiques
    diffèrent (voir TODO-CLIENT).
15. **Sitemap : une entrée par locale** avec `xhtml:link` alternates complets ;
    `/admin` et `/api` exclus de robots.txt et hors sitemap.
16. **Images OG dynamiques : mots arabes en `row-reverse`** — satori (next/og)
    n'implémente pas l'algorithme bidi : le texte AR sortait dans le mauvais
    ordre. Chaque mot est rendu comme item flex en `row-reverse` (la ligature
    intra-mot, elle, est correcte). Police unique embarquée : IBM Plex Sans
    Arabic Bold (couvre AR + latin).
17. **Polices : seul Inter est préchargé** — précharger les 4 familles (dont
    les jeux arabes, lourds) faisait chuter le score Lighthouse mobile
    (LCP/FCP). Space Grotesk, IBM Plex Sans Arabic et Cairo sont en
    `preload: false` + `display: swap`. Résultat mesuré : Perf 92 (FR) / 90
    (AR) en local.

## Formulaires & plateforme

18. **Rate-limit en mémoire** (5 req / 10 min / IP / route) — suffisant contre
    le spam basique. Sur Vercel, chaque instance serverless a sa propre
    mémoire : pour un durcissement réel, brancher Upstash/Redis ou Vercel WAF.
19. **Upload ≤ 10 Mo validé applicativement** (client + serveur) comme exigé.
    Attention : les fonctions serverless Vercel plafonnent le corps de requête
    autour de ~4,5 Mo — au-delà, l'envoi échouera en production hébergée chez
    Vercel. Les très gros BC/CPS passeront par email (mentionné à l'utilisateur
    par le message d'erreur générique). Alternatives futures : upload direct
    vers Vercel Blob puis lien dans l'email.
20. **Bouton WhatsApp masqué tant que le numéro n'est pas configuré** — la
    consigne « aucune donnée inventée » interdit un numéro factice ; un lien
    wa.me cassé serait pire que l'absence du bouton. Il apparaît dès que le
    numéro est renseigné (global settings ou company.ts).
21. **Emails : fallback console sans RESEND_API_KEY** — le développement local
    et la CI fonctionnent sans compte externe ; les soumissions sont
    journalisées dans la console serveur.

## Revalidation

22. **Chemins spécifiques + invalidation de gabarit** — les hooks Payload
    revalident les chemins localisés du document ET le gabarit
    (`/[locale]/blog/[slug]`, type 'page'). Nécessaire car le hook ne connaît
    que le slug de la locale de la requête : à la suppression, les pages FR/EN
    restaient sinon servies depuis le cache (bug reproduit puis corrigé,
    vérifié sur build de production).

## Divers

23. **Couvertures d'articles générées** (SVG de marque → WebP via sharp) avec
    `alt` trilingue — pas d'images stock, cohérence visuelle, poids ~8 Ko.
    `dangerouslyAllowSVG` activé dans next/image avec CSP sandbox pour les
    éventuels SVG uploadés.
24. **Logos clients en wordmarks texte** tant que les fichiers HD ne sont pas
    fournis — pas de recréation approximative de marques tierces.
