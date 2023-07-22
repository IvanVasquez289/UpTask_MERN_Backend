const checkAuth = (req,res,next) => {
    console.log('Desde checkAuth.js')
    next()
}

export default checkAuth