import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
});

UserSchema.pre('save', async function (next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    }
    catch(error : any){
        next(error);
    }
});

const User = model('User', UserSchema);

export default User;
