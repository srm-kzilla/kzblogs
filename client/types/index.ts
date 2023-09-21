export interface Comments{
    authorId:string
    content:string
}

export interface Blog{
    id:number
    title:string
    publishStatus:string
    lastEdited:string
    author:string
    likes:number
    comments ?:Comments[]
    content:string
}

export interface User{
    id:number
    name:string
    username:string
    avatar:string
    bookmarks:Blog[]
    googleId:string
    isAdmin:boolean
}