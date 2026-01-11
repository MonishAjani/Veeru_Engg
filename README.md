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

- Fully responsive design that works on all devices (mobile, tablet, desktop)
- Dynamic content management through Django admin
- API integration between frontend and backend
- Modern UI with dark theme
- CORS proxy for local development
- Touch-optimized interfaces for mobile users
- Optimized layouts for different screen sizes and orientations

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

This project can be deployed in several ways:

### Vercel and Separate Backend

The frontend can be deployed on Vercel, with the backend deployed to various platforms (Heroku, Railway, etc.).

### Hostinger KVM 2 Plan (All-in-One Solution)

For an all-in-one solution, you can deploy both the frontend and backend on a Hostinger KVM 2 plan. We've provided comprehensive deployment resources:

- [HOSTINGER_README.md](./HOSTINGER_README.md): Quick overview of the deployment process
- [HOSTINGER_DEPLOYMENT_GUIDE.md](./HOSTINGER_DEPLOYMENT_GUIDE.md): Detailed step-by-step instructions
- [deploy-to-hostinger.sh](./deploy-to-hostinger.sh): Automated deployment script

The Hostinger KVM 2 plan provides sufficient resources to run both the Next.js frontend and Django backend on the same server, with Nginx as a reverse proxy.

### Comprehensive Deployment Plan

For a complete enterprise-grade deployment solution, we've created a comprehensive deployment plan:

- [COMPREHENSIVE_DEPLOYMENT_PLAN.md](./COMPREHENSIVE_DEPLOYMENT_PLAN.md): Detailed analysis of deployment requirements, code changes, hosting setup, configuration files, infrastructure dependencies, monitoring, and troubleshooting
- [deploy.sh](./deploy.sh): Full-featured deployment script that automates the entire process

This comprehensive plan covers all aspects of deploying the application to production, including:

- Detailed analysis of deployment requirements and constraints
- Necessary code changes for production
- Step-by-step hosting guide with environment setup
- Complete configuration files and deployment scripts
- Infrastructure dependencies and third-party services
- Monitoring and logging setup
- Troubleshooting common deployment issues

### CORS Configuration

When deploying to production, make sure to configure CORS properly on the backend server. The backend should allow requests from your frontend domain. This is configured in:

1. Django settings (`django_backend/django_backend/settings.py`)
2. `.htaccess` file for Apache servers
3. Environment variables (`CORS_ALLOWED_ORIGINS`)

See [CORS_HANDLING_GUIDE.md](./CORS_HANDLING_GUIDE.md) for more details.

## Responsive Design

This project features comprehensive responsive design that ensures optimal user experience across all devices and screen sizes. Key responsive features include:

- **Mobile-First Approach**: Designed to work perfectly on mobile devices and scale up to larger screens
- **Touch-Optimized Interfaces**: Larger touch targets and improved interactions for mobile users
- **Responsive Typography**: Text sizes that adjust based on screen size for optimal readability
- **Flexible Layouts**: Grid and flex layouts that adapt to different screen sizes
- **Optimized Images**: Images that scale properly while maintaining aspect ratios
- **Landscape Mode Support**: Special optimizations for landscape orientation on mobile devices

For detailed information on the responsive implementation and how to customize it, see [MOBILE_RESPONSIVE_GUIDE.md](./MOBILE_RESPONSIVE_GUIDE.md).

## License

MIT
