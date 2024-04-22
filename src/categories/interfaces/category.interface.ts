import { Document } from 'mongoose';
import { Athlete } from '../../athletes/interfaces/athletes.interface';


export interface Category extends Document {
    readonly category: string;
    description: string;
    events: Array<Event>;
    athletes: Array<Athlete>;
}

export interface Event {

    name: string;
    description: string;
    operation: string;
    date: Date;
    location: string;
    value: number;
}