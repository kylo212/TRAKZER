document.getElementById('postBtn').addEventListener('click', function () {
    const postContent = document.getElementById('postInput').value;
    
    if (postContent.trim() === "") {
        alert("Post content cannot be empty");
        return;
    }
    
    const postContainer = document.getElementById('postContainer');
    
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    
    postElement.innerHTML = `
        <h3>Anonymous</h3>
        <p>${postContent}</p>
        <div class="actions">
            <i class="fas fa-thumbs-up" onclick="likePost(this)"> Like</i>
            <i class="fas fa-comment" onclick="commentPost(this)"> Comment</i>
            <i class="fas fa-share" onclick="sharePost(this)"> Share</i>
        </div>
    `;
    
    postContainer.prepend(postElement);
    document.getElementById('postInput').value = "";
});

function likePost(icon) {
    icon.classList.toggle('liked');
    
    if (icon.classList.contains('liked')) {
        icon.innerHTML = " Liked";
    } else {
        icon.innerHTML = " Like";
    }
}

function commentPost(icon) {
    const post = icon.closest('.post');
    let commentInput = post.querySelector('.comment-input');
    
    if (!commentInput) {
        commentInput = document.createElement('textarea');
        commentInput.classList.add('comment-input');
        commentInput.placeholder = "Write a comment...";
        post.appendChild(commentInput);
        
        const commentButton = document.createElement('button');
        commentButton.innerText = "Post Comment";
        commentButton.onclick = function () {
            const comment = commentInput.value;
            if (comment.trim()) {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerText = comment;
                post.appendChild(commentDiv);
                commentInput.value = '';
            }
        };
        
        post.appendChild(commentButton);
    } else {
        commentInput.focus();
    }
}

function sharePost(icon) {
    alert("Post shared!");
}
