# Wavenet Frontend

Modern, AI-driven telephony and communication platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-language Support**: Swedish (sv) and English (en)
- **Modern UI**: Glassmorphism, gradients, and smooth animations
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **3D Visualizations**: Interactive globe with Three.js
- **Analytics**: Charts and data visualization with Recharts
- **SEO Optimized**: Server-side rendering and metadata
- **Type Safe**: Full TypeScript coverage

## 📦 Tech Stack

- **Framework**: Next.js 14.2.10 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **3D Graphics**: Three.js, React Three Fiber
- **Charts**: Recharts
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Development

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts and providers
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── care/              # Wavenet Care product
│   ├── connect/           # Wavenet Connect product
│   ├── mobility/          # Wavenet Mobility product
│   ├── security/          # Security & ISO standards
│   ├── solutions/         # AI solutions pages
│   ├── support/           # Support pages
│   └── reseller/          # Reseller program
├── components/            # React components
│   ├── ui/               # UI component library
│   ├── globe-card.tsx    # 3D Globe component
│   ├── language-toggle.tsx
│   └── mobile-nav.tsx    # Mobile navigation
├── hooks/                 # Custom React hooks
│   └── use-language.tsx  # Language context and hook
├── lib/                   # Utility functions
│   ├── translations.ts   # i18n translations
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   └── logos/           # Partner logos
└── styles/              # Global styles
    └── globals.css      # Tailwind and custom CSS
```

## 🌍 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Manual Deployment

```bash
# Build the application
npm run build

# The output will be in the .next folder
# Deploy the entire project to your hosting provider
```

## 🎨 Customization

### Colors & Theme

Edit `app/globals.css` to customize the color scheme. The project uses CSS custom properties for theming.

### Translations

Add or modify translations in `lib/translations.ts`:

```typescript
export const translations = {
  sv: { /* Swedish translations */ },
  en: { /* English translations */ }
}
```

### Pages

Add new pages in the `app/` directory following Next.js App Router conventions.

## 📝 Environment Variables

No environment variables are required for basic functionality. All configuration is in `next.config.mjs`.

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration (using v4 @import in CSS)
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration

## 📄 License

Private - All rights reserved

## 🤝 Support

For support, email support@wavenet.se or visit our [Help Desk](/support/helpdesk).
