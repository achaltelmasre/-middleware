import dotenv from 'dotenv'
import express from 'express'
dotenv.config();

const app = express();
app.use(express.json())

let counter = 0;

const apiCallCounters = (req, res, next)=>{
    counter++;
    console.log(`API calls: ${counter}`)
    next();
} 

app.use(apiCallCounters);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello word!');
})

app.get('/health', (req, res) => {
    res.send('Server is healthy!');
})

const checkApi = (req, res, next) => {
    const {apiKey} = req.query;
    if (apiKey==="abc123") {
        next();
    }
    else{
        return res.status(401).json({
            success: false,
            message: 'API key is invalid'
        })
    }
}

const validateParams = (req, res, next) =>{
    const {title, description, price} = req.body

    if (!title) {
        return res.json({
            success: true,
            message: 'title is missing'
        })
    }

    if (!description) {
        return res.json({
            success: true,
            message: 'decription is missing'
        })
    }

    if (!price) {
        return res.json({
            success: true,
            message: 'price is missing'
        })
    }
    next();

}

app.post("/orders", checkApi,validateParams,  async (req, res)=>{
    res.json({
        success: true,
        data: [],
        message: ' orders is created'
    })
})

app.get("/orders",checkApi, async(req, res)=>{
    res.json({
        success:true,
        data: {},
        message: "Orders  fetched successfully "
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})