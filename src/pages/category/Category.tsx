import { Box } from '@mui/material'
import { useGetAllPostsByCategoriesQuery } from '../../redux/features/postsApi'
import { useParams, useSearchParams } from 'react-router-dom'
import TextComponent from '../../components/text/TextComponent'
import LinkComponent from '../../components/text/LinkComponent'
import CardCustom from '../../components/card/CardCustom'

const Category = () => {
  const param = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryName = searchParams.get('category_name')
  const { category_id } = param
  const { data: posts, isLoading, isError } = useGetAllPostsByCategoriesQuery({ category_id })

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <Box sx={{ my: 4 }}>
      <TextComponent gutterBottom variant="h4">Showing Posts "{categoryName}"</TextComponent>
      {
        posts?.data?.length === 0 &&
        <TextComponent gutterBottom variant="body1" color="red" textAlign="center">No result found "{categoryName}"</TextComponent>
      }
      {
        posts?.data?.map((post: any) => (
          <Box className='flex-container' key={post?.id} my={5}>
            <LinkComponent className='flex-grow' to={`/posts/${post?.id}`}>
              <CardCustom
                key={post?.id}
                image={post?.image}
                title={post?.title}
                description={post?.description}
                height='350'
                author={post?.author?.username}
                tags={post?.tags}
                category={post?.category?.name}
              />
            </LinkComponent>
          </Box>
        ))
      }
    </Box>
  )
}

export default Category
