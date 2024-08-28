//mongoDB schema
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const bookSchema= new mongoose.Schema({
    title:String,
    comments:[{type:String}],
    commentcount:{type:Number,default:0}
  });
  let Book = mongoose.model('Book',bookSchema);

  

function Solves(){
    this.restartAll=async function(){
      await Book.deleteMany({});
    }
    this.saveElement=async function(elementToSave){
      try{
          await elementToSave.save();
      }catch(err){
        console.error(err);
      }
      }

    this.findAnElement=async function(titleQ){
        const foundElement=await Book.findOne({title:titleQ})
        return foundElement
    }

    this.restartAll.bind(this);
    this.saveElement.bind(this);
    this.findAnElement.bind(this);
    

    this.solvePostNoID=async function (titleQ){
        var NewBook= new Book({title:titleQ});
        await this.saveElement(NewBook);
        const newBookSaved=await this.findAnElement(titleQ);
        return newBookSaved;
        };

    this.solveGetNoID=async function(){
        const allBooksSaved=await Book.find({},'id title commentcount');
        return allBooksSaved;
      };

    this.solveGetWithID=async function(idQ){
      try{
      const bookSaved=await Book.findOne({_id:idQ},'id title comments');
      if(bookSaved!=null){
      return bookSaved;
      }else{
        return ('no book exists')
      }
      }catch(e){
        return ('no book exists')
      }      
    }

    this.findOneAndReturn=async function(idQ){
      try{
        const bookSaved=await Book.findOne({_id:idQ},'id title commentcount comments');
        if(bookSaved===null){
          return ('no book exists')
        }else{
          return bookSaved;
        }
        }catch(e){
          return ('no book exists')
        } 
    }

    this.solveGetWithID.bind(this);

    this.solvePostWithID=async function(idQ,commentQ){

      if(commentQ===undefined){
        return ('missing required field comment')
      }else{
      const bookToBeCommented = await this.findOneAndReturn(idQ);
        if (bookToBeCommented==='no book exists' || bookToBeCommented===undefined){
          return ('no book exists')
        }else{
          var commentNewCount=bookToBeCommented.commentcount+1;
          const bookUpdated=await Book.findOneAndUpdate({_id:idQ},{$push:{comments:commentQ},commentcount:commentNewCount},{new:true});
          return bookUpdated;
        }
      }
    }

    this.solveDeleteNoID=async function(){
      try{
        await this.restartAll();
        return ("complete delete successful")
      }catch(e){
        console.error(e);
      }
    }

    this.solveDeleteWithID=async function(idQ){
      try{
        const bookToBeCommented = await this.findOneAndReturn(idQ);
        if (bookToBeCommented==='no book exists' || bookToBeCommented===undefined){
          return ('no book exists')
        }else{
          await Book.deleteOne({_id:idQ});
          return ("delete successful")
        }
        
      }catch(e){
        console.error(e);
      }
    }
        
        
        





};
module.exports = Solves;