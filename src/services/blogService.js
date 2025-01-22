import { collection, getDocs, getDoc, addDoc, doc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export const blogService = {
  // Get all posts with pagination
  async getPosts(page = 1, pageSize = 6) {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Get single post
  async getPost(id) {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  // Create new post (for admin)
  async createPost(postData) {
    const result = await addDoc(collection(db, "posts"), {
      ...postData,
      createdAt: new Date().toISOString()
    });
    return result.id;
  }
};