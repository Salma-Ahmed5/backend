const express = require("express");
//const mongoose = require('mongoose');
const app= express()  //bi3ml web server 
const cors = require('cors');
app.use(express.json());
app.use(cors({
  origin: 'https://frontend-git-salma-ahmed-dev.apps.rm3.wse.p1.openshiftapps.com',
}));


const User = require("./DataBase/User");

const order = require("./DataBase/order");

  
const mongoose = require("mongoose");


const mongoURI = process.env.MONGO_URI || "mongodb://mongo-salma-ahmed-dev.apps.rm3.7wse.p1.openshiftapps.com:27017/mydatabase";
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

//----------------------Register-------------------------//
app.post("/Register",async (req,res)=>{
    const newUser= new User();
    const userName = req.body.name
    const userEmail = req.body.email
    const userPhone = req.body.phone
    const userPassword = req.body.password
    const userRole = req.body.Role

newUser.schemaName=userName
newUser.schemaEmail=userEmail
newUser.schemaPhone=userPhone
newUser.schemaPassword=userPassword
newUser.schemaRole=userRole
console.log(req.body);
    res.json(newUser)
    
    await newUser.save(); //estana lama elsave y5ls b3deen e3ml send//
    
    })


//----------------------Login-------------------------//
    
app.get("/login/:useremail", async (req, res) => {
    const email = req.params.useremail;
    
    try {
        const found = await User.findOne({ schemaEmail: email });
        if (found) {
            res.json(found);
        } else {
            res.status(404).json({ message: "User not found, please register first" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error while logging in, please try again", error: error.message });
    }
});
//----------------------Create Order-------------------------//
app.post("/createorder", async (req, res) => {
    try {    
       const newOrder = new order();
       newOrder.schemastatus=req.body.status;
       newOrder.schemapickup = req.body.pickup;
       newOrder.schemadropoff = req.body.dropoff;
       newOrder.schematype = req.body.type;
       newOrder.schemaweight = req.body.weight;
       newOrder.schemaextradetails = req.body.extradetails;
       newOrder.schemacourier=req.body.courier;
       newOrder.userEmail = req.body.userEmail;
       
       await newOrder.save();
       
       console.log("Order created:", newOrder);
      res.json(newOrder);  
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ error: "Order creation failed." });
    }
  });
  
  
app.get('/getorders', async (req, res) => {
  const userEmail = req.query.email; 

  try {
   
    const orders = await order.find({ userEmail });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.json(orders);  
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders. Please try again later.", error });
  }
});

//--------------------Details------------------//
app.get("/orderdetails/:id", async (req, res) => {
  try {
    const orderId = req.params.id; 
    const foundOrder = await order.findById(orderId);

    if (!foundOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.json(foundOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to retrieve order details." });
  }
});

  // Cancel Order 
app.post("/order/:id/cancel", async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = 'Canceled'; // Update the order's status to 'Canceled'
    await order.save();
    res.json({ message: "Order canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error canceling order", error });
  }
});
//---------------------------Admin-----------------------//
app.get('/AllOrders', async (req, res) => {
  try {
    const orders =  await order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).send('Error fetching orders');
  }
}); 
//---------------------AllUsers-----------------------//
app.get('/AllUsers', async (req, res) => {
  try {
    const users =  await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
}); 
//-----------------Assign----------------//
app.put('/AssignCourier/:id/:courier', async (req, res) => {
  try {
    const { id, courier } = req.params;  
    const Order = await order.findById(id);
    Order.schemacourier = courier;
    await Order.save();
    res.json(Order);
  } 
  catch (error) {
    res.json({ message: 'Failed to assign courier', error });
  }
}
);

//-------------------update status-----------//


app.put('/UpdateStatus/:id/:urlStatus', async (req, res) => {
  try {
    const { id, urlStatus } = req.params;  
    const Order = await order.findById(id);
    Order.schemastatus = urlStatus; 
    await Order.save();
    console.log(Order);  
    res.json(Order);
  } catch (error) {
   
    res.json({ message: 'Failed', error });
  }
});




 //------------Delete Order---------------//
 app.delete('/DeleteOrder/:id', async (req, res) => {
  try {
    const Orderid = req.params.id;
    const result = await order.findByIdAndDelete(Orderid);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    
    res.json({ message: 'Error deleting order' });
  }
});

//----------------------Haga-------------------------//
app.listen(5050 /*port*/ , ()=> {
    console.log("i am shosho port 5050");
} )

