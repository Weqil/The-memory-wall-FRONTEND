import { IRubrics } from "./rubrics";

export interface IVeteran {
    id:number;
    name: string;
    middle_name:string;
    last_name: string;
    birthday:string;
    deathday:string;
    description:string;
    war_id:string;
    rubrics:IRubrics[];
}