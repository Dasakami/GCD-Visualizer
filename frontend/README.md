# GCD Visualizer - Production Frontend

A stunning, production-ready React application for visualizing Euclid's Algorithm (Greatest Common Divisor) with beautiful animations, comprehensive authentication, and full backend integration.

![GCD Visualizer](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.x-purple)

## Features

- **Stunning Visualizations**: Interactive, animated visualizations of Euclid's Algorithm using Framer Motion
- **Full Authentication**: Secure JWT-based authentication with automatic token refresh
- **History Management**: Save and replay previous calculations
- **Theory Section**: Educational content about the algorithm, complexity, and applications
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Playback Controls**: Adjustable speed (0.5x, 1x, 2x) for step-by-step visualization
- **Production Ready**: Docker support, nginx configuration, comprehensive tests

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v6
- **Testing**: Vitest + React Testing Library
- **Markdown**: react-markdown

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── client.ts              # Axios instance with refresh token logic
│   ├── components/
│   │   ├── AuthForm.tsx           # Login/Register form with validation
│   │   ├── GcdVisualizer.tsx      # Main visualization component
│   │   ├── HistoryCard.tsx        # History item display
│   │   ├── Layout.tsx             # App layout with navigation
│   │   └── SpeedControl.tsx       # Playback speed selector
│   ├── hooks/
│   │   ├── useAuth.ts             # Authentication hook
│   │   └── useGcd.ts              # GCD calculation and history hook
│   ├── pages/
│   │   ├── Home.tsx               # Landing page
│   │   ├── Login.tsx              # Auth page
│   │   ├── Calculate.tsx          # Main calculation page
│   │   ├── History.tsx            # Calculation history
│   │   ├── Theory.tsx             # Educational content
│   │   ├── Profile.tsx            # User profile
│   │   └── NotFound.tsx           # 404 page
│   ├── routes/
│   │   ├── AppRouter.tsx          # Route definitions
│   │   └── ProtectedRoute.tsx    # Auth guard
│   ├── store/
│   │   ├── authStore.ts           # Auth state management
│   │   └── uiStore.ts             # UI preferences
│   ├── tests/                     # Unit and integration tests
│   ├── types/
│   │   └── index.ts               # TypeScript definitions
│   ├── App.tsx                    # Root component
│   └── main.tsx                   # Entry point
├── Dockerfile                     # Multi-stage Docker build
├── nginx.conf                     # Production nginx config
├── docker-compose.yml             # Full stack orchestration
└── vitest.config.ts              # Test configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (FastAPI expected on port 8000)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI

## Authentication Architecture

### Token Storage Strategy

The app uses a **hybrid storage approach** for maximum security and usability:

- **Access Token**: Stored in `sessionStorage` (memory + session persistence)
  - Cleared when browser tab closes
  - Available for restoration within same session
  - Not vulnerable to XSS across tabs

- **Refresh Token**: Expected as httpOnly cookie (backend responsibility)
  - Not accessible to JavaScript
  - Automatically sent with refresh requests
  - Maximum XSS protection

### Axios Interceptor Flow

```typescript
Request → Add Authorization header (Bearer token)
         ↓
Response (401) → Queue request
         ↓
Refresh token → POST /auth/refresh (with httpOnly cookie)
         ↓
Success → Update sessionStorage
         ↓
Replay queued requests with new token
         ↓
Failure → Clear auth & redirect to /login
```

**Key Features**:
- Single refresh request for multiple concurrent 401s
- Request queue to prevent race conditions
- Automatic token injection on all authenticated requests
- Graceful fallback when refresh fails

### Backend Integration Notes

The frontend expects the following from your backend:

1. **Refresh Token Cookie**: The backend should set an httpOnly cookie named `refresh_token` on login/register
2. **Refresh Endpoint**: `POST /auth/refresh` should accept the httpOnly cookie and return a new `access_token`
3. **If backend doesn't support refresh cookies**: The app will redirect to login on 401. You can modify `src/api/client.ts` to implement a different refresh strategy.

## API Contract

The frontend expects the following endpoints:

### Authentication

- `POST /auth/register`
  - Body: `{ email: string, password: string }`
  - Response: `{ access_token: string, token_type: string }`

- `POST /auth/login`
  - Body: `{ email: string, password: string }`
  - Response: `{ access_token: string, token_type: string }`

- `POST /auth/refresh`
  - Uses httpOnly `refresh_token` cookie
  - Response: `{ access_token: string, token_type: string }`

### GCD Operations

- `POST /gcd/calculate` (requires auth)
  - Body: `{ a: number, b: number }`
  - Response: `{ result: number, steps: GcdStep[], a: number, b: number }`

- `GET /gcd/history` (requires auth)
  - Response: `HistoryItem[]`

- `GET /gcd/history/{id}` (requires auth)
  - Response: `HistoryItem`

- `DELETE /gcd/history/{id}` (requires auth)

### Theory Content (optional)

- `GET /theory/euclid`
- `GET /theory/complexity`
- `GET /theory/applications`

## Docker Deployment

### Build Docker Image

```bash
docker build -t gcd-visualizer-frontend .
```

### Run Container

```bash
docker run -p 3000:80 -e VITE_API_URL=http://your-backend:8000 gcd-visualizer-frontend
```

### Docker Compose (Full Stack)

```bash
docker-compose up
```

This will start:
- Frontend (port 3000)
- Backend (port 8000)
- PostgreSQL database

**Note**: Update `docker-compose.yml` with your actual backend image and database credentials.

## Testing

### Run All Tests

```bash
npm test
```

### Test Coverage

The project includes tests for:
1. **AuthForm Component**: Form rendering, validation, mode switching
2. **useAuth Hook**: Login, register, logout, token management
3. **GcdVisualizer**: Step navigation, animations, completion state
4. **HistoryCard**: Display, interactions, delete functionality
5. **authStore**: State management, persistence, initialization

### Writing New Tests

Tests are located in `src/tests/`. Follow the existing patterns:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Design Philosophy

### Non-Standard, Expressive Design

The app uses a **cosmic/bionic theme** with:
- Dark gradient backgrounds (slate → purple → slate)
- Neon accents (cyan, purple, pink)
- Smooth Framer Motion animations
- Deep shadows and glassmorphism
- Rounded, modern UI elements

This creates a **sophisticated, impressive** appearance that elevates the simple GCD algorithm into something visually compelling.

### Animation Principles

- **Circle Morphing**: Numbers visualized as circles that morph during division
- **Smooth Transitions**: 0.3-0.5s spring animations for natural feel
- **Progressive Disclosure**: Information reveals as needed
- **Celebration Effects**: Special animations on completion
- **Hover States**: All interactive elements respond to hover

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Code splitting via React Router
- Lazy loading for route components
- Optimized Tailwind CSS (PurgeCSS in production)
- Gzip compression via nginx
- Static asset caching (1 year)
- React.memo for expensive components

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on all interactive elements
- Screen reader friendly

## Contributing

1. Create a feature branch
2. Make changes with tests
3. Ensure `npm run build` succeeds
4. Submit PR with description

## Troubleshooting

### "401 Unauthorized" on every request

- Ensure backend is running and accessible
- Check `VITE_API_URL` in `.env`
- Verify backend sets `refresh_token` httpOnly cookie
- Check browser DevTools → Network → Cookies

### Animations not smooth

- Enable hardware acceleration in browser
- Check CPU usage (close other apps)
- Reduce playback speed if needed

### Build fails

- Clear `node_modules`: `rm -rf node_modules && npm install`
- Check Node version: `node -v` (should be 18+)
- Run `npm run typecheck` for type errors

### Docker build fails

- Ensure `.dockerignore` excludes `node_modules`
- Check available disk space
- Try `docker build --no-cache`

## Production Checklist

- [ ] Update API URL in `.env` to production backend
- [ ] Enable CORS on backend for your frontend domain
- [ ] Set secure httpOnly cookies with `SameSite=Strict`
- [ ] Configure HTTPS on nginx (add SSL certificate)
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Enable analytics (if needed)
- [ ] Run security audit: `npm audit`
- [ ] Test on multiple browsers/devices
- [ ] Set up CI/CD pipeline
- [ ] Configure CDN for static assets (optional)

## License

MIT License - see LICENSE file for details

## Architecture Documentation

### Why Axios Interceptors?

Axios interceptors provide a **centralized, declarative** way to handle authentication:
- Single source of truth for token injection
- Automatic retry on token expiration
- Queue management for concurrent requests
- Separation of concerns (auth logic isolated from components)

Alternative approaches (manually adding headers in each request) would be **error-prone and repetitive**.

### Why sessionStorage for Access Tokens?

Trade-offs considered:

| Storage | Security | Persistence | Use Case |
|---------|----------|-------------|----------|
| Memory only | High | Tab only | Maximum security, poor UX |
| sessionStorage | Medium-High | Session only | **Balanced** (our choice) |
| localStorage | Medium | Permanent | Convenient, XSS risk |

**Decision**: sessionStorage provides reasonable security (cleared on tab close) while allowing session restoration (refresh page without re-login).

### Why Zustand over Redux?

- **Simplicity**: Less boilerplate, easier to understand
- **Performance**: Minimal re-renders, subscription-based
- **Bundle Size**: ~1KB vs 10KB+ for Redux
- **TypeScript**: Excellent type inference

For this app's complexity level, Zustand is the optimal choice. Consider Redux Toolkit for larger apps with complex state interactions.

### Fallback Strategy (No Refresh Token)

If your backend doesn't support httpOnly refresh cookies, the app will:
1. Detect 401 on refresh endpoint
2. Clear auth state
3. Redirect to `/login` with friendly message

**To implement custom refresh logic**:
Edit `src/api/client.ts` lines 45-80. Example for refresh token in response body:

```typescript
const refreshToken = sessionStorage.getItem('refresh_token');
const response = await axios.post(`${API_URL}/auth/refresh`, {
  refresh_token: refreshToken
});
```

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with React, TypeScript, and Framer Motion by [Your Team]**
