const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { callDeepSeek } = require('../service/deepseek');

const users =[{"name":"ngash","email":"kubs@gmail.com","password":"1234"}]

const signup = (req,res)=>{
const {name, email, password} = req.body;
if(!name || !email || !password){
    return res.status(400).json({message: "All fields are required"});  
}

const userExists = users.find(user => user.email === email);
if(userExists){
    return res.status(400).json({message: "Email already exists"});
}
const hashedPassword = bcrypt.hashSync(password, 2);
users.push({name, email, password: hashedPassword});
res.status(201).json({message: "User created successfully", user: {name, email}});
}

const login = (req,res) => {

const {email,password}=req.body;
if(!email || !password){
    return res.status(400).json({message: "All fields are required"});
}
const user = users.find(user => user.email === email);
if(!user){
    return res.status(400).json({message: "user does not exist"}); 
}
const isPasswordValid = bcrypt.compareSync(password, user.password);
if(!isPasswordValid){
    return res.status(400).json({message: "Invalid email or password"});
}
const token = jwt.sign({name:user.name,email: user.email, name: user.name}, process.env.JWT_SECRET, {expiresIn: '1h'});
res.status(200).json({message: "Login successful", token});

}

const getMeal = async  (req,res)=>{
    const{mood}=req.body;
if(!mood){
    return res.status(400).json({message: "Mood is required"});
}
const prompt =  `
The user is feeling "${mood}" today. 
Suggest a suitable breakfast meal plan for this mood. 
Include  clear step-by-step preparation instructions.

`;

try {
    const mealPlan = await callDeepSeek(prompt);
    res.json({ mood, mealPlan });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meal plan", error: err.message });
  }


}



module.exports={signup,login,getMeal };
