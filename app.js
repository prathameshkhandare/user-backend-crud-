const express = require('express');
const app = express();
exports.app = app;
const path = require('path');
const UserModel = require('./models/user.js');
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  res.render('index',)
});

app.get('/viewusers', async (req, res) => {
  try {
    let user = await UserModel.find();
    // console.log(user);  //debugging checks
    res.render('users', { user });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/delete/:id', async (req, res) => {
  try {
      console.log(req.params.id); // Logging the ID to check

      // Use findOneAndDelete with a condition
      const user = await UserModel.findOneAndDelete({ _id: req.params.id });


      console.log("User deleted:", user);
      res.redirect('/viewusers');
  } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Error deleting user");
  }
});



app.get('/edit/:userid', async (req,res)=>{

let user = await UserModel.findOne({_id:req.params.userid})
console.log(user.name)
  res.render('edit',{user:user});
})




app.post('/create', async  (req, res) => { 
let {name , email,image}=req.body;


await UserModel.create({name,email,image})

res.redirect('/viewusers');  

})


app.post('/update/:userid', async (req, res)=> {
  try{
    let {name,email,image}=req.body;
  let user=await UserModel.findOneAndUpdate({_id:req.params.userid},{name,email,image},{new:true});
  console.log(user);
  res.redirect('/viewusers');
  

  }
  catch(err){
    console.log(err);
  }
  

})


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});