import express from "express";
import { db } from "../../firebase-config.js";
import { v4 as uuidv4 } from 'uuid';
import { getDoc, collection, updateDoc, doc, addDoc, arrayUnion, arrayRemove, setDoc, deleteDoc, getDocs } from "firebase/firestore";

const router = express.Router();

router.get("/getPackages/", async (req, res) => {

    const packages = [];
    const querySnapshot = await getDocs(collection(db, "packages"));
    querySnapshot.forEach((doc) => {
        packages.push(doc.data());
    });
    res.send(packages);
});

router.post("/addPackage/", async (req, res) => {
    const {title, likes, mineName, nearestTown, status, coordinateX, coordinateY,
        elavation, waterQuality, airQuality, production, boreHoles, username, email } = req.body;

    const uuid = uuidv4().toString();
    await setDoc(doc(db, "packages", `${uuid}`), {
        title: title,
        likes: likes,
        mineName: mineName,
        nearestTown: nearestTown,
        status: status,
        coordinateX: coordinateX,
        coordinateY: coordinateY,
        elavation: elavation,
        waterQuality: waterQuality,
        airQuality: airQuality,
        production: production,
        boreHoles: boreHoles,
        packagesId: uuid,
        username: username,
        email: email,
    }).then(() => {
        res.send({ 'added': true });
    });
});

export default router;

// http://10.199.39.26:5000/users/addUser