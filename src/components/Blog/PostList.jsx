import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import CommentSection from './CommentSection';
import styles from './Blog.module.css';
import { Timestamp } from 'firebase/firestore';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';


export default function PostList({ posts, user, setError }) {
  const handleDeletePost = async (postId) => {
    if (!user) {
      setError('You must be logged in to delete posts');
      return;
    }

    try {
      await deleteDoc(doc(db, 'Blog posts', postId));
    } catch (error) {
        console.error('Error deleting post', error);
        setError(`Failed to delete post: ${error.message}`);
    }
};
const renderPostContent = (contentJson) => {
  try {
    const contentState = convertFromRaw(JSON.parse(contentJson));
    const editorState = EditorState.createWithContent(contentState);
    return (
      <Editor 
        editorState={editorState} 
        readOnly={true} 
      />
    );
  } catch (error) {
    console.error('Error parsing post content', error);
    return <p>{contentJson}</p>; // Fallback to raw content
  }
};
return (
<div className={styles.postGrid}>
  {posts.map((post) => (
    <div key={post.id} className={styles.postCard}>
      <div className={styles.postHeader}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        {user && user.uid === post.userId && (
          <button 
          onClick={() => handleDeletePost(post.id)} 
          className={styles.deletePostButton}
          >
            Delete
          </button>
        )}
      </div>
      <div className={styles.postContent}>
            {renderPostContent(post.content)}
      </div>
      {post.images && post.images.length > 0 && (
        <div className={styles.postImages}>
          {post.images.map((imageUrl, index) => (
            <img
              key={index} 
              src={imageUrl} 
              alt={`Post image ${index + 1}`} 
              className={styles.postImage}
            />
          ))}
        </div>
      )}
      <p className={styles.postAuthor}>By {post.author}</p>
      <p className={styles.postDate}>
        Posted on: {
          post.createdAt instanceof Timestamp 
            ? post.createdAt.toDate().toLocaleString() 
            : (post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown Date')
        }
        </p>
        <CommentSection postId={post.id} user={user} setError={setError} />
      </div>
    ))}
  </div>
  );
}