import { PhoneBookController } from "./phonebook.controller";

export interface CreatePhoneBookDto{
    readonly name : string
    readonly email: string
    readonly phone: string
}

interface phone {
    phone: number[]
}

export interface UpdatePhoneBookDTO extends CreatePhoneBookDto{
    readonly id: number
}