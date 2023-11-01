const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin1', password: 'adminpassword', role: 'admin' },
  ];

  module.exports = {
    findByUsername: (username) => {
      return users.find((user) => user.username === username);
    },
  };