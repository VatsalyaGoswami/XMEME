const express = require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app= express();
// let memes=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');
// mongoose.connect("mongodb://localhost:27017/memesDB",{ useNewUrlParser: true } );

mongoose.connect("mongodb+srv://admin-Vatsalya:Vatsalya123@xmeme.ctsom.mongodb.net/memesDB", {
useUnifiedTopology: true,
useNewUrlParser: true,
});


var itemsSchema={
  title:String,
  caption:String,
 imageUrl:String
  };

const Meme=mongoose.model("Meme",itemsSchema);
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

const defaultMemes=[meme1,meme2];


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


app.listen(port,function(){
    console.log("Server has started Sucessfully");
});

