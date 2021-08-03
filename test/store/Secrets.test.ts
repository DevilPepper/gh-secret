import "jasmine";
import { randomBytes } from 'crypto';
import { decrypt, encrypt } from '~/store';

describe('A simple test', () => {
  const password = randomBytes(128);
  const secrets = {
    GITHUB_TOKEN: "PAT obtained from https://github.com/settings/tokens",
    ACTUAL_SECRET: "A very real secret",
  }

  it(`should encrypt arbitrary object and successfully decrypt back`, () => {
    const fileBuffer =  encrypt(secrets, password);
    const decrypted = decrypt(fileBuffer, password);

    expect(decrypted).toEqual(secrets);
  });
});
