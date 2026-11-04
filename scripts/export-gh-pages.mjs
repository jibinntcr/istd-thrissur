import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const root = process.cwd();
const apiDir = path.join(root, 'src', 'app', 'api');
const backupDir = path.join(root, 'src', '_api_backup');
const outDir = path.join(root, 'out');

if (fs.existsSync(apiDir)) {
  fs.renameSync(apiDir, backupDir);
}

try {
  execSync('NEXT_EXPORT=true NEXT_PUBLIC_BASE_PATH=/istd-thrissur npx next build', {
    stdio: 'inherit',
  });

  if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

    const copyTxtFiles = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (
          entry.isDirectory() &&
          entry.name !== '_next' &&
          entry.name !== 'images' &&
          entry.name !== 'photos'
        ) {
          const idxTxt = path.join(full, 'index.txt');
          if (fs.existsSync(idxTxt)) {
            fs.copyFileSync(idxTxt, `${full}.txt`);
          }
          copyTxtFiles(full);
        }
      }
    };

    copyTxtFiles(outDir);
  }
} finally {
  if (fs.existsSync(backupDir)) {
    fs.renameSync(backupDir, apiDir);
  }
}
