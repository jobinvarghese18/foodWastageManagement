const bcryptjs  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Pg = require('../models/pg')
const pgContoller = {}


pgContoller.register = (req,res)=>{
   const body = req.body
   const pg = new Pg(body)
   bcryptjs.genSalt()
   .then((salt)=>{
       bcryptjs.hash(pg.password,salt)
       .then((encrypted)=>{
           pg.password = encrypted
           pg.save()
           .then((pg)=>{
               res.json(pg)
           })
           .catch((err)=>{
               res.json(err)
           })
       })
   })
   .catch((err)=>{
       res.json(err)
   })
}

pgContoller.login = (req,res)=>{
    const body = req.body
    Pg.findOne({email:body.email})
    .then((pg)=>{
            if(!pg){
                res.json({
                    errors:"Invalid email or password"
                })
            }
            bcryptjs.compare(body.password,pg.password)
            .then((match)=>{
                if(match){
                    const tokenData = {
                        _id:pg.id,
                        pgName:pg.pgName,
                        email:pg.email
                    }
                    const token = jwt.sign(tokenData,'jo123',{
                        expiresIn:"2d"
                    })
                    res.json({
                        token:`Bearer ${token}`
                    })
                }
                else{
                    res.json({
                        errors:"invalid email or password"
                    })
                }
            })
    })
}

module.exports = pgContoller