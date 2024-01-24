const express=require('express')
const axios=require('axios')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')

app.use(cors())
require('dotenv').config()
const TopModel=require('./db/top')

app.get('/',async(req,res)=>{
    try {
        const response=await axios.get('https://api.wazirx.com/api/v2/tickers')
        const data=response.data
        console.log("Data fetched successfully")
        const tradingPairs = Object.values(data)
        console.log(tradingPairs)
        tradingPairs.sort((a, b) => parseFloat(b.last) - parseFloat(a.last))
        const top10Tickers = tradingPairs.slice(0, 10)
        top10Tickers.forEach(async(item)=>{
            let model=new TopModel({
                name:item.name,
                last:item.last,
                buy:item.buy,
                sell:item.sell,
                volume:item.volume,
                base_unit:item.base_unit
            })
            const response=await model.save()
            if(response){
                console.log("Data saved to the database")
            }
        })
        res.status(200).json(top10Tickers)
    } catch (error) {
        console.log("Error getting the data",error)
    }
})

app.get('/getData',async(req,res)=>{
    try {
        const response=await TopModel.find()
        if(response){
            res.status(200).json(response)
            console.log("Fetched data")
        }else{
            console.log("Error getting the data from database")
        }
    } catch (error) {
        console.log("Error getting the data from database",error)
    }
})

mongoose.connect(process.env.MongoDB_URL).then(() => {
    console.log("MongoDB Connected")
}).catch((error) => {
    console.log(error)
})

app.listen(4000,()=>{
    console.log("Connected to the server at 4000")
})