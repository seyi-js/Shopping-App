const express = require('express');
const router = express.Router();
const {redirectLogin, findById} = require('../../middleware/auth');



//Model

const Item = require('../../Models/Item');

//@route GET api/items
//@desc  GET ALL Items
//@ccess  Public

router.get('/', (req,res)=>{
    
    Item.find({})
    .sort({date: -1})
    .then(items =>{
        res.json(items)
    })
    .catch(err =>{
        console.log(err)
    })
});

//@route POST api/items
//@desc  Create Items
//@ccess  Private

router.post('/',redirectLogin, (req,res)=>{
    const newItem = new Item({
        item: req.body.item
    })

    Item.create(newItem)
    .then(item => res.json(item))
    .catch(err => console.log(err));
});


//@route DELETE api/items
//@desc  DELETE Items
//@ccess  Private

router.delete('/:id', redirectLogin,findById, (req,res)=>{
   Item.findById(req.params.id)
   .then(item => {
       item.remove(),
        res.json(item._id)
    }
   )
   .catch( err => res.status(404).json({success: false}))
});

module.exports = router;