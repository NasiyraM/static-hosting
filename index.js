const express = require('express');
const app = express();
const portNumber = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static( __dirname + '/public'));

let blogPosts = [];

app.get('/api/posts', function (req, res) {
  res.send(blogPosts);
})

app.post('/api/posts', function (req, res) {
  if( req.body.title != '' && req.body.content != '') {
    blogPosts.push({
      "title": req.body.title, 
      "content": req.body.content
    });
    console.log(req.body);
    res.send('OK');
  }else {
    res.status(402).send('missing title or content');
  }
})

app.delete('/api/posts/:id', function (req, res) {
  if(!blogPosts[req.params.id]) {
    res.status(404).send(' Blog Post not found ');
  }

  blogPosts.splice(req.params.id, 1);
  res.send('Blog Post Deleted');
});

app.listen(portNumber, function() {
  console.log(`My API is listening on port ${portNumber}.... `);
});
