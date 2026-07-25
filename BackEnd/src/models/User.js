import mongoose from "mongoose"

const Schema = mongoose.Schema

//task schema for db
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: [true, "username is taken"],
            match: [
                /^[a-zA-Z0-9._]{4,20}$/,
                "Username is invalid. It can only contain 4-20 alphanumeric characters, periods, and underscores.",
            ],
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: { type: String, default: null },
    },
    { timestamps: true },
)
//task model for db
const User = mongoose.model("User", userSchema)

export default User
