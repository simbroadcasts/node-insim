const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const dotenvPath = path.resolve(__dirname, '..', '.env');

[`${dotenvPath}.local`, dotenvPath].forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({ path: dotenvFile });
  }
});
