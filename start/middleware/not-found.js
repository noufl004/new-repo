const notFound=async(req,res,next)=>{


    res.status(404).send(`route not found`)

}

module.exports=notFound;