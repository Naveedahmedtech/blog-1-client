import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../redux/features/postsApi';
import CardCustom from '../../components/card/CardCustom';
import LoadingIndicator from '../../components/loading/LoadingIndicator';

const Posts = () => {
    const param = useParams()
    const { post_id } = param;
    const { data: post, isLoading } = useGetPostByIdQuery({ post_id }) as any
    if (isLoading) {
        return <LoadingIndicator />
    }
    return (
        <>
            <CardCustom
                key={post?.data?.id}
                image={post?.data?.image}
                title={post?.data?.title}
                description={post?.data?.description}
                height='350'
                author={post?.data?.authorId?.username}
                tags={post?.data?.tags}
                category={post?.data?.categoryId?.name}
                page="detail"
            />
        </>
    )
}

export default Posts
