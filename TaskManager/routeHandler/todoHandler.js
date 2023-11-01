const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
exports.router = router;
const todoSchema = require('./schema/todoSchema')
const Todo = new mongoose.model("Todos", todoSchema);
exports.Todo = Todo;

//Get all the todos 
router.get('/',async(req, res)=>{

})
//Get a todo by id
router.get('/:id',async(req, res)=>{

})
//POST ToDo
router.post('/',async(req, res)=>{
    const newTodo = new Todo(req.body)
    await newTodo.save((err) =>{
        if(err){
            res.status(500).json({
                error: 'There is server side error' 
            })
        }else{
            res.status(200).json({
                message: "Todo was inserted succesfully"
            })
        }
    })

})
//POST mulitple ToDo
router.post('/all',async(req, res)=>{
   await Todo.insertMany(req.body, (err)=>{
    if(err){
        res.status(500).json({
            error: 'There is server side error' 
        })
    }else{
        res.status(200).json({
            message: "Todos were inserted succesfully"
        })

    }

})
})
//DELETE ToDo
router.delete('/:id',async(req, res)=>{

})

module.exports = router;