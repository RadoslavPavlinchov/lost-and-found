import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateLostOrFound: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }

}, { timestamps: true });

export default mongoose.model("Item", ItemSchema);