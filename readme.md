# DevVault

DevVault is a self-hosted file storage application for uploading, managing, and retrieving files through a web interface.

It has a TypeScript frontend and a Node.js/Express backend, with files stored locally and their metadata maintained separately.

This project started as a learning project and gradually grew into a practical application for learning backend architecture, API design, file handling, and frontend development.

---

## Features

### File Management

- Upload single or multiple files
- Download files
- Delete files
- Rename files
- View file metadata
- Select multiple files
- Bulk delete
- Bulk download
- Search files by name
- Filter files by extension
- Sort files by name, size, or upload date
- Pagination
- Real-time upload progress
- Upload speed monitoring
- Update the UI without unnecessary page reloads

### Frontend

- TypeScript
- Service-oriented architecture
- API abstraction layer
- Reusable dialog components
- Toast notification system
- Responsive interface
- Persistent search and sorting preferences
- Persistent theme preference

### Backend

- RESTful API
- Layered architecture
- Repository pattern
- Storage provider abstraction
- Centralized error handling
- Request validation
- Local filesystem storage
- JSON-based metadata
- Pagination, filtering, and sorting

---

## Architecture

The backend follows a layered architecture:

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

The frontend separates UI logic from API communication:

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

## Storage

Files are stored directly on the local filesystem.

File metadata is stored separately so the application does not need to scan the storage directory every time it needs information about a file.

Metadata includes information such as:

- File name
- File size
- MIME type
- Upload date
- Storage location

---

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Frontend

- TypeScript
- Vite
- Tailwind CSS

### File Handling

- Multer
- Node.js `fs`
- Node.js `path`

### Storage

- Local filesystem
- JSON metadata

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/XtremeRahul007/devvault.git
cd devvault
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Project Goals

DevVault is mainly a hands-on software engineering project.

The project focuses on learning and applying:

- Backend architecture
- REST API design
- File handling
- Repository and service patterns
- Frontend architecture
- API integration
- Error handling
- Validation
- Testing
- Local file storage
- LAN file sharing

---

## Roadmap

### v1

DevVault v1 is feature-complete.

The current version focuses on core file management, search, filtering, sorting, bulk operations, metadata management, and a responsive web interface.

### v2

Future development may happen in a separate branch or version rather than changing the original v1 implementation.

Possible future ideas include:

- Upload queue
- Drag-and-drop uploads
- Upload cancellation
- Authentication
- Authorization
- User accounts
- Dashboards
- Storage analytics
- Activity logs

These are ideas for future development and are not part of the current version.

---

## Contributing

Suggestions, feedback, and contributions are welcome.

Feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.
