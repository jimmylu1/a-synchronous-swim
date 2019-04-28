const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');



// fs.mkdir('/messages', (err) => {
//   console.log(err);
// });
// const poolPath = path.resolve('poolImage');

try {
  if(!fs.existsSync(poolPath)) {
    fs.mkdirSync(poolPath);
  } 
} catch (err) {
  console.log(err);
}

// fs.open(path.resolve('poolImage/test.txt'), 'a', (err, fd) => { console.log(err);  fs.read(fd, )});

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'GET') {
    if (req.url === '/background.jpg') {
      //  if image does not exist
      //  read file from background image path
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
          res.end();
          next();
        }
      });
    } else {
      res.writeHead(200, headers);
      res.write(messageQueue.dequeue());
      res.end();
    }
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }
 
  if (req.method === 'POST') {
    // allocate a binary data buffer
      if(req.url === '/background.jpg') {
        req.on('data', chunk => {
          res.writeHead(200, headers);
          //  add incoming data to allocated buffer
        });
        //  specify behavior on 'end' event
          //  write the file to the image file path
          //  end response
          //  allow next callback to execute  
      } else {
        //  separates receiving messages from receiving images
        req.on('data', chunk => {
          res.writeHead(200, headers);
          messageQueue.enqueue(chunk.toString('utf8'));
          res.end();
        });
      }
  }
};

