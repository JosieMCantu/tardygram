fetch('/api/v1/auth/verify', {
    method: 'GET',
}) 
.then(res => {
    if (res.ok) return res.json();
    else throw new Error('Not Logged In!');
})
.then(json => renderLoggedIn(json))
.catch(() => {
    const root = document.getElementById('root');
    const button = document.createElement('button');
    button.addEventListener('click', () => {
        window.location.assign('/api/v1/auth/login');
    })
    button.textContent = "Log in with Github";
    root.appendChild(button);
})