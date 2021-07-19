const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require("jsonwebtoken");

// bcrypt.genSalt(10,(err,salt)=>{
//     if(err) return next(err);

//     bcrypt.hash('password123',salt,(err,hash)=>{
//         if(err) return next(err);
//         console.log(hash)
//     })
// })

// const secret = 'mysecretpassword';
// const secretSalt = 'kdfhkjsadhaskjdhas'

// const user = {
//     id:1,
//     token:MD5('jhdgakjsd').toString() + secretSalt
// };

// const recievedToken = 'b72bad1d95d19e5e163c681f1ca5dbaf'
// if(recievedToken === user.token){
//     console.log('move forward')
// }

// console.log(user)

const id = '1000';
const secret = 'mysecretpassword';

const recievedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.mlpPIBi-k_TjhM6dAHzapQSifcj8sE8GruCFKK4eJLE'


const token = jwt.sign(id,secret); //encoding
const decodeToken = jwt.verify(recievedToken,secret) //decoding

console.log(decodeToken )