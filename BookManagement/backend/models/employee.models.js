import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    mobileNumber: {
       type:String,
       required:true,
       unique:true
    },   
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee",employeeSchema);

export default Employee;