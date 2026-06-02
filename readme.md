# DevVault

DevVault is a self-hosted cloud storage backend inspired by Google Drive. It allows users to store, organize, retrieve, and manage files on their own server while maintaining synchronized metadata for efficient file management.

The project is designed for developers, hobbyists, and organizations that want a private storage solution without relying on third-party cloud providers.

---

## Features

### Current Features

- File upload
- File download
- File deletion
- File rename/update
- Metadata synchronization
- Folder creation
- Folder deletion
- Folder hierarchy support
- REST API architecture
- Local filesystem storage
- JSON-based metadata management

### Planned Features

- User authentication and authorization
- JWT-based security
- Server-side rendered Admin Dashboard
- Server-side rendered User Dashboard
- User management system
- Activity and transaction logs
- Storage analytics
- LAN file sharing between connected devices
- Access permissions and role management
- Advanced search capabilities

---

## Architecture

DevVault stores files directly on the server's filesystem while maintaining metadata separately for quick access and management.

### Storage Structure

```text
storage/
├── user1/
│   ├── documents/
│   └── images/
│
├── user2/
│   ├── projects/
│   └── backups/
│
└── ...
```

### Metadata Structure

Metadata is currently stored using JSON files and synchronized with the actual filesystem.

This approach provides:

- Fast metadata retrieval
- Simple deployment
- Easy debugging
- No database dependency

---

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### File Handling

- Multer
- Node.js File System (fs)
- Path Module

### Metadata Storage

- JSON Files

### API

- REST API

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/devvault.git
cd devvault
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## Project Goals

DevVault aims to provide:

- Self-hosted storage
- Private file management
- Simple deployment
- Extensible architecture
- Local network file sharing
- Google Drive-like experience without cloud dependency

---

## Example Workflow

1. User uploads a file.
2. File is stored in the user's storage directory.
3. Metadata is generated and synchronized.
4. User can retrieve metadata without scanning the filesystem.
5. Files can be downloaded, renamed, moved, or deleted through the API.

---

## Future Admin Panel

The planned Admin Panel will provide:

- User management
- File monitoring
- Storage tracking
- Transaction logs
- Activity auditing
- Server overview

---

## Future User Dashboard

The planned User Dashboard will provide:

- File management interface
- Folder navigation
- Upload and download controls
- Account settings
- Storage usage statistics

---

## Security Roadmap

Planned security features include:

- JWT Authentication
- Access control
- Protected API routes
- Role-based permissions
- Audit logging

---

## Contributing

Contributions, suggestions, and feedback are welcome.

Feel free to fork the repository and submit pull requests.

---

## License

This project is licensed under the MIT License.