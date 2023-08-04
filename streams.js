const fs = require('fs');
const readStream = fs.createReadStream('./star.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./starwars.txt');
//.on is a event listener
// readStream.on('data', (chunk) => {
//     console.log('new');
//     console.log(chunk);
//     writeStream.write(chunk);
// });

readStream.pipe(writeStream);