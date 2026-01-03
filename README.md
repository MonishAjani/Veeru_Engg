# InfraCorp

A modern web application for an industrial fabrication and engineering company, showcasing services, projects, and certifications.

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React

### Backend
- Django 5.2
- Django REST Framework
- SQLite (development) / PostgreSQL (production)

## Features

- Responsive design that works on all devices
- Dynamic content management through Django admin
- API integration between frontend and backend
- Modern UI with dark theme
- CORS proxy for local development

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/infra-corp.git
cd infra-corp
```

2. Install frontend dependencies
```bash
npm install
```

3. Set up backend
```bash
cd django_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

### Development

1. Start the backend server
```bash
cd django_backend
python manage.py runserver
```

2. Start the frontend development server
```bash
# In another terminal, from the project root
npm run dev
```

```bash
# In another terminal, from the project root
npm run dev
```

The application is configured to connect directly to the local Django backend running on port 8000. Make sure your Django backend is running before starting the frontend. For more information, see [CORS_HANDLING_GUIDE.md](./CORS_HANDLING_GUIDE.md).

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for deployment on Vercel (frontend) and can be deployed to various platforms for the backend (Heroku, Railway, etc.).

### CORS Configuration

When deploying to production, make sure to configure CORS properly on the backend server. The backend should allow requests from your frontend domain. This is configured in:

1. Django settings (`django_backend/django_backend/settings.py`)
2. `.htaccess` file for Apache servers
3. Environment variables (`CORS_ALLOWED_ORIGINS`)

See [CORS_PROXY_SETUP.md](./CORS_PROXY_SETUP.md) for more details.

## License

MIT
