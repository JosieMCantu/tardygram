
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


    button.textContent = "Post";
    nameHeader.textContent = user.userName;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
//Make a route to post to
//Make a post request w content from text area
    });
    form.append(text, button)
    root.append(nameHeader, form)
};