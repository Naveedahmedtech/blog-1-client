import TrendingPosts from './components/TrendingPosts'
import LatestPosts from './components/LatestPosts'
import { useGetAllPostsQuery } from '../../redux/features/postsApi'

const Home = () => {
  // fetch latest posts 
  const { data: posts, isLoading, isError, error } = useGetAllPostsQuery({});


  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <TrendingPosts />
      <LatestPosts posts={posts} />
    </>
  )
}

export default Home
