import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import styles from './PostList.module.css';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then((res) => res.json())
            .then((data) => {
                const rawPosts = data.posts || [];
                const halfLength = Math.ceil(rawPosts.length / 2);

                // Добавляем ключ status: у первой половины true, у остальной false
                const modifiedPosts = rawPosts.map((post, index) => ({
                    ...post,
                    status: index < halfLength
                }));

                setPosts(modifiedPosts);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Ошибка при загрузке постов:', error);
                setIsLoading(false);
            });
    }, []);

    // Локальное удаление через .filter()
    const handleDelete = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    };

    if (isLoading) {
        return <div className={styles.loader}>Загрузка постов...</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Список постов ({posts.length})</h2>

            {posts.length === 0 ? (
                <p className={styles.empty}>Список постов пуст</p>
            ) : (
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}