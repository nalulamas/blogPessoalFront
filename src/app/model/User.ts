import { Post } from "./Post";

export class User{
  public id:number;
  public name: string;
  public username: string;
  public picture: string;
  public password: string;
  public type: string;
  public post: Post[];
}
