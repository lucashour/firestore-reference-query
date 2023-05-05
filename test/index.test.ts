import admin from 'firebase-admin';
import { DocumentReference, getFirestore } from 'firebase-admin/firestore';

type User = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
  user: DocumentReference;
};

beforeAll(() => {
  admin.initializeApp({ projectId: 'demo-app-dev' });
});

it('queries post by user reference', async () => {
  const db = getFirestore();

  const postsRef = db.collection('posts');
  const usersRef = db.collection('users');

  const user: User = {
    id: Date.now().toString() ,
    name: 'Ash Ketchum',
  };

  await usersRef.doc(user.id).set(user);
  const userRef: DocumentReference = usersRef.doc(user.id);

  const post: Post = {
    id: Date.now().toString() ,
    title: 'My awesome post',
    user: userRef,
  };

  await postsRef.doc(post.id).set(post);

  const postById = await postsRef
    .doc(post.id)
    .get()
    .then((doc) => ({ id: doc.id, title: doc.data().title }));

  const postsByUserRef = await postsRef
    .where('user', '==', userRef)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return { id: doc.id, title: doc.data().title };
      });
    });

  expect(postsByUserRef).toContainEqual(postById);
});
