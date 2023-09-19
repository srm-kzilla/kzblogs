export interface Comments{
    author_id:string
    content:string
}

export interface Blog{
    id:number
    title:string
    publish_status:string
    last_edited:string
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
    google_id:string
    is_admin:boolean
}
