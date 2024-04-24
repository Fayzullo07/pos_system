import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        isActive: {
            type: Boolean,
            default: true
        },

    },
    {
        timestamps: true,
    }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
