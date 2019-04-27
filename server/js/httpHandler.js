const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');



// fs.mkdir('/messages', (err) => {
//   console.log(err);
// });
// const poolPath = path.resolve('poolImage');

// try {
//   if(!fs.existsSync(poolPath)) {
//     fs.mkdirSync(poolPath);
//   } 
// } catch (err) {
//   console.log(err);
// }
// fs.open(path.resolve('poolImage/test.txt'), 'a', (err, fd) => { console.log(err);  fs.read(fd, )});

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if(req.url === 'http://127.0.0.1:3000/background.jpg') {
      //  if image does not exist
      res.writeHead(404, headers);
    } else {
      res.writeHead(200, headers);
      res.write(messageQueue.dequeue());
    }
  }
  var part = null;
  req.on('data', chunk => {
    if (req.method === 'OPTIONS') {
    } else if (req.method === 'POST') {
      if(req.url === 'http://127.0.0.1:3000/poolImage') {
        part = multipart.parse(chunk.toString());
        console.log(part);
        fs.writeFileSync('test.jpg', part.data, (err) => {
          if(err) throw err;
          console.log('saved')
        });
        //  save part to filesystem
      } else {
        res.writeHead(200, headers);
        messageQueue.enqueue(chunk.toString('utf8'));
        // res.write(messageQueue.dequeue());
      }
    }
  });
  res.end();

};
