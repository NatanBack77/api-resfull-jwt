const router= require('express').Router()
const User = require('../models/User')
const bcrypt = require("bcrypt");

router.post('/register', async(req,res)=>{
    const { name , email , password , confirmpassword}= req.body
    if(!name ){
      return  res.status(422).json({msg:"name é obrigatório"})
    }
    if(!email ){
        return  res.status(422).json({msg:"email é obrigatório"})
      }
    if(!password ){
        return  res.status(422).json({msg:"password é obrigatório"})
      }
     if(password !== confirmpassword){
        return  res.status(422).json({msg:"As senhas não conferem "})
      }
      const userExists= User.findOne({email : email })
      if(userExists){
        return  res.status(422).json({msg:"Usuário existe"})
      }
    
      const salt = await bcrypt.genSalt(12)
      const passwordHash= await bcrypt.hash(password, salt)
       const user= new User({
        name,
        email,
        password: passwordHash
       })
        
      try {
        const users= await User.save(user)
        res.status(201).json({msg:"usuário criado com sucesso"})
      } catch (error) {
        console.log(error)
      }
})

module.exports= router