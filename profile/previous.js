import { collection, query, where, getDocs, getAuth, onAuthStateChanged, db } from '../firebase.js'


const auth = getAuth()
let user_email = document.getElementById('user-email')
let user_name = document.getElementById('profile-name')




let goBack = document.getElementById('goBack')
goBack.addEventListener('click', () => {
    window.location.href = './profile.html'
})


// let uid = null

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        let name = user.displayName;
        let email = user.email
        user_email.innerHTML = email
        user_name.innerHTML = name
        console.log(user);






        //showing allposts from current user start
        async function currentUserGeneralPosts(id) {
            try {
                const docRef = collection(db, "post");
                const q = query(docRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);


                const postsArray = [];
                querySnapshot.forEach((doc) => {
                    postsArray.push({ id: doc.id, ...doc.data() });
                });
                return postsArray;


            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }

        }






        const generalPosts = await currentUserGeneralPosts(uid);
        if (generalPosts.length == 0) {
            const previousPosts = document.getElementById('previousPosts');
            previousPosts.innerHTML = // Clear previous content
                ` <h1  class="card text-center border w-100">No post to show for general</h1>`
            console.log("no post");

        } else {
            const previousPosts = document.getElementById('previousPosts');
            let heading = document.getElementById('heading')
            previousPosts.innerHTML = ""; // Clear previous content
            generalPosts.forEach((post) => {
                const createdAt = post.createdAt.toDate().toLocaleString();
                heading.innerHTML = `
                <div class="container my-4">
                        <div class="card  border w-100" id="postCard">
                        <h3>General posts</h3>
                        </div>
                    </div>`
                previousPosts.innerHTML += `
                    <div class="container my-4">
                        <div class="card pt-4 border w-100" id="postCard">
                        <h3 class="fw-bold">${user.displayName}</h3>
                            <p>${user.email}</p>
                            <p>${createdAt}</p>
                            <input type="text" id="title" value="${post.Title}" readonly>
                            <textarea name="textarea" id="textarea" readonly>${post.description}</textarea>
                        </div>
                    </div>`;
            });
        }

        async function currentUserTravelingPosts(id) {
            try {
                const docRef = collection(db, "post");
                const q = query(docRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);


                const travelingArray = [];
                querySnapshot.forEach((doc) => {
                    travelingArray.push({ id: doc.id, ...doc.data() });
                });
                return travelingArray;


            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }

        }
        const travelingPost = await currentUserTravelingPosts(uid);
        if (travelingPost.length == 0) {
            const travelingPostShow = document.getElementById('travelingPostShow');
            travelingPostShow.innerHTML = // Clear previous content
                ` <h1  class="card text-center border w-100">No post to show for traveling</h1>`
            console.log("no post");

        } else {
            const travelingPostShow = document.getElementById('travelingPostShow');
            let heading2 = document.getElementById('heading2')
            travelingPostShow.innerHTML = ""; // Clear previous content
            travelingPost.forEach((post) => {
                const createdAt = post.createdAt.toDate().toLocaleString();
                heading2.innerHTML = `
                <div class="container my-4">
                        <div class="card  border w-100" id="postCard">
                        <h3>Traveling posts</h3>
                        </div>
                    </div>`
                travelingPostShow.innerHTML += `
                    <div class="container my-4">
                        <div class="card pt-4 border w-100" id="postCard">
                        <h3 class="fw-bold">${user.displayName}</h3>
                            <p>${user.email}</p>
                            <p>${createdAt}</p>
                            <input type="text" id="title" value="${post.Title}" readonly>
                            <textarea name="textarea" id="textarea" readonly>${post.description}</textarea>
                        </div>
                    </div>`;
            });
        }

        async function currentUserArtPosts(id) {
            try {
                const docRef = collection(db, "post");
                const q = query(docRef, where("id", "==", id));
                const querySnapshot = await getDocs(q);


                const travelingArray = [];
                querySnapshot.forEach((doc) => {
                    travelingArray.push({ id: doc.id, ...doc.data() });
                });
                return travelingArray;


            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }

        }
        const artPost = await currentUserArtPosts(uid);
        if (artPost.length == 0) {
            const artgPostShow = document.getElementById('artgPostShow');
            artgPostShow.innerHTML = // Clear previous content
                ` <h1  class="card text-center border w-100">No post to show for art</h1>`
            console.log("no post");

        } else {
            const artgPostShow = document.getElementById('artgPostShow');
            let heading3 = document.getElementById('heading3')
            artgPostShow.innerHTML = ""; // Clear previous content
           artPost.forEach((post) => {
                const createdAt = post.createdAt.toDate().toLocaleString();
                heading3.innerHTML = `
                <div class="container my-4">
                        <div class="card  border w-100" id="postCard">
                        <h3>Art posts</h3>
                        </div>
                    </div>`
                    artgPostShow.innerHTML += `
                    <div class="container my-4">
                        <div class="card pt-4 border w-100" id="postCard">
                        <h3 class="fw-bold">${user.displayName}</h3>
                            <p>${user.email}</p>
                            <p>${createdAt}</p>
                            <input type="text" id="title" value="${post.Title}" readonly>
                            <textarea name="textarea" id="textarea" readonly>${post.description}</textarea>
                        </div>
                    </div>`;
            });
        }


        //showing allposts from current user finish
    }
})



