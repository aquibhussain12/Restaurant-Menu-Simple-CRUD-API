const express = require('express');
const mongoose= require('mongoose');
const cors = require('cors');
const menu= require('./models/menu');
const app = express();
app.use(express.json());
app.use(cors());

// connect to database

mongoose.connect('mongodb://127.0.0.1:27017/Recipe');
const db= mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


//post items to database
app.post('/post', async (req, res) => {
    try {
        const id = req.body.id;
        const RecipeName = req.body.RecipeName;
        const price = req.body.price;
        const category = req.body.category;

        const newMenu = new menu({
            id: id,
            RecipeName: RecipeName,
            price: price,
            category: category,
        });

        await newMenu.save();
        res.send("Data inserted");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});



// route to display data from database
app.get('/display', async (req, res) => {
    try {
        const MenuItems = await menu.find();
        res.send(MenuItems);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

//route to update an item
app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { RecipeName, price, category } = req.body;

        const updatedMenuItems = await menu.findOneAndUpdate(
            { id: id },
            { RecipeName: RecipeName, price: price, category: category },
            { new: true }
        );

        if (!updatedMenuItems) {
            return res.status(404).send("Item not found");
        }

        res.send("Item Updated");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


//route to delete an item
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMenuItems = await menu.findOneAndDelete({id:id});

        if (!deletedMenuItems) {
            return res.status(404).send("Item not found");
        }

        res.send("Item Deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// api to fetch data by category

app.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const MenuItems = await menu.find({ category: category });
        res.send(MenuItems);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});
//create server
app.listen(6969, () => {
    console.log('Server is running on port 6969');
});;