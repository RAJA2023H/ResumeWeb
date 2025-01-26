import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, isAdmin  } from '../../firebase';
import styles from './Blog.module.css';
import RichTextEditor from './RichTextEditor';
import ImageUploader from './ImageUploader';


export default function CreatePostModal({ isOpen, onClose, user, setError }) {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = (url) => {
    setImageUrls([...imageUrls, url]);
  };

  const handleAddPost = async () => {
    if (!isAdmin(user)) {
      setError('Only admin can create posts');
      onClose();
      return;
    }


    if (!newPostTitle.trim() || !postContent) {
      setError('Please enter a title and content for the post');
      return;
    }

    try {
      await addDoc(collection(db, 'Blog posts'), {
        title: newPostTitle,
        content: postContent,
        images: imageUrls,
        author: user.displayName || 'Anonymous',
        userId: user.uid,
        createdAt: Timestamp.now(),
      });

        setNewPostTitle('');
        setPostContent('');
        setImageUrls([]);
        onClose();
        setError(null);
    } catch (error) {
        console.error('Error adding post', error);
        setError(`Failed to add post: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Create New Post</h2>
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="Post Title"
          className={styles.input}
        />
        <RichTextEditor 
          onChange={setPostContent} 
        />
        <ImageUploader 
          onImageUpload={handleImageUpload} 
        />
        <div className={styles.modalButtons}>
          <button onClick={handleAddPost} className={styles.addPostButton}>
            Add Post
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}