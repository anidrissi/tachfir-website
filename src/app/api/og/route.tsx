import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

/**
 * Images Open Graph dynamiques par locale : titre AR/FR/EN sur fond de
 * marque (matrice de chiffrement + bloc chiffré Tachfir).
 * Usage : /api/og?locale=ar&title=…
 */

let fontCache: Buffer | null = null;
async function loadFont(): Promise<Buffer> {
  if (!fontCache) {
    fontCache = await readFile(
      path.join(process.cwd(), 'src/assets/fonts/IBMPlexSansArabic-Bold.ttf'),
    );
  }
  return fontCache;
}

/** Matrice de chiffrement : TACHFIR en binaire (identique au front). */
const BITS = Array.from('TACHFIR').flatMap((ch) =>
  ch.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number),
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? 'ar';
  const rawTitle = searchParams.get('title') ?? 'Tachfir';
  const title = rawTitle.length > 90 ? `${rawTitle.slice(0, 88)}…` : rawTitle;
  const isRtl = locale === 'ar';

  const font = await loadFont();

  const CELL = 22;
  const COLS = 14;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#071a2e',
          backgroundImage: 'linear-gradient(135deg, #0b2540 0%, #050f1c 100%)',
          padding: 64,
          fontFamily: 'PlexArabic',
          position: 'relative',
        }}
      >
        {/* Matrice de chiffrement décorative */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 48,
            display: 'flex',
            flexWrap: 'wrap',
            width: COLS * CELL,
            opacity: 0.5,
          }}
        >
          {BITS.map((bit, i) => (
            <div
              key={i}
              style={{
                width: CELL,
                height: CELL,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: bit ? 7 : 3,
                  height: bit ? 7 : 3,
                  borderRadius: 2,
                  backgroundColor: bit ? '#2fc4ad' : '#1d4a6d',
                }}
              />
            </div>
          ))}
        </div>

        {/* Logo : 3 carrés + losange */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: 64, height: 64 }}>
            <div style={{ display: 'flex', width: 64, justifyContent: 'space-between' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: '#f4f7fa' }} />
              <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: '#f4f7fa' }} />
            </div>
            <div
              style={{
                display: 'flex',
                width: 64,
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 7, backgroundColor: '#f4f7fa' }} />
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  backgroundColor: '#2fc4ad',
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: '#f4f7fa',
              letterSpacing: 2,
            }}
          >
            TACHFIR
          </div>
        </div>

        {/* Titre — RTL : un mot par item flex en row-reverse (satori
            n'implémente pas l'algorithme bidi ; la ligature intra-mot,
            elle, est correctement gérée par la police). */}
        <div
          style={{
            display: 'flex',
            justifyContent: isRtl ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          {isRtl ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                columnGap: 16,
                maxWidth: 1000,
                fontSize: title.length > 55 ? 48 : 58,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.3,
              }}
            >
              {title.split(/\s+/).map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </div>
          ) : (
            <div
              style={{
                fontSize: title.length > 55 ? 48 : 58,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.25,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
          )}
        </div>

        {/* Pied */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #163656',
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 26, color: '#9db4c8' }}>www.tachfir.com</div>
          <div style={{ fontSize: 26, color: '#2fc4ad', fontWeight: 700 }}>
            Building Trust through Secure Tech
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'PlexArabic', data: font, weight: 700, style: 'normal' }],
    },
  );
}
