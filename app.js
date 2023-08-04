const express = require('express');
//express app
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


 //connect to mongodb
const db = 'mongodb+srv://shingu:pskNyCBh7JQextmM@cluster0.qlcfi2k.mongodb.net/nodejs?retryWrites=true&w=majority';
//the second argument is used for removing the deprecation warnings
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) =>
{
    console.log('connected to db');
    app.listen(3000);
    
}).catch((err) => console.log(err));

//add blogs to the database
app.get('/add-blog', (req,res) =>
{
const blog = new Blog({
    title: 'Anakin 101', 
    snippet: 'I Hate you....',
    body: 'What have you become....'
})
//this saves the blog created above to the database
    blog.save()
    .then((result) =>
    {
        res.send(result)
    })
})

app.get('/all-blogs', (req,res) =>
{
    //this finds all the blogs in the database
    Blog.find()
     .then((result) =>
     {
        res.send(result);
     })
})

app.get('/single-blog', (req, res) =>
{
    //this finds a single blog according to ID
    Blog.findById('649ddfc79b30005f5f4988a6')
    .then((result) =>
    {
        res.send(result);
    })
})

//register view engine ejs
app.set('view engine', 'ejs');


// app.use((req, res, next) =>
// {
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method: ', req.method);
//     next();
// });




//middleware and static files
app.use(morgan('dev'));
//takes all theurl encoded data and passes it to an object that can be used in the post object
//basically this middleware accepts form data present in any website
app.use(express.urlencoded({extended: true}));
// this middleware line helps express to access the files that are not accessible otherwise, i.e inside the public folder.
app.use(express.static('public'));

//get requests from the server 3000 port
app.get('/', (req,res) =>
{
   // res.send('<p>Hello there</p>');
   //res.sendFile('./views/iisstart.html', {root:__dirname});

   //sent to index.ejs for displaying on website using the render

   res.redirect('/blogs');
    // const blogs = [
    //     {title: 'Darth Vader 101', snippet: 'I find your Lack of Faith disturbing'},
    //     {title: 'Obi Wan 101', snippet: 'What have you become....'},
    //     {title: 'Anakin 101', snippet: 'I Hate you....'},
    // ]
    //renders the index.ejs page
//    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req,res) =>
{
    //res.send('<p>about there</p>');
    // that second argument is for specifying which directory is it going to start from
    // res.sendFile('./views/about.html', {root:__dirname});
    res.render('about' , {title: 'About'});

});

app.get('/blogs', (req,res) =>
{
    //the 'then' function is fired when the find function is done finding all the blogs since this is an asynchronous function
    //the createdAt sort, sorts it in descending order since the value is -1
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index', {title: 'All Blogs', blogs: result})
    })
    //the render function renders the page with the blogs in it that was found in the database
})

app.post('/blogs', (req,res)=>
{
    //new blog object with the same format title, snippet, body
    const blog = new Blog(req.body);
    blog.save()
    .then((result) => 
    {
        res.redirect('/blogs');
    })
})

app.get('/blogs/create', (req,res) =>
{
    res.render('create' , {title: 'Create a new blog'});
});

//redirect request
app.get('/about-us', (req, res)=>
{
res.redirect('/about');
});

//this function is used when other functions havent been trigerred
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root:__dirname});
    res.status(404).render('404' , {title: '404 error'});
});