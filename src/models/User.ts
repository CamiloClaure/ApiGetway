import {PostResponse} from "./PostResponse";

export class User {
    id: number | null = null;
    name: string | null = null;
    username: string | null = null;
    email: string | null = null;
    posts?: Array<PostResponse>
}