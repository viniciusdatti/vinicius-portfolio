/**
 * Chat smoke tests (API + Socket.IO + Playwright).
 * Requires: backend :8000, Vite :5173
 *
 * Optional env:
 *   ADMIN_TEST_EMAIL, ADMIN_TEST_PASSWORD (default local seed admin)
 */
import { chromium } from 'playwright';
import { io } from 'socket.io-client';

const WEB = process.env.WEB_URL ?? 'http://localhost:5173';
const SOCKET_BASE = process.env.SOCKET_URL ?? 'http://127.0.0.1:8000';
const API = process.env.VITE_API_URL ?? 'http://localhost:8000/api/v1';
const ADMIN_EMAIL =
  process.env.ADMIN_TEST_EMAIL ?? 'admin@viniciusdatti.com';
const ADMIN_PASSWORD = process.env.ADMIN_TEST_PASSWORD ?? 'admin123';

const results = [];

const assert = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const adminLogin = async () => {
  const res = await fetch(`${API}/auth/login/json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data.access_token ?? null;
};

const visitorSocketFlow = async () => {
  const result = await new Promise((resolve, reject) => {
    const socket = io(`${SOCKET_BASE}/chat`, {
      transports: ['websocket'],
      timeout: 10000,
    });
    const timer = setTimeout(() => {
      socket.disconnect();
      reject(new Error('visitor socket timeout'));
    }, 15000);

    let sessionId = '';
    let lastMessagePayload = null;

    socket.on('connect', () => {
      socket.emit('start_session', {
        visitor_name: 'Smoke Test',
        visitor_company: 'QA',
      });
    });
    socket.on('session_started', (data) => {
      sessionId = data.session_id;
      socket.emit('send_message', {
        session_id: sessionId,
        content: 'smoke-message-1',
      });
    });
    socket.on('message', (data) => {
      lastMessagePayload = data;
      clearTimeout(timer);
      socket.disconnect();
      resolve({ sessionId, lastMessagePayload });
    });
    socket.on('connect_error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });

  assert(
    'visitor message payload has unread_count',
    typeof result.lastMessagePayload?.unread_count === 'number',
    JSON.stringify(result.lastMessagePayload ?? {})
  );

  const histRes = await fetch(
    `${API}/chat/sessions/${result.sessionId}/visitor-messages`
  );
  const hist = await histRes.json();
  assert(
    'visitor REST history',
    histRes.ok && hist.length >= 1,
    `status=${histRes.status} count=${hist.length}`
  );
  return result.sessionId;
};

const adminSocketReceivesUnread = async (token, sessionId) => {
  const payload = await new Promise((resolve, reject) => {
    const socket = io(`${SOCKET_BASE}/admin-chat`, {
      transports: ['websocket'],
      auth: { token },
      timeout: 10000,
    });
    const timer = setTimeout(() => {
      socket.disconnect();
      reject(new Error('admin socket timeout'));
    }, 20000);

    socket.on('connect', () => {
      socket.emit('join_session', { session_id: sessionId });
      const visitor = io(`${SOCKET_BASE}/chat`, { transports: ['websocket'] });
      visitor.on('connect', () => {
        visitor.emit('send_message', {
          session_id: sessionId,
          content: 'admin-smoke-msg',
        });
      });
      setTimeout(() => visitor.disconnect(), 3000);
    });

    socket.on('new_message', (data) => {
      clearTimeout(timer);
      socket.disconnect();
      resolve(data);
    });
    socket.on('connect_error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });

  assert(
    'admin new_message unread_count from server',
    typeof payload.unread_count === 'number' && payload.unread_count >= 1,
    JSON.stringify(payload)
  );
};

const visitorBrowserFlow = async (page) => {
  await page.goto(`${WEB}/live-lab`, { waitUntil: 'networkidle' });
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('input').first().fill('Browser Visitor');
  await page.getByRole('button', { name: /iniciar|start/i }).click();
  await wait(2000);
  const input = page.getByPlaceholder(/digite|type|mensagem|message/i).first();
  await input.fill('browser-msg-1');
  await page.getByRole('button', { name: /enviar|send/i }).click();
  await wait(2000);
  assert(
    'visitor UI message',
    (await page.locator('text=browser-msg-1').count()) >= 1
  );
  await page.reload({ waitUntil: 'networkidle' });
  await wait(3000);
  assert(
    'visitor refresh restores history',
    (await page.locator('text=browser-msg-1').count()) >= 1
  );
};

const adminDashboardRealtimeFlow = async (page, token) => {
  await page.goto(`${WEB}/admin/login`, { waitUntil: 'networkidle' });
  await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: /entrar|login|sign in/i }).click();
  await page.waitForURL(/\/admin\/?$/, { timeout: 15000 });

  await wait(3000);

  const visitor = io(`${SOCKET_BASE}/chat`, { transports: ['websocket'] });
  await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('visitor notify timeout')), 15000);
    visitor.on('connect', () => {
      visitor.emit('start_session', {
        visitor_name: 'Dashboard Smoke',
        visitor_company: 'QA',
      });
    });
    visitor.on('session_started', (data) => {
      visitor.emit('send_message', {
        session_id: data.session_id,
        content: 'dash-realtime-msg',
      });
      setTimeout(() => {
        clearTimeout(t);
        visitor.disconnect();
        resolve();
      }, 2000);
    });
  });

  await wait(2500);

  const unreadText = await page
    .locator('text=Não lidas (chat)')
    .locator('..')
    .locator('..')
    .textContent()
    .catch(() => '');

  const hasUnreadOnDashboard =
    unreadText.includes('1') ||
    unreadText.includes('2') ||
    unreadText.includes('3');

  assert(
    'admin dashboard shows unread from realtime store',
    hasUnreadOnDashboard,
    unreadText?.slice(0, 80) ?? 'no text'
  );

  await page.goto(`${WEB}/admin/chat`, { waitUntil: 'networkidle' });
  await wait(2000);
  assert(
    'admin chat page lists visitor session',
    (await page.locator('text=Dashboard Smoke').count()) >= 1
  );

  void token;
};

const run = async () => {
  const health = await fetch(`${SOCKET_BASE}/health`);
  assert('API health', health.ok, String(health.status));

  let sessionId = '';
  try {
    sessionId = await visitorSocketFlow();
    assert('visitor socket session', Boolean(sessionId), sessionId);
  } catch (e) {
    assert('visitor socket session', false, String(e));
  }

  const adminToken = await adminLogin();
  if (adminToken) {
    assert('admin REST login', true, ADMIN_EMAIL);
    try {
      await adminSocketReceivesUnread(adminToken, sessionId);
    } catch (e) {
      assert('admin socket unread flow', false, String(e));
    }
  } else {
    console.log(
      '⚠ Admin tests skipped — login failed. Seed admin or set ADMIN_TEST_EMAIL / ADMIN_TEST_PASSWORD.'
    );
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  try {
    await visitorBrowserFlow(page);
  } catch (e) {
    assert('visitor browser flow', false, String(e));
  }

  if (adminToken) {
    try {
      await adminDashboardRealtimeFlow(page, adminToken);
    } catch (e) {
      assert('admin dashboard realtime flow', false, String(e));
    }
  }

  await browser.close();

  if (errors.length) {
    console.log('Browser console errors:', [...new Set(errors)].slice(0, 8));
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.log('\nFailed:', failed.map((f) => f.name).join(', '));
    process.exit(1);
  }
  console.log('\nAll chat smoke checks passed.');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
