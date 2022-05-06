const {Schema , model} = require ("mongoose");

const PatientSchema = new Schema ({
    PatientName :{
        type: Schema.Types.String,
        required : true
    },
     DOB :{
        type: Schema.Types.Date,
        required : true 
     },
     BloodGroup :{
         type : Schema.Types.String,
        
     },
     Height :{
         type : Schema.Types.Number,
     },
     Weight : {
         type : Schema.Types.Number,
     }
})


const PatientModel = model("Patient" , PatientSchema);

module.exports = PatientModel;