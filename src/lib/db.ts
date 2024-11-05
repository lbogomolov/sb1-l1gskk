import { openDB } from 'idb';

const dbName = 'galleryDB';
const storeName = 'gallery';

export const initDB = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    },
  });
  return db;
};

export const getAllItems = async () => {
  const db = await initDB();
  return db.getAll(storeName);
};

export const addItem = async (item: any) => {
  const db = await initDB();
  return db.add(storeName, item);
};

export const deleteItem = async (id: string) => {
  const db = await initDB();
  return db.delete(storeName, id);
};