document.addEventListener('DOMContentLoaded', () => {
    const userId = new URLSearchParams(window.location.search).get('id');
  
    // Fetch profile data
    fetch(`/get-profile?id=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          document.getElementById('username').textContent = data.username;
        } else {
          alert('Error fetching profile details');
        }
      })
      .catch(error => console.error('Error:', error));
  
    // Update username
    document.getElementById('updateUsernameForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const newUsername = document.getElementById('newUsername').value;
  
      fetch(`/update-username?id=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUsername }),
      })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.error('Error:', error));
    });
  
    // Update password
    document.getElementById('updatePasswordForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const currentPassword = document.getElementById('currentPassword').value;
      const newPassword = document.getElementById('newPassword').value;
  
      fetch(`/update-password?id=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.error('Error:', error));
    });
  });
  