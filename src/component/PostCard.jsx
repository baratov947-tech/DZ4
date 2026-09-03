import styles from './PostCard.module.css';

export default function PostCard({ post, onDelete }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{post.title}</h3>
                <span className={post.status ? styles.statusTrue : styles.statusFalse}>
          {post.status ? 'Status: Active (true)' : 'Status: Inactive (false)'}
        </span>
            </div>

            <p className={styles.body}>{post.body}</p>

            <button className={styles.deleteBtn} onClick={() => onDelete(post.id)}>
                Удалить
            </button>
        </div>
    );
}