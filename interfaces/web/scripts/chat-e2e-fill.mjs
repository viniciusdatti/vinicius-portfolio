/**
 * E2E fill demo — opens browser, fills login + Live Lab + admin chat.
 * Usage: node scripts/chat-e2e-fill.mjs
 * Env: HEADLESS=false to see the browser window.
 */
import { chromium } from 'playwright';

const WEB = process.env.WEB_URL ?? 'http://localhost:5173';
const HEADLESS = process.env.HEADLESS !== 'false';
const ADMIN_EMAIL = process.env.ADMIN_TEST_EMAIL ?? 'admin@viniciusdatti.com';
const ADMIN_PASSWORD = process.env.ADMIN_TEST_PASSWORD ?? 'admin123';

const log = (step) => console.log(`\n▶ ${step}`);

const run = async () => {
  log(`Abrindo browser (headless=${HEADLESS}) → ${WEB}`);
  const browser = await chromium.launch({
    headless: HEADLESS,
    slowMo: HEADLESS ? 0 : 400,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  log('1. Live Lab — visitante');
  await page.goto(`${WEB}/live-lab`, { waitUntil: 'networkidle' });
  await page.locator('input').first().fill('Maria Visitante');
  await page.locator('input').nth(1).fill('Empresa QA');
  await page.getByRole('button', { name: /iniciar|start/i }).click();
  await page.waitForTimeout(2000);
  const chatInput = page.getByPlaceholder(/digite|type|mensagem|message/i).first();
  await chatInput.fill('Olá, teste preenchido pelo Playwright');
  await page.getByRole('button', { name: /enviar|send/i }).click();
  await page.waitForTimeout(1500);
  console.log('   ✓ Mensagem visitante enviada');

  log('2. Admin login');
  await page.goto(`${WEB}/admin/login`, { waitUntil: 'networkidle' });
  await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: /entrar|login|sign in/i }).click();
  await page.waitForURL(/\/admin\/?$/, { timeout: 20000 });
  console.log('   ✓ Login admin OK →', page.url());

  log('3. Dashboard (realtime sem abrir Chat)');
  await page.waitForTimeout(3000);
  const dashText = await page.locator('body').innerText();
  const hasChats = dashText.includes('Chats Ativos') || dashText.includes('Não lidas');
  console.log('   ✓ Dashboard carregado:', hasChats ? 'stats visíveis' : 'verifique stats');

  log('4. Admin Chat — responder');
  await page.goto(`${WEB}/admin/chat`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.getByText('Maria Visitante').first().click();
  await page.waitForTimeout(1500);
  const adminInput = page.getByPlaceholder(/digite|type|resposta|message/i).first();
  await adminInput.fill('Resposta do admin via Playwright');
  await page.getByRole('button', { name: /enviar|send/i }).click();
  await page.waitForTimeout(2000);
  console.log('   ✓ Resposta admin enviada');

  log('5. Voltar Live Lab — ver resposta');
  const visitorPage = await browser.newPage();
  await visitorPage.goto(`${WEB}/live-lab`, { waitUntil: 'networkidle' });
  await visitorPage.waitForTimeout(3000);
  const sawReply =
    (await visitorPage.locator('text=Resposta do admin via Playwright').count()) > 0;
  console.log('   ', sawReply ? '✓ Visitante vê resposta admin' : '⚠ Resposta não visível (refresh sessão?)');

  log('Concluído. URLs:');
  console.log(`   Frontend: ${WEB}`);
  console.log('   API:      http://127.0.0.1:8000');
  console.log('   Docs:     http://127.0.0.1:8000/docs');

  if (!HEADLESS) {
    console.log('\nBrowser aberto — feche a janela quando terminar.');
    await page.waitForTimeout(8000);
  }

  await browser.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
