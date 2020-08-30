//this is a Node Express server
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

//the model
var Article = require('./article-model')
var Type = require('./type-model')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

//setup database connection
var connectionString = 'mongodb://admin:Pass01@app-shard-00-00.ilc6q.mongodb.net:27017,app-shard-00-01.ilc6q.mongodb.net:27017,app-shard-00-02.ilc6q.mongodb.net:27017/AppDB?ssl=true&replicaSet=atlas-l296vl-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(connectionString,{ useNewUrlParser: true })
var  db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'))

//setup routes
var router = express.Router();

router.get('/test', (req, res) => {
	res.send('<p>Working</p>')
})

//CRUD articles
router.get('/articles', (req, res) => {
  	Article.find()
	.then((articles) => {
	    res.json(articles);
  	})
})

router.get('/articles/:id', (req, res) => {
  	Article.findOne({id:req.params.id})
	.then((article) => {
	    res.json(article)
 	})
})

router.post('/articles', (req, res) => {
  	var article = new Article()
	article.id = Date.now()
	
	var data = req.body
	// console.log(data)
	Object.assign(article,data)
	article.save()
	.then((article) => {
	  	res.json(article)
  	})
})

router.put('/articles/:id', (req, res) => {
	Article.findOne({id:req.params.id})
	.then((article) => {
		var data = req.body
		Object.assign(article,data)
		return article.save()	
	})
	.then((article) => {
		 res.json(article)
	})
})

router.delete('/articles/:id', (req, res) => {
	Article.deleteOne({ id: req.params.id })
	.then(() => {
		res.json('deleted')
	})
})

//type CRUD
router.get('/types', (req, res) => {
	Type.find()
  .then((type) => {
	  res.json(type);
	})
})

router.get('/types/:id', (req, res) => {
	Type.findOne({id:req.params.id})
  .then((type) => {
	  res.json(type)
   })
})

router.post('/types', (req, res) => {
	var type = new Type()
  type.id = Date.now()
  
  var data = req.body
  Object.assign(type,data)
  type.save()
  .then((type) => {
		res.json(type)
	})
})

router.put('/types/:id', (req, res) => {
  Type.findOne({id:req.params.id})
  .then((type) => {
	  var data = req.body
	  Object.assign(type,data)
	  return type.save()	
  })
  .then((type) => {
	   res.json(type)
  })
})

router.delete('/types/:id', (req, res) => {
  Type.deleteOne({ id: req.params.id })
  .then(() => {
	  res.json('deleted')
  })
})

//use server to serve up routes
app.use('/api', router)

// launch our backend into a port
const apiPort = 4200;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));