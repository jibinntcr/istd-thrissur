import { NextResponse } from 'next/server';
import { getAllStaticRoutes, SITE_URL } from '@/lib/seoConfig';

export const INDEXNOW_KEY = '70ed28b98524be0b9596c7681f4ef5d7';

export async function POST() {
  try {
    const routes = getAllStaticRoutes();
    const urlList = routes.map((route) =>
      route === '/' ? SITE_URL : `${SITE_URL}${route}`
    );

    const payload = {
      host: 'istdtrichur.in',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ];

    const results = await Promise.allSettled(
      endpoints.map(async (endpoint) => {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        });
        return { endpoint, status: res.status };
      })
    );

    return NextResponse.json({
      ok: true,
      submittedUrls: urlList.length,
      urlList,
      results,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}

