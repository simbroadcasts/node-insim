import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const dotenvPath = path.resolve('.env');

[`${dotenvPath}.local`, dotenvPath].forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({ path: dotenvFile });
  }
});
