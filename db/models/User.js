import { Schema, model, mongoose } from 'mongoose';
import { hash, compare } from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 12;
        this.password = await hash(this.password, saltRounds);
    }

    next();
});

// set up pre-findOneAndUpdate middleware to update password
// userSchema.pre('findOneAndUpdate', async function (next) {
//     const userUpdate = await this.model.findOne(this.getQuery());
//     // console.log(userUpdate);

//     if (update.password) {
//         const saltRounds = 12;
//         update.password = await hash(this.getUpdate().password, saltRounds);
//         this.setUpdate(update);
//     }

//     next();
// });

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return await compare(password, this.password);
};

const User = mongoose.models.User || model('User', userSchema);

export default User;
