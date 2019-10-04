const homeController = (req,res) =>{
    res.status(200).json({
        success: 'true',
        message: 'Successful'
    })
}

module.exports={homeController}