// @flow
import fs from 'fs-extra';
import path from 'path';

export default function fileTransfer() {
  try {
    const args = process.argv.slice(2);
    if (!args[0]) {
      throw new Error('Please pass the file path of the files to be copied as the first argument, i.e. node fileTransfer.js ../brand-central-cms/ContentBlocks');
    }
    const filePath = path.join(process.cwd(), args[0]);
    const destinationPath = path.join(process.cwd(), './src/ContentBlocks');
    fs.remove(destinationPath, () => {
      fs.copySync(filePath, destinationPath);
    });
  } catch (err) {
    throw err;
  }
}