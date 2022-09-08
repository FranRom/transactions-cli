import { prepareEnvironment } from '@gmrchk/cli-testing-library';

const EXPECTED_RESULT = [
  '_               _                                                      _   _',
  '| |__     __ _  | |   __ _   _ __     ___    ___   ___            ___  | | (_)',
  "| '_ \\   / _` | | |  / _` | | '_ \\   / __|  / _ \\ / __|  _____   / __| | | | |",
  '| |_) | | (_| | | | | (_| | | | | | | (__  |  __/ \\__ \\ |_____| | (__  | | | |',
  '|_.__/   \\__,_| |_|  \\__,_| |_| |_|  \\___|  \\___| |___/          \\___| |_| |_|',
  'Adding new user:',
  'ID: 4a1b84f7-9756-4549-837e-9574c7ffc142 {"GBP":"0","EUR":"0","USD":"-12.00","lastActivity":"1970-01-01"}',
  'Adding  -8.00 USD  to user ID:  4a1b84f7-9756-4549-837e-9574c7ffc142',
  'Adding  -10.00 EUR  to user ID:  4a1b84f7-9756-4549-837e-9574c7ffc142',
  'Adding  +30.00 EUR  to user ID:  4a1b84f7-9756-4549-837e-9574c7ffc142',
  'Adding new user:',
  'ID: faf4a6fe-c839-4ee3-ac11-ee3957ac6332 {"GBP":"0","EUR":"-3.99","USD":"0","lastActivity":"1970-01-01"}',
  'FINAL BALANCES:',
  '┌──────────────────────────────────────┬─────┬────────┬────────┬───────────────┐',
  '│                              User ID │ GBP │    EUR │    USD │ Last Activity │',
  '├──────────────────────────────────────┼─────┼────────┼────────┼───────────────┤',
  '│ 4a1b84f7-9756-4549-837e-9574c7ffc142 │   - │ +20.00 │ -20.00 │    2022-09-06 │',
  '│ faf4a6fe-c839-4ee3-ac11-ee3957ac6332 │   - │  -3.99 │      - │    1970-01-01 │',
  '└──────────────────────────────────────┴─────┴────────┴────────┴───────────────┘'
]

const FILE_TOO_LARGE_MESSAGE = 'Load failed: The file is too large, it should be 1MB max'

describe('Test CLI', () => {
  it('runs successfully and display expected result when passing valid argument', async () => {
    const { execute, cleanup } = await prepareEnvironment();

    const { code, stdout, stderr } = await execute(
      'node',
      './dist/index.js ./src/constants/tx.json'
    );

    expect(stdout).toStrictEqual(EXPECTED_RESULT)
    expect(stderr).toStrictEqual([])
    expect(code).toBe(0);

    await cleanup();
  });
  it('runs successfully with command --help', async () => {
    const { execute, cleanup } = await prepareEnvironment();

    const { code } = await execute(
      'node',
      './dist/index.js --help'
    );

    expect(code).toBe(0);

    await cleanup();
  });
  it('gives an error when the file is too large', async () => {
    const { execute, cleanup } = await prepareEnvironment();

    const { stdout } = await execute(
      'node',
      './dist/index.js ./src/constants/tx.json --maxFileSize=0.00000001'
    );

    expect(stdout.includes(FILE_TOO_LARGE_MESSAGE)).toBe(true);

    await cleanup();
  });
  it('gives an error when does not have mandatory argument', async () => {
    const { execute, cleanup } = await prepareEnvironment();

    const { code, stderr } = await execute(
      'node',
      './dist/index.js'
    );

    expect(stderr).toStrictEqual(["error: missing required argument 'jsonPath'"])
    expect(code).toBe(1);

    await cleanup();
  });
});
