import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { blogService } from '../../services/blogService';
import { Card } from "../ui/Card";
import styles from './Blog.module.css';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => blogService.getPosts()
  });

  if (isLoading) {
    return (
      <div className={styles.blogContainer}>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.blogContainer}>
        <div className={styles.error}>
          Error loading posts: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogContainer}>
      <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Card 
            key={post.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.imageUrl && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
                {post.title}
              </h3>
              <div className={styles.author}>
                By {post.author || 'Anonymous'} • 
                {format(new Date(post.createdAt), ' MMM dd, yyyy')}
              </div>
              <div className={styles.postContent}>
                {post.excerpt || post.content.substring(0, 150)}...
              </div>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read More →
                </button>
                {post.commentCount && (
                  <span className="text-gray-500">
                    {post.commentCount} comments
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedPost && (
        <div className={styles.commentSection}>
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          <div className={styles.commentInput}>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Add a comment..."
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Post Comment
              </button>
            </div>
          </div>
          
          <div className={styles.loginPrompt}>
            Please <button className="text-blue-600">log in</button> to comment
          </div>
        </div>
      )}
    </div>
  );
}