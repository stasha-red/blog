export interface Article {
  id: string
  title: string
  content: string
  imageUrl: string
  publishedAt: string
  comments: Array<{
    id: string
    author: string
    content: string
    publishedAt: string
  }>
}

export interface Role {
  id: number
  name: string
}

export interface User {
  id: string
  login: string
  roleId: number
  registeredAt: string
}

export interface ApiResponse<T>{
  data?: T
  error?: string
}
