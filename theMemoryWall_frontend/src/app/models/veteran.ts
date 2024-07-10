import { IPhoto } from "./photos";
import { IRubrics } from "./rubrics";

export interface IVeteran {
    id:number;
    first_name: string;
    middle_name:string;
    last_name: string;
    birthday:string;
    photos:IPhoto[];
    deathday:string;
    description:string;
    war_id:string;
    rubrics:IRubrics[];
    file_name: string;
}
