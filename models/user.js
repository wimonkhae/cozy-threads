import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    cusId: {
        type: String,
        unique: [true, 'Customer ID already exists'],
        required: [true, 'Customer ID is required'],
    }
})

//model object provided by mongoose.
// check if User model exists in DB, if not create new model
//becase this route gets call everytiem connection gets establish 
// from scratch so it need addtional check
const User = models.User || model("User", UserSchema);

export default User;

