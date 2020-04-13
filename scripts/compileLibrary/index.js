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

    let filePath, file, data, newItem, collectionCategory, collectionTags, collectionItems, newTags;

    files.forEach((fileName) => {
        if (fileName.match(jsonFilePattern) && fileName.indexOf('_') !== 0) {
            filePath = inputPath + fileName;
            file = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');

            data = JSON.parse(file);

            collectionCategory = data.category || '';
            collectionTags = data.tags || '';
            collectionItems = data.items || [];

            console.log('reading ' + fileName + ' items: ' + collectionItems.length);

            if (collectionItems) {
              collectionItems.forEach((item) => {
                if (true) { //!item.disabled) {
                  newItem = {};

                  // if (collectionCategory) {
                  //   newItem.category = collectionCategory;
                  // }

                  newItem.imageId = item.imageId;

                  newTags = item.tags || '';
                  if (collectionTags) {
                    if (newTags) {
                      newTags = collectionTags + ', ' + newTags;
                    } else {
                      newTags = collectionTags;
                    }
                  }
                  newItem.tags = newTags;

                  outputData.push(newItem);
                }
              });
            }
        }
    });

    console.log('total items: ' + outputData.length);

    // const outputJson = JSON.stringify(outputData, null, 2);
    const outputJson = JSON.stringify(outputData);
    fs.writeFile(path.join(__dirname, outputPath + outputFile), outputJson, function(err) {
      if (err) {
        throw('File save error: '+ err);
      }
      console.log('\x1b[32m', outputFile + ' saved', '\x1b[0m');
    });
}