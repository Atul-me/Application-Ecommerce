import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    slug:{//used for seo --using blackspaces
        type: String,
        lowercase: true
    }
});

export default mongoose.model("Category", categorySchema);