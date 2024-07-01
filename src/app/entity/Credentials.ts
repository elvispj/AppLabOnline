export class Credentials{
    public username!: string;
    public password!: string;
}

export interface ChangePass{
    username:string;
    password:string;
    passwordnew:string;
    passwordnewconfirm:string;
}