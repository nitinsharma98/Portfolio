if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const Customer = require("./models/customer.js");
const wrapAsync = require("./utils/wrapAsync.js");
const Review = require("./models/review.js");


const MONGO_URL = process.env.DB_PIN;

main().then( (res) => {console.log("DB connected successfully");} )
			      .catch(err => console.log(err));
			      async function main() {
				await mongoose.connect(MONGO_URL);
				};


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"))                       // to use views for find ejs file
app.engine('ejs',ejsMate);                                           // to use layout and include 
app.use(express.static(path.join(__dirname, "/public")));            // to include css from public
app.use("/Images",express.static('Images'));
app.use(express.urlencoded({extended:true})); 


app.get("/", (req, res) => {
    res.render("external/home.ejs");
});

// home route
app.get("/home", async(req, res) => {
    try {
        await res.render("external/home.ejs");
    } catch (error) {
        console.log(error);
    }
});

app.get("/portfolio", async(req, res) =>{
    res.render("external/portfolio.ejs");
});

app.get("/remarks", async(req, res) =>{
    const allreview =await Review.find({});
    res.render("external/review.ejs",{allreview});
});

app.get("/hireme", async(req, res) =>{
    res.render("external/hire.ejs");
});

// add data after submit hire me 

// app.get("/test", async(req,res)=>{
//     let newCustomer = new Customer({
//         owner:"nitin",
//         phone:98,
//         address:"asd",
//     });
//    await newCustomer.save();
//    console.log("saved");
//    res.send("success");
// });                  testing entries

// create route of customer to post

app.post("/home", wrapAsync (async(req,res,next)=>{
        let customer= req.body.customer;
        const newCustomer = new Customer(customer);
        await newCustomer.save();
        console.log(customer);
        res.redirect("/home");
       }
));

// create route of review to post

app.post("/remarks", wrapAsync (async(req , res , next) =>{
    let review = req.body.review;
    const newReview = new Review(review);
    await newReview.save();
    res.redirect("/remarks");
}));


// footer routs

app.get("/about", async(req,res) => {
    res.render("internal/about.ejs")
});

app.get("/services", async(req,res) => {
    res.render("internal/service.ejs")
});

app.get("/terms", async(req,res) => {
    res.render("internal/term.ejs")
});

// read doc btn

app.get("/webdev",async(req,res)=>{
    res.render("internal/webdev.ejs");
});

app.get("/webdes",async(req,res)=>{
    res.render("internal/webdes.ejs");
});

app.get("/portdoc",async(req,res)=>{
    res.render("internal/portdoc.ejs");
});


// download cv link utton
app.get("/home/downloadcv", (req,res) => {

});

// owner
app.get("/owner",  async(req,res) =>{
    try {
         await res.render("external/owner.ejs");
    } catch (error) {
        console.log(error);
    }
});

const checkToken = (req,res,next)=>{
    let {token}= req.query;
    if(token === process.env.TOKEN) {
    next();
    }else
    console.log(token);
    res.send("ACCESS DENIED!  You are not owner of this Portfolio!");
};

app.get("/owner/entry", checkToken, async(req,res)=>{
    try {
        res.render("external/ownerentry.ejs");
    } catch (error) {
        console.log(error);
}}); 

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/data", async (req,res) => {
    const clients =await Customer.find({});
    res.render("del/data.ejs",{clients});
});


app.use((err,req,res,next)=>{
    res.send("Something went wrong!");
});


// port connection

app.listen(8080, () => {
    console.log("server start");
});





