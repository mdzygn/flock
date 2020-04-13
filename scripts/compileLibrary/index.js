const fs = require('fs');
const path = require('path');

const inputPath = '../../src/data/library/images/general.json';
const outputFile = 'imageLibrary.json';
const outputPath = '../../src/data/library/images/compiled/';

const outputData = [];

const file = fs.readFileSync(path.join(__dirname, inputPath), 'utf-8');
const data = JSON.parse(file);

data.forEach((item) => {
  console.log('item', item);

//   files.forEach((file) => {
//     const path = '.' + file;
//     const outputJson = JSON.stringify(newJson, null, 2);

//     // fs.writeFile(path, printableJson, function(err) {
//     //   if (err) throw('File save error: '+ err);
//     //   console.log('file saved');
//     // });

//   });
});

const outputJson = JSON.stringify(outputData, null, 2);
console.log(path.join(__dirname, outputPath + outputFile));
fs.writeFile(path.join(__dirname, outputPath + outputFile), outputJson, function(err) {
  if (err) {
    throw('File save error: '+ err);
  }
  console.log('\x1b[32m', outputFile + ' saved');
});