require("dotenv").config();
const Customer = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {GenderEnum, RoleId} = require("../commons/enums/common.enums");

exports.customerSignup = async (req, res)=>{
    const {firstName, email, password} = req.body;
    console.log(req.body);

    try{
        const customer = await Customer.findOne({"email":email}).catch((error)=>{
            throw "Error while fetching customer from database"
        });

        if(customer){
            return res.status(400).json({
                "message":`Customer with this email ${email} already exists.`
            })
        }
        
        const ciperPassword = await bcrypt.hash(password, 5);
        const newCustomer = await Customer.create({
            firstName: firstName,
            lastName:req.lastName,
            email:email,
            password: ciperPassword,
            contact:req.body.contact,
            address:req.body.address,
            gender:req.body.gender,
            roleId:RoleId.USER
        }).catch((error)=>{
            console.log(error);
            throw "Error while saving new customer in database"
        })

        const token = jwt.sign({email: newCustomer.email, roleId:RoleId.USER}, process.env.__KEY,  {
            expiresIn: "1h",
          });

        return res.status(201).json({customer: newCustomer, token: token})
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error while customer Signup"
        })
    }
}

exports.customerLogin = async (req, res)=>{
    const {email, password} = req.body;

    try{
        const customer  = await Customer.findOne({email:email});
        if(!customer){
            return res.status(404).json({message:"customer's not registered. Please signUp."})
        }

        
        const passwordMatch = await bcrypt.compare(password, customer.password);
        if(!passwordMatch){
            return res.status(404).json({message:"Invalid Passoword"});
        }

        if(customer.roleId === RoleId.ADMIN){
            const token = jwt.sign({email:customer.email}, process.env.__KEY,{
                    expiresIn:"1hr",
                })

            return res.status(201).json({
                roleId:RoleId.ADMIN, token:token
            })    
        }
        
        const userId = customer._id;
        
        const token = jwt.sign({email: customer.email, userId:userId}, process.env.__KEY,  {
            expiresIn: "2h",
          });
        
        res.status(201).json({ userId: userId,roleId:RoleId.USER, token: token})        
    }
    catch(error){
        res.sendStatus(500).json({
            messsage:"Error while customer login"
        })
    }

}
exports.createCustomer=(req, res)=>{
    try{
        const {username, firstname, lastname, users} = req.body;
        console.log(req.body);
        if(!username || !firstname || !lastname) 
        return res.statusCode(500).json({
            "message":"Error in code"
        });
        let newUser= {
                username,
                firstname,
                lastname, 
                id: users.length
        }

        return  res.status(201).json({
            message:"User created sucessfully."
      
        })
    }
    catch(err){
        res.status(500).json({
            message:"some error occured",
        })
    }
}

exports.updateCustomer = async (req, res)=>{
      try{
        const customer = await Customer.findById(req.id).catch(()=>{
            throw "Error while checking wheather customer exists or not."
        })
        if(!customer){
            return res.status(404).json({
                message:"customer do not exists"
            })
        }
        
        customer.firstName = req.firstName;
        customer.email = req.email;
        customer.contact = req.contact;

        await Customer.findByIdAndUpdate(req.id, {firstName:customer.firstName}, {email:customer.email}, {contact:customer.contact}).catch((error)=>{
            throw "Error while saving the updated data of customer"
        })
      }
      catch(error){
        return res.status(500).json({
            message:"Error while updating customer data"
        })
      }

}
exports.getAllCustomers = async (req, res)=>{
    
    try{
        const customerData = await Customer.find().catch((error)=>{
            throw "Error while fetching all customer data"
     })

     if(!customerData){
         return res.status(404).json({
             message:"Customer Data is empty"})
     }

     return res.status(200).json({
        message:"Query Executed successfully"
     }, customerData)
    }
    catch(error){
        res.status(500).json({
            message:"Error while fetching all customers"
        })
    }
}

exports.deleteCustomer = async (req, res)=>{

    try{

    const{id} = req.body;
    const customer = await Customer.findById(id).catch((error)=>{
        console.log(error);
        throw error
    })

    if(!customer){
        return res.status(404).json({message:"Customer not found"})
    }

    await Customer.findByIdAndDelete(id).catch((error)=>{
        console.log(error);
        throw error
    })

    return res.status(200).json({message:"user deleted successfully"})
    }
    catch(error){
        res.status(500).json({message:"Error while deleting customer"})
    }
 }

   