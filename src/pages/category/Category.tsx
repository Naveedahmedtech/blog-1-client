import React from 'react'
import { useGetAllPostsByCategoriesQuery } from '../../redux/features/postsApi'
import { useParams } from 'react-router-dom'

const Category = () => {
    const param = useParams()
    const { category_id } = param
    const { data, isLoading, isError } = useGetAllPostsByCategoriesQuery({category_id})

    console.log(data)
  return (
    <div>Category</div>
  )
}

export default Category
