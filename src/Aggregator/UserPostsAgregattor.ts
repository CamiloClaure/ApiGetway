import {makeHttpRequest} from "../Services/RequestHelper";
import {User} from "../models/User";
import {Post} from "../models/Post";
import {cleanObject} from "../util/commons";
import {PostResponse} from "../models/PostResponse";

export const userPostsAggregator = async () => {
    let dataUsers = await makeHttpRequest<Array<User>>("https://jsonplaceholder.typicode.com/users")
    let dataPosts = await makeHttpRequest<Array<Post>>("https://jsonplaceholder.typicode.com/posts")
    dataUsers = cleanObject(dataUsers, User)
    dataUsers.forEach((user: User, index: number) => {
        dataUsers[index].posts = cleanObject<Post, PostResponse>(dataPosts.filter(value => value.userId == user.id), PostResponse)
    })
    return dataUsers
}

