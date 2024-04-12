const express = require('express');
const querystring = require("querystring");
const app = express()
app.use(express.json());;


const PORT = process.env.PORT || 3000;
const redis = require("redis"); 
const redisclient = redis.createClient(); 
(async () => { 
	await redisclient.connect(); 
})(); 

console.log("Connecting to the Redis"); 

redisclient.on("ready", () => { 
	console.log("Connected!"); 
}); 

redisclient.on("error", (err) => { 
	console.log("Error in the Connection"); 
}); 

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});


async function Cadd(Cinfo){
    var key=Cinfo.ClientId;
    console.log(key);
    var hashName=JSON.stringify(Cinfo.TenantId)+ "_"+ JSON.stringify(Cinfo.OMSId);
    const CString = JSON.stringify(Cinfo); 
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value){
        return{success:false, message:"ClientId already exist"};
    }
    else{
    try{
        await redisclient.HSET(hashName,key, CString)
        return {success:true, message:"user added successfully"}
    }catch(err){
        return {success:false, message:"unable to add user"}
        }
    }

}

async function Cupdate(Cinfo){
    var key=Cinfo.ClientId;
    console.log(key);
    var hashName=JSON.stringify(Cinfo.TenantId)+ "_"+ JSON.stringify(Cinfo.OMSId);
    const CString = JSON.stringify(Cinfo); 
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value==null){
        return{success:false, message:"ClientId doesn't exist, so can't update"};
    }
    else{
    try{
        await redisclient.HSET(hashName,key, CString)
        return {success:true, message:"user data updated successfully"}
    }catch(err){
        return {success:false, message:"unable to update user"}
        }
    }

}

async function Cremove(Cinfo){
    var key=Cinfo.ClientId;
    console.log(key);
    var hashName=JSON.stringify(Cinfo.TenantId)+ "_"+ JSON.stringify(Cinfo.OMSId);
    const CString = JSON.stringify(Cinfo); 
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value==null){
        return{success:false, message:"ClientId doesn't exist, so can't delete"};
    }
    else{
    try{
        await redisclient.HDEL(hashName,`${key}`)
        return {success:true, message:"user data deleted successfully"}
    }catch(err){
        return {success:false, message:"unable to delete user"}
        }
    }

}

async function Cget(Cinfo){
    var key=Cinfo.ClientId;
    console.log(key);
    var hashName=JSON.stringify(Cinfo.TenantId)+ "_"+ JSON.stringify(Cinfo.OMSId);
    const CString = JSON.stringify(Cinfo); 
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value==null){
        return{success:false, message:"ClientId doesn't exist, so can't get data."};
    }
    else{
    try{
        var obj = JSON.parse(await redisclient.HGET(hashName,`${key}`))
        return obj;
        //return {success:true, message:"user data deleted successfully"}
    }catch(err){
        return {success:false, message:"unable to get user data."}
        }
    }

}

async function CgetAll(Cinfo){
    var hashName=JSON.stringify(Cinfo.TenantId)+ "_"+ JSON.stringify(Cinfo.OMSId);
    try{
        const values = await redisclient.HVALS(hashName);
        const jsonObjects = values.map(value => JSON.parse(value));
        return jsonObjects;
    }catch(err){
        return {success:false, message:"unable to get user data."}
    }
}

async function Oadd(Oinfo){
    var key=Oinfo.OrderId;
    console.log(key);
    var hashName=JSON.stringify(Oinfo.TenantId)+ "_"+ JSON.stringify(Oinfo.OMSId)+"_"+ JSON.stringify(Oinfo.ClientId)+"_"+ JSON.stringify(Oinfo.Token);
    const CString = JSON.stringify(Oinfo); 
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value){
        return{success:false, message:"OrderId already exist"};
    }
    else{
        try{
            await redisclient.HSET(hashName,key, CString)
            return {success:true, message:"order added successfully"}
        }catch(err){
            return {success:false, message:"unable to add order"}
        }
    }

}

async function Oupdate(Oinfo){
    var key=Oinfo.OrderId;
    console.log(key);
    var hashName=JSON.stringify(Oinfo.TenantId)+ "_"+ JSON.stringify(Oinfo.OMSId)+"_"+ JSON.stringify(Oinfo.ClientId)+"_"+ JSON.stringify(Oinfo.Token);
    const CString = JSON.stringify(Oinfo); 
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value==null){
        return{success:false, message:"OrderId doesn't exist, so can't update"};
    }
    else{
        try{
            await redisclient.HSET(hashName,key, CString)
            return {success:true, message:"Order data updated successfully"}
        }catch(err){
            return {success:false, message:"unable to update Order"}
        }
    }
}

async function Oremove(Oinfo){
    var key=Oinfo.OrderId;
    console.log(key);
    var hashName=JSON.stringify(Oinfo.TenantId)+ "_"+ JSON.stringify(Oinfo.OMSId)+"_"+ JSON.stringify(Oinfo.ClientId)+"_"+ JSON.stringify(Oinfo.Token);
    
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value==null){
        return{success:false, message:"OrderId doesn't exist, so can't delete"};
    }
    else{
        try{
            await redisclient.HDEL(hashName,`${key}`)
            return {success:true, message:"Order data deleted successfully"}
        }catch(err){
            return {success:false, message:"unable to delete Order"}
        }
    }

}

async function Oget(Oinfo){
    var key=Oinfo.OrderId;
    console.log(key);
    var hashName=JSON.stringify(Oinfo.TenantId)+ "_"+ JSON.stringify(Oinfo.OMSId)+"_"+ JSON.stringify(Oinfo.ClientId)+"_"+ JSON.stringify(Oinfo.Token);
   
    const value = await redisclient.HGET(hashName,`${key}`);
    console.log(value);
   
    if(value==null){
        return{success:false, message:"OrderId doesn't exist, so can't get data."};
    }
    else{
        try{
            var obj = JSON.parse(await redisclient.HGET(hashName,`${key}`))
            return obj;
        }catch(err){
            return {success:false, message:"unable to get order data."}
        }
    }
}

async function OgetAll(Oinfo){
    var hashName=JSON.stringify(Oinfo.TenantId)+ "_"+ JSON.stringify(Oinfo.OMSId)+"_"+ JSON.stringify(Oinfo.ClientId)+"_"+ JSON.stringify(Oinfo.Token);
    try{
      
    const values = await redisclient.HVALS(hashName);
    const jsonObjects = values.map(value => JSON.parse(value));
    return jsonObjects;
       
    }catch(err){
        return {success:false, message:"unable to get orders data."}
        }
}


async function ValidClient(Cinfo){
    var MsgType= Cinfo.MsgType;
    var OperationType=Cinfo.OperationType;

	if(!(MsgType===1120 || MsgType===1121)){
		response.send({message:"Invalid Message Type"});
        return;
	}
    if(MsgType===1120){
        return{success:false,message:"Wrong Endpoint!, Please try /OrderInfo"}
    }
    if(!(OperationType != 100 || OperationType !=101 || OperationType !=102 || OperationType != 103 || OperationType != 104 )){
        response.send({message:"Invalid Operation Type"});
        return;
    }
         
    switch(OperationType){
        case 100:
            return await Cadd(Cinfo);                    
        case 101:
            return await Cupdate(Cinfo);     
        case 102:
            return await Cremove(Cinfo);
        case 103:
            return await Cget(Cinfo);
        case 104:
            return await CgetAll(Cinfo);
    }      
}

async function ValidOrder(Oinfo){
    var MsgType = Oinfo.MsgType;
    var OperationType= Oinfo.OperationType;
    var OrderType= Oinfo.OrderType;
    var ClientId=Oinfo.ClientId;

    if(!(MsgType===1120 || MsgType===1121)){
        return{success:false,message:"Invalid Message Type"};
    }

    if(MsgType===1121){
        return{success:false,message:"Wrong Endpoint!, Please try /ClientInfo"}
    }

    if(!(OperationType != 100 || OperationType !=101 || OperationType !=102 || OperationType != 103 || OperationType != 104 )){
        return{success:false,message:"Invalid Operation Type"};
        
    }
    if(!(OrderType != 1 || OrderType != 2)){
        return{success:false,message:"Invalid Order Type"};
       
    }

    var hashName=JSON.stringify(Oinfo.TenantId)+ "_"+ JSON.stringify(Oinfo.OMSId);
   
   
    const value = await redisclient.HGET(hashName,`${ClientId}`);
    if(value){
        switch(OperationType){
            case 100:
                return await Oadd(Oinfo);                    
            case 101:
                return await Oupdate(Oinfo);     
            case 102:
                return await Oremove(Oinfo);
            case 103:
                return await Oget(Oinfo);
            case 104:
                return await OgetAll(Oinfo);
        }
    }
    else{
        return{success:false,message:"ClientId doesn't exist"}
    }

}


app
.post("/OrderInfo", async (request,response) =>{
    const Oinfo = request.body;
    const customResponse= await ValidOrder(Oinfo);

    response.json(customResponse);
    console.log(Oinfo);

})


.post("/Clientinfo", async (request, response) => {
    const Cinfo = request.body;
    const customResposne = await ValidClient(Cinfo);
   
    response.json(customResposne);
    console.log(Cinfo);
});



