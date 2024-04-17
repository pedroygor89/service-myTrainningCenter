import { Athlete } from "./athletes.interface";
import mongoose, { Schema } from "mongoose";


export const athleteSchema = new mongoose.Schema<Athlete>({
    _id: { type: Schema.Types.ObjectId, required: false},
    name: { type: Schema.Types.String, required: true},
    email: { type:Schema.Types.String, unique: true},
    phone: { type:Schema.Types.String, unique: true},
    ranking: {type: Schema.Types.Number},
    positionRanking: {type: Schema.Types.Number},
    urlPhotoAthlete: {type: Schema.Types.String},
}, { timestamps: true, collection: 'athletes' });
