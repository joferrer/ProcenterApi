const express = require('express');
const router = express.Router();
const { db } = require('../../firebase/providerFirestore');
const admin = require("firebase-admin");


router.post('/registro', async (req, res) => {

    console.log(req.body)
    const user ={
        email: req.body.email,
        password: req.body.password
    }
   const userResponse = await  admin.auth().createUser({

    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false

   });
   res.json(userResponse)
});
module.exports = router;