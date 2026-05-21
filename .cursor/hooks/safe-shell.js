/**
 * Blocks destructive shell/MCP commands for the portfolio repo.
 * Fail-closed on deny; allow otherwise.
 */
const readline = require('readline');

const DENY_PATTERNS = [
  /\bgit\s+push\b.*--force\b/i,
  /\bgit\s+push\b.*-f\b/i,
  /\bgit\s+reset\s+--hard\b/i,
  /\bgit\s+clean\s+-fdx\b/i,
  /\brm\s+-rf\s+\/\b/i,
  /\brmdir\s+\/s\s+\/q\s+[A-Z]:\\/i,
  /\bformat\s+[A-Z]:/i,
  /\bdel\s+\/f\s+\/s\s+\/q\s+[A-Z]:\\/i,
  /\bRemove-Item\b.*-Recurse\b.*[A-Z]:\\/i,
  /\bdrop\s+database\b/i,
  /\btruncate\s+table\b/i,
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (line) => {
  let payload = {};
  try {
    payload = JSON.parse(line);
  } catch {
    process.stdout.write(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  const command =
    payload.command ||
    payload.tool_input?.command ||
    payload.tool_input?.cmd ||
    '';

  const blocked = DENY_PATTERNS.some((pattern) => pattern.test(command));

  if (blocked) {
    process.stdout.write(
      JSON.stringify({
        continue: false,
        userMessage:
          'Blocked: destructive command is not allowed in this project hook.',
      })
    );
  } else {
    process.stdout.write(JSON.stringify({ continue: true }));
  }
  process.exit(0);
});
