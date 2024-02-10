import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to add content to the database
export const putDb = async (content) => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  await store.add({ content });
  console.log('Content added to the database');
};

// Logic to get all content from the database
export const getDb = async () => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const allContent = await store.getAll();
  console.log('All content retrieved from the database');
  return allContent;
};

// Initialize the database
initdb();
