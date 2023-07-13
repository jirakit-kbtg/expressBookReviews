const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  await new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})
  res.json(books)
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  await new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },1000)})
  res.json(books[req.params.isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    await new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },1000)})
  for (const book of Object.values(books)){
      if (book.author===req.params.author){
        return res.json(book);
      }
  }
  return res.status(404).json({message: "Not Found"});
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    await new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },1000)})
    for (const book of Object.values(books)){
        if (book.title===req.params.title){
          return res.json(book);
        }
    }
    return res.status(404).json({message: "Not Found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  res.json(books[req.params.isbn].reviews)
});

module.exports.general = public_users;
