const updateForm = document.getElementById('update-settings');

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    const response = await fetch('/api/update-settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            username: newUsername,
            password: newPassword,
        }),
    });

    const result = await response.json();

    if (response.status === 200) {
        alert(result.message);
    } else {
        alert(result.message || 'Failed to update settings');
    }
});
