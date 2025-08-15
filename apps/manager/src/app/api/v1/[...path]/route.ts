import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UPSTREAM_ORIGIN = process.env.UPSTREAM_ORIGIN ?? '';
const UPSTREAM_TIMEOUT_MS = (() => {
  const raw = process.env.UPSTREAM_TIMEOUT_MS;
  const n = raw === undefined ? Number.NaN : Number(raw);
  if (!Number.isFinite(n) || n <= 0) {
    return 30000;
  }
  return Math.floor(n);
})();
const SERVER_BEARER = process.env.SERVER_BEARER ?? '';

const CORS_ALLOW_ORIGIN = process.env.CORS_ALLOW_ORIGIN ?? '*';
const CORS_ALLOW_HEADERS = process.env.CORS_ALLOW_HEADERS ?? '*';
const CORS_ALLOW_METHODS = process.env.CORS_ALLOW_METHODS ?? 'GET,POST,PUT,PATCH,DELETE,OPTIONS';
const CORS_MAX_AGE = (() => {
  const raw = process.env.CORS_MAX_AGE;
  const n = raw === undefined ? Number.NaN : Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    return 600;
  }
  return Math.floor(n);
})();
const PROXY_STREAMING_ENABLED =
  (process.env.PROXY_STREAMING_ENABLED ?? 'false').toLowerCase() === 'true';

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
]);

function buildTarget(req: Request, path: string[]) {
  const u = new URL(req.url);
  const base = UPSTREAM_ORIGIN.replace(/\/+$/, '');
  const joined = path.map(encodeURIComponent).join('/');
  const search = u.search || '';
  return `${base}/${joined}${search}`;
}

function sanitizeRequestHeaders(req: Request) {
  const h = new Headers(req.headers);
  h.delete('origin');
  h.delete('referer');
  h.delete('host');
  h.delete('content-length');
  for (const k of HOP_BY_HOP) {
    h.delete(k);
  }
  const url = new URL(req.url);
  if (!h.has('x-forwarded-host')) {
    h.set('x-forwarded-host', url.host);
  }
  if (!h.has('x-forwarded-proto')) {
    h.set('x-forwarded-proto', url.protocol.replace(':', ''));
  }

  if (!h.has('authorization') && SERVER_BEARER) {
    h.set('authorization', `Bearer ${SERVER_BEARER}`);
    h.delete('cookie');
  }
  return h;
}

function passthroughResponseHeaders(up: Response) {
  const h = new Headers(up.headers);
  for (const k of HOP_BY_HOP) {
    h.delete(k);
  }
  return h;
}

function appendCorsHeaders(req: Request, headers: Headers) {
  const origin = req.headers.get('origin');
  const allowList = CORS_ALLOW_ORIGIN;
  let allowOriginValue = '';
  if (allowList === '*') {
    allowOriginValue = '*';
  } else if (origin) {
    const allowed = allowList
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (allowed.includes(origin)) {
      allowOriginValue = origin;
      headers.set('Vary', [headers.get('Vary') ?? '', 'Origin'].filter(Boolean).join(', '));
    }
  }
  if (allowOriginValue) {
    headers.set('Access-Control-Allow-Origin', allowOriginValue);
    headers.set('Access-Control-Allow-Methods', CORS_ALLOW_METHODS);
    headers.set('Access-Control-Allow-Headers', CORS_ALLOW_HEADERS);
    headers.set('Access-Control-Max-Age', String(CORS_MAX_AGE));
  }
  return headers;
}

function jsonWithCors<T>(req: Request, body: T, init?: ResponseInit) {
  const headers = appendCorsHeaders(req, new Headers(init?.headers));
  return NextResponse.json(body, { ...(init ?? {}), headers });
}

async function handle(req: Request, segments: string[]) {
  if (!UPSTREAM_ORIGIN) {
    return jsonWithCors(req, { error: 'config_missing_upstream_origin' }, { status: 502 });
  }
  if (segments.length === 0) {
    return jsonWithCors(req, { error: 'not_found' }, { status: 404 });
  }

  const target = buildTarget(req, segments);
  const method = req.method;

  let body: BodyInit | undefined;
  if (!['GET', 'HEAD'].includes(method)) {
    if (PROXY_STREAMING_ENABLED && req.body) {
      body = req.body as unknown as BodyInit;
    } else {
      body = await req.arrayBuffer();
    }
  }

  const headers = sanitizeRequestHeaders(req);
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), UPSTREAM_TIMEOUT_MS);

  let up: Response;
  try {
    const init: RequestInit = { method, headers, body, signal: ac.signal, cache: 'no-store' };
    if (
      PROXY_STREAMING_ENABLED &&
      body &&
      typeof body !== 'string' &&
      !(body instanceof ArrayBuffer)
    ) {
      (init as unknown as { duplex?: 'half' }).duplex = 'half';
    }
    up = await fetch(target, init);
  } catch (err) {
    clearTimeout(t);
    console.error('[proxy] upstream fetch failed', { target, error: (err as Error)?.message });
    return jsonWithCors(req, { error: 'upstream_unreachable' }, { status: 502 });
  }
  clearTimeout(t);

  const responseHeaders = appendCorsHeaders(req, passthroughResponseHeaders(up));
  return new Response(up.body, {
    status: up.status,
    headers: responseHeaders,
  });
}

export async function OPTIONS(req: Request) {
  const h = appendCorsHeaders(req, new Headers());
  return new NextResponse(null, { status: 204, headers: h });
}

type Ctx = { params: Promise<{ path?: string[] }> };

export async function GET(req: Request, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return handle(req, path);
}
export async function POST(req: Request, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return handle(req, path);
}
export async function PUT(req: Request, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return handle(req, path);
}
export async function PATCH(req: Request, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return handle(req, path);
}
export async function DELETE(req: Request, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return handle(req, path);
}
