import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.use(express.static('dist'));

app.get("/", (req, res)=>{
    res.send("Server is hot and running!");
})

app.get("/cust", (req, res)=>{
    res.send("Do not mess with me!");
})

//get a list of 6 billionaires
app.get("/api/billionaires", (req, res)=>{ //for proxy example
// app.get("/billionaires", (req, res)=>{
    const bill = [
        {
            name: "Elon Musk",
            netWorth: "$717.9 billion",
            country: "USA",
            company: "Tesla, SpaceX"
        },
        {
            name: "Larry Page",
            netWorth: "$258.3 billion",
            country: "USA",
            company: "Google"
        },
        {
            name: "Larry Ellison",
            netWorth: "$245.3 billion",
            country: "USA",
            company: "Oracle"
        },
        {
            name: "Jeff Bexos",
            netWorth: "$238.6 billion",
            country: "USA",
            company: "Amazon"
        },
        {
            name: "Sergey Brin",
            netWorth: "$238.4 billion",
            country: "USA",
            company: "Google"
        },
        {
            name: "Mark Zuckerberg",
            netWorth: "$223 billion",
            country: "USA",
            company: "Meta"
        }
    ];
    res.send(bill);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})
