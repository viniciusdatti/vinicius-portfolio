import { MockWindowScene } from '@/components/ProjectShowcase/ProjectShowcase.types';

export enum TerminalCodeTokenRole {
  Keyword = 'keyword',
  Accent = 'accent',
  Muted = 'muted',
  Plain = 'plain',
}

export interface TerminalCodeLine {
  text: string;
  role: TerminalCodeTokenRole;
  delay: string;
}

const VAULT_ORCHESTRATOR_LINES: TerminalCodeLine[] = [
  { text: 'const VAULT_LOCK_TTL_MS = 30_000;', role: TerminalCodeTokenRole.Accent, delay: '0s' },
  { text: 'await vaultClient.getRevision(assetId);', role: TerminalCodeTokenRole.Plain, delay: '0.4s' },
  { text: 'scheduler.enqueue(syncErpThumbnail);', role: TerminalCodeTokenRole.Keyword, delay: '0.9s' },
  { text: 'if (!acquireLock(revision)) return;', role: TerminalCodeTokenRole.Muted, delay: '1.3s' },
  { text: 'erp.pushStockDelta(payload);', role: TerminalCodeTokenRole.Plain, delay: '1.8s' },
];

const TABLE_SYNC_LINES: TerminalCodeLine[] = [
  { text: 'SELECT sku, qty FROM erp_stock;', role: TerminalCodeTokenRole.Muted, delay: '0.2s' },
  { text: 'MAP vault.thumb → erp.asset_id', role: TerminalCodeTokenRole.Accent, delay: '0.6s' },
  { text: 'UPSERT inventory_delta …', role: TerminalCodeTokenRole.Keyword, delay: '1s' },
  { text: 'COMMIT; -- idempotent batch', role: TerminalCodeTokenRole.Plain, delay: '1.4s' },
];

const HOOK_RUNTIME_LINES: TerminalCodeLine[] = [
  { text: 'export const useSyncPulse = () => {', role: TerminalCodeTokenRole.Keyword, delay: '0s' },
  { text: '  const [phase, setPhase] = useState<Phase>();', role: TerminalCodeTokenRole.Plain, delay: '0.5s' },
  { text: '  useEffect(() => subscribe(socket), []);', role: TerminalCodeTokenRole.Accent, delay: '1s' },
  { text: '  return { phase, metrics };', role: TerminalCodeTokenRole.Muted, delay: '1.5s' },
];

const SNIPPETS_BY_SCENE: Record<MockWindowScene, TerminalCodeLine[]> = {
  [MockWindowScene.Shell]: VAULT_ORCHESTRATOR_LINES,
  [MockWindowScene.Table]: TABLE_SYNC_LINES,
  [MockWindowScene.Code]: HOOK_RUNTIME_LINES,
};

/**
 * Resolves monospace terminal lines for a mock window scene.
 */
export const getTerminalSnippetLines = (scene: MockWindowScene): TerminalCodeLine[] => (
  SNIPPETS_BY_SCENE[scene]
);
