import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isAdmin: {
        type: Boolean,
        default: false, // Set the default value to false
    },
    scores: {
        french: {
            easy: {
                type: Number,
                default: 0, // Default score for easy level in French
            },
            medium: {
                type: Number,
                default: 0, // Default score for medium level in French
            },
            hard: {
                type: Number,
                default: 0, // Default score for hard level in French
            },
        },
        russia: {
            easy: {
                type: Number,
                default: 0, // Default score for easy level in Russian
            },
            medium: {
                type: Number,
                default: 0, // Default score for medium level in Russian
            },
            hard: {
                type: Number,
                default: 0, // Default score for hard level in Russian
            },
        },
        italian: {
            easy: {
                type: Number,
                default: 0, // Default score for easy level in French
            },
            medium: {
                type: Number,
                default: 0, // Default score for medium level in French
            },
            hard: {
                type: Number,
                default: 0, // Default score for hard level in French
            },
        },
        spanish: {
            easy: {
                type: Number,
                default: 0, // Default score for easy level in French
            },
            medium: {
                type: Number,
                default: 0, // Default score for medium level in French
            },
            hard: {
                type: Number,
                default: 0, // Default score for hard level in French
            },
        },
        german: {
            easy: {
                type: Number,
                default: 0, // Default score for easy level in French
            },
            medium: {
                type: Number,
                default: 0, // Default score for medium level in French
            },
            hard: {
                type: Number,
                default: 0, // Default score for hard level in French
            },
        },
        dutch: {
            easy: {
                type: Number,
                default: 0, // Default score for easy level in French
            },
            medium: {
                type: Number,
                default: 0, // Default score for medium level in French
            },
            hard: {
                type: Number,
                default: 0, // Default score for hard level in French
            },
        },
    },
});
    


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;