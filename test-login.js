fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'temp_12345678', password: 'password123' })
})
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(console.log)
    .catch(console.error);
