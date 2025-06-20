// apis
// =>
// posts     =>https://jsonplaceholder.typicode.com/posts
// albums    =>https://jsonplaceholder.typicode.com/albums
// comments  =>https://jsonplaceholder.typicode.com/comments

// 1.api called
// -fecth() method

// based point url
const BasedUrl = "https://jsonplaceholder.typicode.com/";

// endpoint url
const postsEndUrl = "posts";
const albumsEndUrl = "albums";
const commentsEndUrl = "comments";


const postsApi = BasedUrl + postsEndUrl;

function postsData() {
    fetch(postsApi).then((res) => {
        return res.json();
    }).then((data) => {
        var myPosts = "";
        console.log("final responce", data);
        data.forEach((post) => {
            myPosts += `<h3>Id : ${post.id}</h3>`;
            myPosts += `<h5>Id : ${post.title}</h5>`;
            myPosts += `<h6>Id : ${post.body}</h6> <hr>`;
            document.getElementById('posts').innerHTML = myPosts;
        });

    }).catch((error) => {
        console.log(error);
        document.getElementById('posts').innerHTML = `${error}`;
    });
}

function commentsData() {
    const commentsUrl = BasedUrl + commentsEndUrl;
    fetch(commentsUrl).then((res) => {
        return res.json();
    }).then((data) => {
        let commentData = data;
        console.log("commentData", commentData);

        var comments = "";
        commentData.forEach((comment) => {
            comments += `<div class="card m-2" style="width: 18rem;">
                                <div class="card-body">
                                    <h4 class="card-title">${comment.id}</h4>
                                    <h4 class="card-title">${comment.name}</h4>
                                    <h5 class="card-title">${comment.email}</h5>
                                    <h6 class="card-title">${comment.body}</h6>
                                </div>
                            </div>`
        })
        document.getElementById('comment').innerHTML = comments;
    })
}
postsData();
commentsData();