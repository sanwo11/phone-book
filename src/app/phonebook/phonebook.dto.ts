import { PhoneBookController } from "./phonebook.controller";


export interface QueryEntities{
    readonly page : number
    readonly perpage: number
    readonly search?: string
    readonly from?: string
    readonly to?: string
}
