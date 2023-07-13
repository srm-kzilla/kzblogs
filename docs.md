# BACKEND DOCUMENTATION

## `Installation`
```sh
pip3 install -r requiements.txt

# Production
uvicorn main:app

# Development
uvicorn main:app --reload
```

## `Regular Endpoints (/blog/...)`

### GET `/all`

`Query Parameters:`
- page: int → defaults to 0, page number
- count: int → number of blogs to return per page, defaults to 0

`Returns:`
- 200: list of blogs
- 500 Internal Server Error

### GET `/article/{slug}`

`Path Parameters:`
- slug: str → slug of the blog

`Returns:`
- 200: JSON of the blog
- 404: Blog not found
- 500: Internal Server Error

### POST `/like/{slug}`

`Path Parameters:`
- slug: str → slug of the blog

`Returns:`
- 200: JSON of the blog
- 404: Blog not found
- 500: Internal Server Error

## `Admin Endpoints (/admin/...)`

### GET `/blog/all`

`Query Parameters:`
- page: int → defaults to 0, page number
- count: int → number of blogs to return per page, defaults to 0
- showall: bool → defaults to true, would return all the blog irrespective of publishing status

`Returns:`
- 200: list of blogs
- 500 Internal Server Error

### POST `/add/blog`

`Body:`
```json
{
  "blog_title": "string",
  "blog_body": "string",
  "blog_entry_img": "string",
  "author": "string",
  "category": [
    "string"
  ],
  "blog_publish_status": true
}```


`Returns:`
- 200: 
```json
{
    "status": true, 
    "message": "Blog added successfully!", 
    "id": "Database ID of the blog"
}
```
- 500: Internal Server Error

