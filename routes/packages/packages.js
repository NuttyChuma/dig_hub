import express from "express";
import { db } from "../../firebase-config.js";
import { getDoc, collection, updateDoc, doc, addDoc, arrayUnion, arrayRemove, setDoc, deleteDoc, getDocs } from "firebase/firestore";

const router = express.Router();

router.post("/addPackage/", async (req, res) => {
    const { mineName, nearestTown, status, coordinateX, coordinateY, 
        elavation, waterQuality, airQuality, production, boreHoles } = req.body;
    await setDoc(doc(db, "users", `${email}`), {
        mineName: mineName,
        nearestTown: nearestTown,
        status: status,
        coordinateX: coordinateX,
        coordinateY: coordinateY,
        elavation: elavation,
        waterQuality: waterQuality,
        airQuality: airQuality,
        production: production,
        elavation: elavation,
    }).then(() => {
        res.send({ 'added': true });
    });
});

export default router;

// http://10.199.39.26:5000/users/addUser