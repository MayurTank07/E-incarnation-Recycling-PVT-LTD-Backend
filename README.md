# E-Incarnation Backend API

Professional admin panel backend for E-Incarnation website with full CRUD operations.

## Features

- ✅ JWT Authentication
- ✅ Contact Form Management
- ✅ Real-time Hero Stats Management
- ✅ Client Logos CRUD
- ✅ Testimonials CRUD
- ✅ Services CRUD
- ✅ Events CRUD
- ✅ Footer Management
- ✅ Secure & Scalable Architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the following variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong secret key for JWT
- `PORT` - Server port (default: 5000)

### 3. Create Admin User

```bash
node scripts/createAdmin.js
```

Default credentials:
- Email: `admin@eincarnation.com`
- Password: `admin123`

**⚠️ Change password after first login!**

### 4. Start Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile (Protected)
- `PUT /api/auth/password` - Update password (Protected)

### Contact Forms
- `POST /api/contact-forms` - Create submission (Public)
- `GET /api/contact-forms` - Get all submissions (Admin)
- `GET /api/contact-forms/:id` - Get single submission (Admin)
- `PUT /api/contact-forms/:id` - Update status (Admin)
- `DELETE /api/contact-forms/:id` - Delete submission (Admin)

### Hero Stats
- `GET /api/hero-stats` - Get stats (Public)
- `PUT /api/hero-stats` - Update stats (Admin)

### Clients
- `GET /api/clients` - Get all clients (Public)
- `POST /api/clients` - Create client (Admin)
- `GET /api/clients/:id` - Get single client (Public)
- `PUT /api/clients/:id` - Update client (Admin)
- `DELETE /api/clients/:id` - Delete client (Admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials (Public)
- `POST /api/testimonials` - Create testimonial (Admin)
- `GET /api/testimonials/:id` - Get single testimonial (Public)
- `PUT /api/testimonials/:id` - Update testimonial (Admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin)

### Services
- `GET /api/services` - Get all services (Public)
- `POST /api/services` - Create service (Admin)
- `GET /api/services/:id` - Get single service (Public)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Events
- `GET /api/events` - Get all events (Public)
- `POST /api/events` - Create event (Admin)
- `GET /api/events/:id` - Get single event (Public)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)

### Footer
- `GET /api/footer` - Get footer data (Public)
- `PUT /api/footer` - Update footer (Admin)

## Authentication

Protected routes require JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Project Structure

```
Eincarnation-backend/
├── config/
│   ├── database.js
│   └── constants.js
├── controllers/
│   ├── authController.js
│   ├── contactFormController.js
│   ├── heroStatsController.js
│   ├── clientController.js
│   ├── testimonialController.js
│   ├── serviceController.js
│   ├── eventController.js
│   └── footerController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── Admin.js
│   ├── ContactForm.js
│   ├── HeroStats.js
│   ├── Client.js
│   ├── Testimonial.js
│   ├── Service.js
│   ├── Event.js
│   └── Footer.js
├── routes/
│   ├── authRoutes.js
│   ├── contactFormRoutes.js
│   ├── heroStatsRoutes.js
│   ├── clientRoutes.js
│   ├── testimonialRoutes.js
│   ├── serviceRoutes.js
│   ├── eventRoutes.js
│   └── footerRoutes.js
├── scripts/
│   └── createAdmin.js
├── utils/
│   ├── asyncHandler.js
│   └── generateToken.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Security Best Practices

- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- Admin-only routes protected with middleware
- Input validation on all endpoints
- CORS enabled for frontend integration
- Error handling middleware

## License

Copyright © 2026 E-Incarnation Recycling Pvt. Ltd.
# E-incarnation-Recycling-PVT-LTD-Backend
