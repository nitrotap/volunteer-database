import mongoose from "mongoose";

// personifyID, first name, last name,  pvc email, phone number, date started, volunteer type, last COI, date of last background check, last mission conversation, staff partner

const VolunteerSchema = mongoose.Schema(
    {
        personifyId: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
            trim: true,
            unique: true,
            default: "",
        },
        firstName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
            trim: true,
            unique: false,
            default: "",
        },
        lastName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
            trim: true,
            unique: false,
            default: "",
        },
        pvcEmail: {
            type: String,
            minlength: 1,
            maxlength: 50,
            trim: true,
            unique: true,
            default: "",
        },
        phone: {
            type: String,
            minlength: 1,
            maxlength: 15,
            trim: true,
            unique: false,
            default: "",
        },
        dateStarted: {
            type: Date,
            trim: true,
            default: "",
        },
        volunteerType: {
            type: Array
        },
        lastCOI: {
            type: Date,
            trim: true,
            default: "",
        },
        lastBackgroundCheck: {
            type: Date,
            trim: true,
            default: "",
        },
        lastMissionConversation: {
            type: Date,
            trim: true,
            default: "",
        },
        staffPartner: {
            type: String,
            minlength: 1,
            maxlength: 50,
            trim: true,
            unique: false,
            default: "",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);


const Volunteer = mongoose.model("Volunteer", VolunteerSchema);

export default Volunteer;