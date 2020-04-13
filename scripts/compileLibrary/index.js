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

    let filePath, file, data, collectionTags, collectionItems, newTags;

    files.forEach((fileName) => {
        if (fileName.match(jsonFilePattern) && fileName.indexOf('_') !== 0) {
            filePath = inputPath + fileName;
            file = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');

            data = JSON.parse(file);
            console.log('\x1b[32m', 'reading ' + fileName, '\x1b[0m');

            collectionTags = data.tags || '';
            collectionItems = data.items || [];

            console.log('collectionTags: ' + collectionTags);
            console.log('collectionItems: ' + collectionItems.length);

            if (collectionItems) {
              collectionItems.forEach((item) => {
                newTags = item.tags || '';
                if (collectionTags) {
                  if (newTags) {
                    newTags = collectionTags + ', ' + newTags;
                  } else {
                    newTags = collectionTags;
                  }
                }
                item.tags = newTags;
                outputData.push(item);
              });
            }
        }
    });

    const outputJson = JSON.stringify(outputData, null, 2);
    fs.writeFile(path.join(__dirname, outputPath + outputFile), outputJson, function(err) {
      if (err) {
        throw('File save error: '+ err);
      }
      console.log('\x1b[32m', outputFile + ' saved', '\x1b[0m');
    });
}