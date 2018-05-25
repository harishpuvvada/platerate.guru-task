const express = require('express');
const hbs = require('hbs');
const axios = require('axios');   // axios - library with promises built in
const fs = require('fs');
const details = require('./details.js');
const request = require('request');

const port = process.env.PORT || 8000;
hbs.registerPartials(__dirname + '/views');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));



app.use('/posts', (req, res, next) => {

    request({

      url : 'https://jsonplaceholder.typicode.com/posts',
      json : true

    }, (error, response, body) => {

          if (response.statusCode === 200){

            console.log("fetching posts data");

            fs.writeFileSync('./posts.json', JSON.stringify(body,undefined,2));


            } else {

            console.log('Unable to fetch posts data');
         
          }

      next();

    });


}); 



app.get('/posts', (req,res) => {

    var var_posts = require('./posts.json')

    res.render('postsdata.ejs',{

      name : 'plate rate',
      posts : var_posts

    });

});


app.get('/aboutme', (req,res) => {

	data = {description : details.description,
          tech : details.tech,
          techstack : details.techstack,
          hobbies : details.hobbies};
  res.send(JSON.stringify(data));

});

app.get('/aboutme/:param', (req,res) => {

	var param = req.params.param;

	if (param === 'description'){
  res.send(details.description);
  }
  else if (param === 'tech'){
  res.send(details.tech);
  }
  else if (param === 'techstack'){
  res.send(details.techstack);
  }
  else if (param === 'hobbies'){
  res.send(details.hobbies);
  }

	else{ res.render('notfound.hbs');}

});

app.get('*', function(req, res) {

  res.render('notfound.hbs');

});


app.listen(port, () => { //second argument is for printing the message to screen
	console.log(`server is up on port ${port}`);
});
