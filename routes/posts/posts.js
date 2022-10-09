import express from "express";
import { db } from "../../firebase-config.js";
import { v4 as uuidv4 } from 'uuid';
import { getDoc, collection, updateDoc, doc, addDoc, arrayUnion, arrayRemove, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

const router = express.Router();

router.get("/getAllPosts/", async (req, res) => {
    const posts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        posts.push(doc.data());
    });
    res.send(posts);
});

router.post("/addPost/", async (req, res) => {
    console.log("Here");
    const { post, email, tags, username } = req.body;

    const uuid = uuidv4().toString();
    const dateTime = new Date().toLocaleString().toString();
    await setDoc(doc(db, "posts", `${uuid}`), {
        message: post,
        email: email,
        postId: uuid,
        time: dateTime,
        username: username
    }).then(() => {
        res.send({ 'added': true });
    });

    const querySnapshot = await getDocs(collection(db, "tags"));
    const currTags = [];
    querySnapshot.forEach((doc) => {
        currTags.push(doc.id);
    });

    for (let i = 0; i < tags.length; i++) {
        const postRef = doc(db, "tags", `${tags[i]}`);
        if (currTags.includes(tags[i])) {
            await updateDoc(postRef, {
                posts: arrayUnion(uuid)
            });
        }
        else {
            await setDoc(postRef, {
                posts: arrayUnion(uuid)
            });
        }


    }
});

router.post("/getPostReplies/", async (req, res) => {
    const replies = [];
    const postId = req.body.postId;
    const querySnapshot = await getDocs(collection(db, "replies"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if (doc.data().reply === postId) {
            replies.push(doc.data());
        }
    });
    
    res.send(replies);
});

router.post("/addReply/", async (req, res) => {
    console.log("Here");
    const { reply, email, postId,username } = req.body;
    const uuid = uuidv4().toString();
    const dateTime = new Date().toLocaleString().toString();
    await setDoc(doc(db, "replies", `${uuid}`), {
        message: reply,
        email: email,
        postId: uuid,
        reply: postId,
        time: dateTime,
        username
    }).then(() => {
        res.send({ 'added': true });
    });
});

router.get("/like/", async (req, res) => {
    const { likerId, postId } = req.body;
    // const likerId = uuidv4().toString();
    // const postId = "19db0454-e99e-4d36-acd4-d248f10df327";
    const postsSnapshot = await getDocs(collection(db, "posts"));
    const postRef = doc(db, "posts", `${postId}`);
    var isPostLiked = false;
    var isPostIn = false;
    postsSnapshot.forEach(async (doc) => {
        if (doc.data().postId === postId) {
            if (doc.data().likes !== undefined) {
                for (const like of doc.data().likes) {
                    isPostIn = true;
                    console.log(like);
                    if (like === likerId) {
                        console.log("Here");
                        isPostLiked = true;
                        await updateDoc(postRef, {
                            likes: arrayRemove(likerId),
                        });
                        break;
                    }
                }
            }
        } else {
            isPostIn = true;
        }
    });

    if (!isPostLiked && isPostIn) {
        await updateDoc(postRef, {
            likes: arrayUnion(likerId),
        });
    }

    const repliesSnapshot = await getDocs(collection(db, "replies"));
    const replyRef = doc(db, "replies", `${postId}`);
    var isReplyLiked = false;
    var isReplyIn = false;
    repliesSnapshot.forEach(async (doc) => {
        if (doc.data().postId === postId) {
            for (const like in doc.data().likes) {
                isReplyIn = true;
                if (like === likerId) {
                    isReplyLiked = true;
                    await updateDoc(replyRef, {
                        likes: arrayRemove(likerId)
                    });
                    break;
                }
            }
        }
    });

    if (!isReplyLiked && isReplyIn) {
        await updateDoc(replyRef, {
            likes: arrayUnion(likerId),
        });
    }

    res.send({ 'success': true });
});

router.get("/getPostsWithTag/", async (req, res) => {
    const replies = [];
    // const tag = req.body.tag;
    const tag = "#FirstPost";
    const tagRef = doc(db, "tags", `${tag}`);
    const docSnap = await getDoc(tagRef);

    const posts = [];

    const val = docSnap.data().posts.length;
    for (let i = 0; i < val; i++) {
        const id = docSnap.data().posts[i].toString();
        const postRef = doc(db, "posts", `${id}`);
        const postSnap = await getDoc(postRef);
        posts.push(postSnap.data());
    }

    res.send(posts);
});

export default router;

// http://10.199.39.26:5000/posts/getAllPosts