import { Schema, model, mongoose } from "mongoose";

// CRM_ID, first name, last name,  preferred name, email, phone number, date started, volunteer type, last COI, date of last background check, last mission conversation, staff partner, tech needed

const VolunteerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            unique: false,
            default: "",
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            unique: false,
            default: "",
        },
        preferredName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            unique: false,
        },
        CRM_ID: {
            type: String,
            trim: true,
            unique: true,
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
            trim: true,
            unique: false,
            default: "",
        },
        techNeeded: {
            type: String,
            default: "",
        },
        notes: {
            type: String,
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


const Volunteer = mongoose.models.Volunteer || model("Volunteer", VolunteerSchema);

export default Volunteer;