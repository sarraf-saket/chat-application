import React, { useState, useEffect } from 'react';

const GroupChat = () => {
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch groups
    const fetchGroups = async () => {
      const res = await fetch('/api/groups');
      const data = await res.json();
      setGroups(data);
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    const res = await fetch('/api/groups/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGroupName, members: [] }),
    });
    const data = await res.json();
    setGroups([...groups, data]);
    setNewGroupName('');
  };

  const handleSendMessage = async () => {
    const res = await fetch('/api/groups/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: selectedGroup._id, content: newMessage }),
    });
    const data = await res.json();
    setMessages([...messages, data]);
    setNewMessage('');
  };

  const handleSelectGroup = async (group) => {
    setSelectedGroup(group);
    const res = await fetch(`/api/groups/messages/${group._id}`);
    const data = await res.json();
    setMessages(data);
  };

  return (
    <div>
      <h1>Group Chat</h1>
      <div>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
        />
        <button onClick={handleCreateGroup}>Create Group</button>
      </div>
      <div>
        <h2>Groups</h2>
        <ul>
          {groups.map((group) => (
            <li key={group._id} onClick={() => handleSelectGroup(group)}>
              {group.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedGroup && (
        <div>
          <h2>Messages in {selectedGroup.name}</h2>
          <ul>
            {messages.map((message) => (
              <li key={message._id}>
                <strong>{message.senderId.name}:</strong> {message.message}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="New Message"
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      )}
    </div>
  );
};

export default GroupChat;