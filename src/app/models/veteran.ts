import { IPhoto } from "./photos";
import { IRubrics } from "./rubrics";

export interface IVeteran {
    id:number;
    first_name: string;
    middle_name:string;
    last_name: string;
    birthday:string;
    birthday_place:string;
    photo:string;
    deathday:string;
    medals:any[];
    rank:string;
    description:string;
    war_id:string;
    military_rank:string;
    reward:any[];
    rubrics:IRubrics[];
    file_name: string;
}
