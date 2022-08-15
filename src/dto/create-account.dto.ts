export class CreateAccountDto {
    uid: number|null;
    name: string;
    address: { street : string, zip : string };
    phone: string;
    picture: string;
    is_active: boolean;
    date_created: string;
}