const fs = require('fs');
const path = require('path');

const inputPath = '../../src/data/library/images/';

const outputPath = '../../src/data/library/images/compiled/';
const outputFile = 'imageLibrary.json';

const outputData = [];

fs.readdir(path.join(__dirname, inputPath), handleFiles);

function handleFiles(err, files) {
    if (err) throw err;

    var jsonFilePattern=/\.[json]+$/i;

    files.forEach((fileName) => {
        if (fileName.match(jsonFilePattern)) {
            const filePath = inputPath + fileName;
            const file = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');

            const data = JSON.parse(file);
            console.log('\x1b[32m', 'reading ' + fileName, '\x1b[0m');
            data.forEach((item) => {
              outputData.push(item);
            });
        }
    });

    const outputJson = JSON.stringify(outputData, null, 2);
    console.log(outputJson);
    fs.writeFile(path.join(__dirname, outputPath + outputFile), outputJson, function(err) {
      if (err) {
        throw('File save error: '+ err);
      }
      console.log('\x1b[32m', outputFile + ' saved', '\x1b[0m');
    });
}