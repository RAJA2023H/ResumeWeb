import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import styles from './Blog.module.css';

export default function CreatePostModal({ isOpen, onClose, user, setError }) {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleAddPost = async () => {
    if (!user) {
      setError('You must be logged in to create a post');
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setError('Please enter a title and content for the post');
      return;
    }

    try {
      await addDoc(collection(db, 'Blog posts'), {
        title: newPostTitle,
        content: newPostContent,
        author: user.displayName || 'Anonymous',
        userId: user.uid,
        createdAt: new Date(),});
        // Reset form and close modal
        setNewPostTitle('');
        setNewPostContent('');
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
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Post Content"
          className={styles.textarea}
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