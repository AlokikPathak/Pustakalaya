/**
 * File Name: genreController.js
 * File Path: LocalLibrary/controllers/genreController.js 
 * Purpose: Handles genre routes functions
 * @author: Alokik Pathak
 * Created On: 13/06/2019
 */

var Genre = require('../models/genre');
var Book = require('../models/book');

var async = require('async');


// Display list of Books
exports.genre_list = function(req, res) {
   Genre.find()
   .exec( function(err, list_genre){
       if(err) { return next(err);}

       // Successful render view
       res.render('genre_list', { title:'Genre List', genre_list: list_genre});
   });
};

// Display detail page of specific book
exports.genre_detail = function(req, res) {
  //  res.send("NOT IMPLEMENTED: Book details: "+req.params.id);


  async.parallel( {

        genre: function(callback) {
            Genre.findById(req.params.id)
            .exec(callback);
        },

        genre_books: function(callback) {
            Book.find({'genre': req.params.id})
            .exec(callback);
        }

    }, function(err, result) {
        if(err) { return next(err); }

        if(result.genre == null) {
            // no results
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        // successful so render
        res.render('genre_detail', {title: 'Genre Detail', genre: result.genre, genre_books: result.genre_books});
    }
  )
};

// Display book create form on GET
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Display Book create on POST
exports.genre_create_post = function(req, res) {
    res.send("NOT IMPLEMENTED: Book create POST");
};

// Display Book delete on GET
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Display Book delete on POST
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display Book update form on GET
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Display Book update on POST
exports.genre_update_post = function(req, res) {
   res.send('NOT IMPLEMENTED: Book update POST');
};


