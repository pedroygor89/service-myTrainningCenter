import { Athlete } from "./athletes.interface";
import mongoose, { Schema } from "mongoose";
import { timestamp } from "rxjs";
import { Collection } from "mongoose";

export const athleteSchema = new mongoose.Schema<Athlete>({
    name: { type: string, required: true},
    email: { type:string, unique: true},
    phone: { type:string, unique: true},
    ranking: {type: number, required: true},
    positionRanking: {type:number},
    urlPhotoAthlete: {type:string},
}, timestamp: true, Collection: 'athletes')