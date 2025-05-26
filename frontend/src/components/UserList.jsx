const UserList = ({ users, currentUser }) => {
  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      <div className="users">
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`user ${user.id === currentUser.id ? 'current-user' : ''}`}
          >
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="username">
              {user.username}
              {user.id === currentUser.id && ' (You)'}
            </span>
            <div className="online-indicator"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
