import { UserGroup } from 'app/modules/usergroups/models/usergroup.model';

export interface User {
    id: number;
    member_no: string;
    name: string;
    phone: string;
    email: string;
    gender: string;
    points: number;
    date_of_birth: string;
    avatar: string;
    email_verified_at: string;
    status: string;
    usergroups: UserGroup[];
}