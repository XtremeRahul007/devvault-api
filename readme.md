# DevVault

DevVault is a self-hosted file storage platform inspired by modern cloud storage services. It provides a RESTful backend and a lightweight TypeScript frontend for uploading, managing, and retrieving files while maintaining synchronized metadata.

The project is being built as a learning-focused, production-inspired application with emphasis on clean architecture, maintainability, and scalable software design rather than feature parity with existing cloud providers.

---

# Features

## Current Features

### File Management

* Upload single or multiple files
* Download files
* Delete files
* Rename files
* View file metadata
* Real-time upload progress tracking
* Upload speed monitoring
* Backend-driven success and error responses

### Frontend

* TypeScript-based frontend
* Service-oriented architecture
* API abstraction layer
* Reusable dialog components
* Toast notification system
* Responsive upload interface

### Backend

* RESTful API
* Layered architecture
* Repository pattern
* Storage provider abstraction
* Centralized error handling
* Local filesystem storage
* JSON metadata synchronization

---

# Planned Features

* Multi-file selection
* Bulk download
* Bulk delete
* Search and filtering
* Sorting by name, size, and upload date
* Drag-and-drop uploads
* Upload cancellation
* Upload queue management
* User authentication
* JWT authorization
* Role-based permissions
* Storage analytics
* Activity logs
* LAN file sharing
* Admin dashboard
* User dashboard

---

# Architecture

The backend follows a layered architecture to separate responsibilities and improve maintainability.

```text
Routes
   │
Controllers
   │
Services
   │
Repositories
   │
Storage Provider
   │
Local Filesystem
```

The frontend follows a similar separation of concerns.

```text
Components
   │
Services
   │
API Layer
   │
REST API
```

---

# Storage

Files are stored directly on the local filesystem.

Metadata is maintained separately to allow fast lookups without scanning the storage directory.

Current metadata includes information such as:

* File name
* File size
* MIME type
* Upload date
* Storage location

---

# Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript

## Frontend

* TypeScript
* Vite
* Tailwind CSS

## File Handling

* Multer
* Node.js File System (fs)
* Path

## Storage

* Local filesystem
* JSON metadata

---

# Installation

Clone the repository.

```bash
git clone https://github.com/your-username/devvault.git
cd devvault
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

---

# Project Goals

DevVault is primarily a software engineering project focused on building production-style architecture and practical development skills.

Goals include:

* Clean architecture
* Scalable project structure
* Maintainable codebase
* Real-world backend patterns
* Modern frontend architecture
* Self-hosted file management

---

# Roadmap

## Version 1

* File upload
* File download
* File deletion
* File rename
* Metadata management
* Upload progress tracking

## Version 2

* Bulk file operations
* Search
* Sorting
* Upload queue
* Drag-and-drop uploads

## Future

* Authentication
* Authorization
* User accounts
* Dashboards
* LAN sharing
* Analytics
* Activity logs

---

# Contributing

Contributions, ideas, and feedback are welcome.

Feel free to open issues or submit pull requests.

---

# License

This project is licensed under the MIT License.
