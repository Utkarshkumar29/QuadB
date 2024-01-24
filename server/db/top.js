const mongoose=require('mongoose')

const TopSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    last:{
        type:Number,
        required:true
    },
    buy:{
        type:Number,
        required:true
    },
    sell:{
        type:Number,
        required:true
    },
    volume:{
        type:Number,
        required:true
    },
    base_unit:{
        type:String,
        required:true
    }
})

const TopModel=mongoose.model("top",TopSchema)

module.exports=TopModel