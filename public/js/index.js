

// on page load, make a get request to verify endpoint to verify cookie
fetch('/api/v1/auth/verify', {
    method: 'GET',
})
    .then(res => {
        // if the status is 200, parse into JSON and pass along, if not throw new error
        if (res.ok) return res.json();
        else throw new Error('Not Logged In!');
    })
    // take user info and render on screen with form
    .then(json => {
        renderLoggedIn(json)
        renderPosts()
    })
    .catch(() => {
        const button = document.createElement('button');
        button.textContent = 'Login with GitHub';
        button.addEventListener('click', () => {
            window.location.assign('/api/v1/auth/login');
        });

        document.getElementById('root').appendChild(button);
    })

const renderLoggedIn = (user) => {
    const root = document.getElementById('root');
    const nameHeader = document.createElement('h1');
    const form = document.createElement('form');
    const text = document.createElement('textarea');
    const button = document.createElement('button');
    const photoUrl = document.createElement('input');
    const tags = document.createElement('input');
    photoUrl.setAttribute('type', text);
    tags.setAttribute('type', text);
    photoUrl.setAttribute('placeholder', 'photo link');
    tags.setAttribute('placeholder', 'tags');
    text.setAttribute('placeholder', 'Add caption');

    button.textContent = "Post";
    nameHeader.textContent = user.userName;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('/api/v1/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                caption: text.value,
                photoUrl: photoUrl.value,
                tags: tags.value.split(',')
            })
        })
            .then(res => res.json())
            .then(console.log)
    });
    form.append(text, photoUrl, tags, button)
    root.prepend(nameHeader, form)
};
const renderPosts = () => {
    const ul = document.getElementById('list');

    fetch('/api/v1/post', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            result.map(post => {
                const postDiv = document.createElement('div');
                const caption = document.createElement('p');
                const tags = document.createElement('p');
                const photoUrl = document.createElement('img');

                tags.textContent = post.tags;
                caption.textContent = post.caption;
                photoUrl.src = post.photoUrl;

                
                ul.append(postDiv);
                postDiv.append(caption, tags, photoUrl);
            })
        })
}
