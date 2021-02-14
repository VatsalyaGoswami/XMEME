// REquiring modules
const express = require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");


// using app
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Database
mongoose.connect("mongodb+srv://admin-Vatsalya:Vatsalya123@xmeme.ctsom.mongodb.net/memesDB", {
useUnifiedTopology: true,
useNewUrlParser: true,
});

// Database Schema
var itemsSchema={
  title:String,
  caption:String,
 imageUrl:String
  };

// Database model
const Meme=mongoose.model("Meme",itemsSchema);

// Default items
const  meme1= new Meme({
  title:"Vatsalya",
  caption:"This is dark",
 imageUrl:" https://i.redd.it/v95c2gzlj4541.jpg"

});
const meme2=new Meme({
  title:"Avneet",
  caption:"This is also dark",
 imageUrl:"https://i.redd.it/x0m2s8dm83031.jpg"

});

// Default Array
const defaultMemes=[meme1,meme2];



// Http requests
app.route("/memes").get(function(req,res){
  Meme.find(function(err,foundMEMES){
    if(!err){
      res.send(foundMEMES);

    }
    else{
      res.send(err);
    }
 
  });
})
.post(function(req,res){
  console.log(req.body.caption);
  console.log(req.body.imageUrl);
});
 
// HTTP request for id
app.route("/memes/:idmeme")
.get(function(req,res){
  Meme.findOne({_id:req.params.idmeme},function(err,foundMEME){
    if(foundMEME){
      res.send(foundMEME);
    }
    else{
      res.send("No memes found matching that id");
    }

  });
})
.patch(function(req,res){
  Meme.updateOne(
   { _id:req.params.idmeme},
   {$set:req.body},

   function(err){
     if(!err){
       res.send("Sucessfully updated meme");
     }
     else{
       res.send(err);
     }

   }
); 

  
});


// get route
app.get("/",function(req,res){

  Meme.find({},function(err,foundmemes){
    if(foundmemes.length===0){
      Meme.insertMany(defaultMemes,function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Successfully added");
        }
      })
      res.redirect("/");
      

    }
    else{
    res.render("list",{memes:foundmemes}); 
    }
  });
  
 

});





// post route from the form
app.post("/",function(req,res){
   const titleName=req.body.a;
   const caption1=req.body.b;
   const URL=req.body.c;

  if(!titleName || !caption1 || !URL){
   res.send("ERROR.Input not found.Go back to the page and try again");
  }
  else{

     const meme= new Meme ({
         title : titleName ,
         caption: caption1,
         imageUrl:URL
        });

        meme.save();

        res.redirect("/");
  }
});


let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}

// Port
app.listen(port,function(){
    console.log("Server has started Sucessfully");
});

