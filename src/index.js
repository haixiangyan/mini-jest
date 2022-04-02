import HasteMap from 'jest-haste-map';
import { cpus } from 'os';
import * as path from "path";
import fs from 'fs';

const start = async () => {
  const root = path.join(__dirname, '../tests');
  const hasteMap = new HasteMap({
    rootDir: root, // 主目录
    roots: [root], // 子目录
    maxWorkers: cpus().length,
    platforms: [],
    extensions: ['js'],
    name: 'mini-jest'
  })

  const { hasteFS } = await hasteMap.build()

  const testFiles = hasteFS.matchFilesWithGlob(['**/*.test.js'], root);

  for await (const testFile of testFiles) {
    const code = await fs.promises.readFile(testFile, 'utf8');
    console.log(testFile + '\n' + code);
  }
}

start().then();
