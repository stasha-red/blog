import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Article } from '@/types'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const currentPage = ref(1)
  const totalPage = ref(1)
  const searchQuery = ref('')

  const fetchArticles = async (args? : { page?: number, search?: string }) => {
    const { page, search } = args || {}

    const isNewSearch = search !== undefined && search !== searchQuery.value

    if (isNewSearch) {
      currentPage.value = 1
      searchQuery.value = search
    } else {
      currentPage.value = page || currentPage.value
    }

    try {
      const response = await fetch(
        `/api/posts?search=${searchQuery.value}&limit=9&page=${currentPage.value}`,
      )
      if (!response.ok) {
        throw new Error('Posts request error')
      }

      const { data } = await response.json()
      articles.value = data.posts
      totalPage.value = data.lastPage
    } catch (error) {
      console.error(error)
    }
  }

  return { articles, currentPage, totalPage, fetchArticles }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}
