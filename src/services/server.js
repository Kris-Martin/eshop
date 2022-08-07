import firestore from "../firebase";
import products from "./products.js";

export const seedProducts = async () => {
    const collectionRef = firestore.collection("products");

    const data = await collectionRef.get();

    if (!data.empty) return;

    const promises = products.map(async (product) => {
        return await collectionRef.add(product);
    });

    await Promise.all(promises);
};

export const getProducts = async () => {
    const collectionRef = firestore.collection("products");

    const querySnap = await collectionRef.get();

    const documents = querySnap.docs;

    const data = documents.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });

    return data;
};

export const updateProduct = async (record, id) => {
    const collectionRef = firestore.collection("products");

    const docRef = collectionRef.doc(id);
    await docRef.update(record);
};

export const getCart = async () => {
    const collectionRef = firestore.collection("carts");

    const querySnap = await collectionRef.get();

    const documents = querySnap.docs;

    const data = documents.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });

    return data[0];
};

export const updateCart = async (record) => {
    const id = "uS1msJsj4jSiHpsuaM59";
    const collectionRef = firestore.collection("carts");

    const docRef = collectionRef.doc(id);
    await docRef.update(record);
};
