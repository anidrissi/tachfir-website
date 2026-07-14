# TODO-CLIENT.md — à fournir / remplacer avant la mise en ligne

Tout ce qui reste à compléter côté Tachfir. Les placeholders sont visibles
sur le site sous la forme `[EN_ATTENTE — …]` et disparaissent dès que la
vraie valeur est renseignée.

## 1. Données entreprise (obligatoire)

À renseigner **dans l'admin → Réglages du site** (prioritaire, prend le pas
sur le code) et/ou dans `src/config/company.ts` (valeurs de repli) :

| Donnée | Où | Effet |
|---|---|---|
| Adresse complète + ville | Admin > Réglages (par langue AR/FR/EN) | Footer, contact, mentions légales, JSON-LD |
| Téléphone (+212…) | Admin > Réglages | Footer, contact, JSON-LD |
| **Numéro WhatsApp** (+212…, sans espaces) | Admin > Réglages | **Active le bouton flottant WhatsApp** (masqué tant que vide) |
| Email de contact | Admin > Réglages | Footer, contact, mentions légales |
| ICE et RC | Admin > Réglages | Footer, mentions légales, réassurance fourniture |
| Zones de livraison (par langue) | Admin > Réglages | Page fourniture (bloc secteur public) |
| Bandeau réassurance (par langue) | Admin > Réglages | Près des CTA (« Réponse sous 24-48 h ») |

## 2. Identité visuelle

- [ ] **Logo officiel** : remplacer le wordmark temporaire —
      `public/brand/logo.svg` (fichier) et `src/components/brand/logo.tsx`
      (composant header/footer). Adapter le favicon `src/app/icon.svg` si besoin.
- [ ] **Logos clients HD** (Intelcia, Proxiad, Alten, SFR, Fuzyo) : versions
      thème clair + thème sombre, à uploader dans Admin > Clients (logos).
      Vérifier l'autorisation d'usage de chaque marque.
- [ ] Photos et bios de l'équipe (page À propos — note `[EN_ATTENTE]`).

## 3. Contenus

- [ ] **Témoignages réels** : remplacer les 3 placeholders
      `[EN_ATTENTE]` dans Admin > Témoignages (auteur, fonction, société,
      citation AR/FR/EN).
- [ ] **Formations `[À VALIDER]`** : durées, programmes et modalités des 6
      fiches seedées sont des propositions réalistes à valider/ajuster par
      l'équipe pédagogique (Admin > Formations).
- [ ] **Articles de blog** : relecture éditoriale des 3 articles de lancement.
      En particulier, vérifier les références réglementaires (décret marchés
      publics n° 2-22-431 et seuils en vigueur) avant toute campagne.
- [ ] Nom du **directeur de la publication** (mentions légales).
- [ ] **Numéro de récépissé CNDP** (politique de confidentialité) + effectuer
      la déclaration des traitements « formulaires » auprès de la CNDP.
- [ ] Carte à intégrer page Contact une fois l'adresse confirmée
      (embed OpenStreetMap/Google Maps).
- [ ] Ancien site : confirmer la liste des URLs historiques pour compléter les
      redirections 301 (`src/proxy.ts`, table `LEGACY_REDIRECTS`).

## 4. Comptes & services externes (mise en production)

- [ ] **GitHub** : créer le repo et pousser (`[REPO_GITHUB]`, guide README §Déploiement).
- [ ] **Vercel** : importer le repo (previews PR + prod sur main).
- [ ] **Base Postgres** : créer une base Neon (ou Vercel Postgres) →
      `DATABASE_URI` (prod).
- [ ] **`PAYLOAD_SECRET`** : générer un secret fort unique
      (`openssl rand -hex 32`) — jamais celui du dev.
- [ ] **Vercel Blob** : créer un store → `BLOB_READ_WRITE_TOKEN` (médias prod).
- [ ] **Resend** : créer le compte, **vérifier le domaine d'envoi** →
      `RESEND_API_KEY`, `EMAIL_FROM` (ex. `Tachfir <devis@tachfir.com>`),
      `CONTACT_EMAIL` (boîte qui reçoit les demandes).
- [ ] **Admin initial** : `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD`
      pour le seed — **changer le mot de passe à la première connexion**
      (Admin > Utilisateurs), puis créer les comptes `editor` de l'équipe.
- [ ] **Google Analytics 4** : créer la propriété → `NEXT_PUBLIC_GA4_ID`.
- [ ] **Google Search Console** : `GOOGLE_SITE_VERIFICATION` (balise) puis
      soumettre `https://www.tachfir.com/sitemap.xml`.
- [ ] **DNS** : pointer `www.tachfir.com` (et l'apex) vers Vercel.

## 5. Points d'attention connus

- **Upload > ~4,5 Mo en production Vercel** : la limite plateforme des
  fonctions serverless est inférieure aux 10 Mo applicatifs — les très gros
  bons de commande devront transiter par email (voir DECISIONS.md n° 19).
- **Rate-limit** : en mémoire par instance ; pour un durcissement anti-spam
  sérieux, prévoir Upstash/Redis ou Vercel WAF (DECISIONS.md n° 18).
- **Évolutions de schéma CMS en production** : passer par les migrations
  Payload (README § Base de données en production).
