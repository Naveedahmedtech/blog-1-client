import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../redux/features/postsApi';
import CardCustom from '../../components/card/CardCustom';

const Posts = () => {
    const param = useParams()
    const { post_id } = param;
    const { data: post, isLoading, isError } = useGetPostByIdQuery({ post_id })
    if (isLoading) {
        return <h1>Loading....</h1>
    }
    return (
        <>
            <CardCustom
                key={post?.data?.id}
                image={post?.data?.image}
                title={post?.data?.title}
                description={post?.data?.description}
                height='350'
                author={post?.data?.author?.username}
                tags={post?.data?.tags}
                category={post?.data?.category?.name}
                page="detail"
            />
        </>
    )
}

export default Posts
