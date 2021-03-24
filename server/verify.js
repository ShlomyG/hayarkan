const jwt = require("jsonwebtoken")

const verifyUser = (req, res, next) => {
    // has token
    if (req.header("Authorization")) {
        // if token valid
        jwt.verify(req.header("Authorization"), "Sg007", (err, user)=>{
            if(err){
                res.status(403).json({ error: true, msg: "token not valid" })
            }else{
                req.user = user
                next()
            }
        })
    } else {
        res.status(401).json({ error: true, msg: "token expected" })
    }
}

const verifyAdmin = (req, res, next) => {
        // has token
        if (req.header("Authorization")) {
            // if token valid
            jwt.verify(req.header("Authorization"), "Sg007", (err, user)=>{
                if(err){
                    res.status(403).json({ error: true, msg: "token not valid" })
                }else{
                    console.log(user)
                    // is admin?
                    if(user.admin ){
                        req.user = user 
                        next()
                    }else{
                        res.status(403).json({ error: true, msg: "your still not an admin, try next year" })
                    }
                }
            })
        } else {
            res.status(401).json({ error: true, msg: "token expected" })
        }
}

module.exports = {
    verifyAdmin,
    verifyUser
}