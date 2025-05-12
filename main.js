let username = document.getElementById("username");
let textarea = document.getElementById("message");
let btn = document.getElementById("btn");
let picUrl = document.getElementById("picUrl");
let imgSource = "https://tourismcaravan.com/storage/2407/conversions/tuwaiq_mountain_saudi_arabia_riyadh-single-page-fullScreenWithContent.webp";
let container = document.getElementById("container");


btn.addEventListener("click", () => {

    // check user condition
    if (username.value.length < 4 || textarea.value.length < 6) {
        alert(`username must be more than 4 and text more than 6`);
        return;
    }

    
    // check exist condition
    fetch('https://68219a0e259dad2655afc1ba.mockapi.io/project/post')
        .then(response => response.json())
        .then(users => {
            const uniqueUser = users.some(user => user.username === username.value);
            if (uniqueUser) {
                alert("This user already exists.");
                return;
            }


            // Step 3: If not, proceed to create the post
            fetch('https://68219a0e259dad2655afc1ba.mockapi.io/project/post', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username.value,
                        textarea: textarea.value,
                        img: imgSource
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    let postId = data.id;

                    let title = document.createElement("h3");
                    title.classList.add("title");
                    title.textContent = username.value;

                    let message = document.createElement("p");
                    message.classList.add("message");
                    message.textContent = textarea.value;

                    let img = document.createElement("img");
                    img.classList.add("image");
                    img.src = imgSource;
                    img.width = 200;

                    let del = document.createElement("button");
                    del.innerText = "delete";

                    container.appendChild(title);
                    container.appendChild(message);
                    container.appendChild(img);
                    container.appendChild(del);

                    del.addEventListener("click", () => {
                        fetch(`https://68219a0e259dad2655afc1ba.mockapi.io/project/post/${postId}`, {
                                method: 'DELETE',
                            })
                            .then(() => {
                                title.remove();
                                message.remove();
                                img.remove();
                                del.remove();
                            });
                    });
                });
        });
});