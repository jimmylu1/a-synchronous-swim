const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');



// fs.mkdir('/messages', (err) => {
//   console.log(err);
// });

// fs.readFile('./js/httpHandler.js', (err) => {
//   console.log(err, 'error');
// });

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'OPTIONS') {
  } else if (req.method === 'GET') {
    // res.write(messageQueue.dequeue());
  } else if (req.method === 'POST') {
    // messageQueue.enqueue(req.data);
    res.write(JSON.stringify(req.body));
  }
  // res.write('\n');
  // console.log(res);
  res.end();
};
