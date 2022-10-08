import express from "express";
import { db } from "../../firebase-config.js";
import { getDoc, collection, updateDoc, doc, addDoc, arrayUnion, arrayRemove, setDoc, deleteDoc, getDocs } from "firebase/firestore";

const router = express.Router();

router.post("/addUser/", async (req, res) => {
    const { email, username } = req.body;
    await setDoc(doc(db, "users", `${email}`), {
        email: email,
        username: username,
    }).then(() => {
        res.send({ 'added': true });
    });
});

export default router;

// http://10.199.39.26:5000/users/addUser