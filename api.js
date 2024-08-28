/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Solves = require('../functions.js');
module.exports = function (app) {
  let solveS=new Solves();
  //solveS.restartAll();
  app.route('/api/books')
    .get(async function (req, res){
      res.send(await solveS.solveGetNoID());
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if(title!=undefined){
      res.send(await solveS.solvePostNoID(title));
      }else{
        res.send('missing required field title')
      }
      //response will contain new book object including atleast _id and title
    })
    
    .delete(async function(req, res){
      res.send(await solveS.solveDeleteNoID());
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      res.send(await solveS.solveGetWithID(bookid));
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      res.send(await solveS.solvePostWithID(bookid,comment));
      //json res format same as .get
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      res.send(await solveS.solveDeleteWithID(bookid))
      //if successful response will be 'delete successful'
    });
  
};
