# Pre Legal Parser

A web application to assist users with pre-legal document preparation in the justice department, including generating legal documents from templates.

## Description

Pre Legal Parser is a full-stack web application built with **Next.js** and **Python FastAPI** that streamlines pre-legal workflows in the justice department. The application enables users to create, manage, and generate legal documents from customizable templates, reducing manual effort and improving accuracy in document preparation.

## Features

- **Template-Based Document Generation** - Create legal documents from predefined templates
- **Dynamic Form Input** - Fill in document fields through an intuitive form interface
- **Document Management** - Store, retrieve, and manage generated documents
- **User Authentication** - Secure access with user login and registration
- **PDF Export** - Download generated documents as PDF files
- **Responsive UI** - Modern, mobile-friendly interface built with Next.js
- **RESTful API** - FastAPI backend for scalable and performant data processing

## Tech Stack

| Layer     | Technology               |
|-----------|--------------------------|
| Frontend  | Next.js, React, Tailwind CSS |
| Backend   | Python, FastAPI          |
| Database  | TBD                      |
| Auth      | TBD                      |
| Deployment| TBD                      |

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.10 or higher)
- **pip** (Python package manager)
- **npm** or **yarn** (Node.js package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/pre-legal-parser.git
   cd pre-legal-parser
   ```

2. **Set up the backend**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the frontend**

   ```bash
   cd frontend
   npm install
   ```

4. **Run the development servers**

   Backend:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the application**

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Project Structure

```
pre-legal-parser/
├── frontend/             # Next.js frontend application
│   ├── app/              # App router pages
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions
│   └── public/           # Static assets
├── backend/              # Python FastAPI backend
│   ├── app/
│   │   ├── api/          # API route handlers
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   ├── templates/        # Document templates
│   └── requirements.txt  # Python dependencies
├── LICENSE
└── README.md
```

## API Endpoints (Planned)

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/api/auth/register`  | Register a new user        |
| POST   | `/api/auth/login`     | Authenticate a user        |
| GET    | `/api/documents`      | List all documents         |
| POST   | `/api/documents`      | Create a new document      |
| GET    | `/api/documents/{id}` | Get document details       |
| PUT    | `/api/documents/{id}` | Update a document          |
| DELETE | `/api/documents/{id}` | Delete a document          |
| POST   | `/api/generate`       | Generate document from template |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

**Author:** Maaz Ahmed
