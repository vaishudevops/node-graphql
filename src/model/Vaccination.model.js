

const {Schema , model} = require ("mongoose");

const VaccinationSchema = new Schema ({
    PatientName :{
        type : Schema.Types.String,

    },
     DOB :{
        type: Schema.Types.String,

     },
     BrandName:{
         type : Schema.Types.String,
        
     },
     Vaccination :{
         type : Schema.Types.String,
     },
     GivenAt : {
         type : Schema.Types.String,
     }
})


const VaccinationModel = model("Vaccination" , VaccinationSchema);

module.exports = VaccinationModel;