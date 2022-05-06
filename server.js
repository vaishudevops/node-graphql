const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const { v4 } = require("uuid");
require("./src/db")
const PatientModel = require("./src/model/Patient.model");
const VaccinationModel = require("./src/model/Vaccination.model");
const path = require('path')


const app = express();



app.use(cors());

const patients = [
    {PatientName: "John", DOB: "03-2-2000", Gender: "female" ,BloodGroup : "A+", Weight:"31" , Height:"132"},
    
]
const Vaccinations = [
    {PatientName : "John" , DOB : "03-02-2000" ,BrandName : "covaccine" , GivenAt:"NIIMS", Vaccination : "Dose1"}
]

const schema = buildSchema(`
    type Query {
        hello : String!
        patients: [Patient!]!
        patient : Patient!
        vaccinations : [Vaccination!]!
        vaccination : Vaccination!
    }


    type Mutation {
        createPatient(data : CreatePatientInput) : Patient!
        createVaccine(data: CreateVaccineInput) : Vaccination!
    }
    
    input SerachPatientInput {
        name : String
    }
    input CreatePatientInput {
        PatientName : String!
        DOB : String!
        Gender : String!
        BloodGroup : String!
        Height: String!
        Weight: String!
    }
    input CreateVaccineInput {
      PatientName : String!
      DOB : String!
      BrandName : String!
      Vaccination: String!
      GivenAt : String!
    }
    type Patient {
        PatientName : String!
        DOB : String!
        Gender : String!
        BloodGroup : String!
        Height: String!
        Weight: String!
    }
    type Vaccination {
     PatientName : String!
      DOB : String!
      BrandName : String!
      Vaccination: String!
      GivenAt : String!
    }
`)

const rootValue = {
    hello: () => "World",
    patients: () => PatientModel.find(),
    vaccinations : () => VaccinationModel.find(),
    createPatient: async (args) => {
        try{
            const newPatient = new PatientModel(args.data)
            const createdPatient = await newPatient.save()
            return {createdPatient}
        }catch(error) {
            throw new Error(error)
        }
    },

   createVaccine : async (args) =>{
       try{
           const newVaccine = new VaccinationModel(args.data);
           console.log(newVaccine)
           const createdVaccine = await newVaccine.save()
           console.log(createdVaccine)
           return {createdVaccine}
       }catch(error){
           throw new Error(error)
       }
   },

     PatientName: async(args) =>{
                const{PatientName} = args.search
              const foundPatient = await PatientModel.findOne({PatientName})
                  console.log(foundPatient)
                 return foundPatient;
                 
           },


    vaccines : async() =>{
        try{
            const vaccines = VaccinationModel.find();
            return vaccines ;

        }catch(error){
            throw new Error(error)
        }
    }
        
    }

        // createVaccine : async ({data}) =>{
        //     try{
        //         const newVaccine = new VaccinationModel(args.data);
        //         console.log(newVaccine);
        //         const createdVaccine = await newVaccine.save()
        //         return createdVaccine;
    
        //      }catch(error){
        //          throw new Error(error)
        //      }
        //     },

        //      PatientName: async(data) =>{
        //         const{PatientName} = args.search
        //       const foundPatient = await PatientModel.findOne({PatientName})
        
        //         return foundPatient;
            
        // const { PatientName ,DOB , Gender, BloodGroup,Height,Weight } = args.data;
        // //console.log(email, username, password);
        // const newPatient = {
        //     PatientName, DOB, Gender ,BloodGroup ,Height,  Weight
        // }
        // patients.push(newPatient);
        // console.log(newPatient)
        // return newPatient;
             
        
            
         






    // Patient: args => {
    //     const { name } = args.search
    //     console.log(name);
    //     if(name){
    //         const foundUser = patient.find(Patient => Patient.PatientName.toLowerCase().includes(name.toLowerCase()))
    //         if(foundUser){
    //             return foundUser
    //         }
    //         throw new Error("Unable to find user for - " + name)
    //     }
    //     throw new Error("Name filed is missing")
    // }


app.use("/gq", graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.get('/', (req, res) =>{
    res.send("Sucess")
});

const PORT = process.env.PORT || 9090

app.listen(PORT, () => console.log("Server started at PORT : 9090"))