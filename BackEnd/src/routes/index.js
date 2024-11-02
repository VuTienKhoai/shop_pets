import users from "./userLogin"
import auth from "./auth"

const initRoutes = (app) =>{

    app.use('/api/v1/users' ,users)
    app.use('/api/v1/users' ,auth)
    
    return app.use('/', (req, res) =>{
        return res.send('error url')
    })
}

module.exports = initRoutes