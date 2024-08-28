/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title:"testPost"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'title', 'Books in object should contain title');
          assert.property(res.body, '_id', 'Books in object should contain _id');
          done();
        });
        //done();
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title:undefined})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          done();
        });
        //done();
      });
      
    });

  

    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
        //done();
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .keepOpen()
          .get('/api/books/no')
          .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.equal(res.text, 'no book exists', 'should contain comments');
          done();
        });
        //done();
      });

      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .keepOpen()
          .get('/api/books/66cf219e67a5c993a25a823a')
          .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'comments', 'should contain comments');
          assert.property(res.body, 'title', 'should contain title');
          assert.property(res.body, '_id', 'should contain _id');
          done();
        });
        //done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .keepOpen()
        .post('/api/books/66cf219e67a5c993a25a823a')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({comment:"testComment"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'comments', 'should contain comments');
          assert.property(res.body, 'title', 'should contain title');
          assert.property(res.body, '_id', 'should contain _id');
          done();
        });
        //done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .keepOpen()
        .post('/api/books/66cf219e67a5c993a25a823a')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({comment:undefined})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.equal(res.text, 'missing required field comment', 'should have proper message');
          done();
        });
        //done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .keepOpen()
        .post('/api/books/no')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({comment:"testComment"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.equal(res.text, 'no book exists', 'should have proper message');
          done();
        });
        //done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .keepOpen()
          .delete('/api/books/66cf219e67a5c993a25a823a')
          .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.equal(res.text, 'delete successful', 'should have proper message');
          done();
        });
        //done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .keepOpen()
          .delete('/api/books/no')
          .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.equal(res.text, 'no book exists', 'should have proper message');
          done();
        });
        //done();
      });

    });

  });

});


