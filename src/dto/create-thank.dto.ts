export class CreateThankDto {
    uid: number;
    tid: number|null;
    thank_to: number;
    description: string;
    date_created: Date|string|null;
}