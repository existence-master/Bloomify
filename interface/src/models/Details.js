import mongoose from "mongoose";

const { Schema } = mongoose;

const userdetails = new Schema(
    {
        username:{
            type: String,
            required: true
        },
        university:{
            type: String,
            required:true
        },
    },
    {timestamps:true}
);

const Details = mongoose.models.Details || mongoose.model("Details",userdetails);
export default Details;
