# Project Planning & Setup

## Overview
This file provides complete information as required by Phase 1.

## Technology Stack
- **Frontend Framework**: SvelteKit 2+ with Svelte 5 and TypeScript
- **UI Kit**: TailwindCSS with DaisyUI, mdsvex for writing articles
- **Code Quality**: ESLint, Prettier
- **Testing**: Vitest 3.0 with Storybook 8.3+ integration
- **Documentation**: MDSvex, Storybook 8+ with Visual Tests
- **Hosting**: Firebase Hosting with node adapter
- **Backend Services**: Firebase (Auth, Firestore, Storage, Functions, Data Connect, Analytics)

## Project Flow

### Phase 1: Project Planning & Setup - DETAILED BREAKDOWN

#### Requirements Gathering & Architecture Design

**1. Executive Summary**

**1.1 Product Vision Statement**
Create an innovative personal portfolio blog web app for Rahul Nangare he can post about his corporate and perosnnal life - featuring an interactive bento grid interface where content is presented as dynamically arranged cards. Users can drag, scroll, and zoom through the grid while each card serves as a content thumbnail that seamlessly morphs into full-screen detailed views. The experience is enhanced by an interactive mini-map for navigation and search functionality.

**1.2 Core Value Proposition**

Interactive Experience: Transform traditional portfolio browsing into an engaging, game-like exploration
Content Discovery: Enable intuitive navigation through diverse content types via visual thumbnails
Professional Presentation: Showcase personal brand, skills, and achievements in a memorable format
Responsive Design: Provide optimal viewing experience across all devices and screen sizes


**2. User Experience Design**

- **2.1 Primary User Interface: Interactive Bento Grid**
  - **2.1.1 Grid Behavior & Interactions**
    - Multi-directional Navigation: Users can drag the grid in any direction (horizontal/vertical)
    - Zoom Functionality: Pinch-to-zoom or mouse wheel for different viewing levels (overview to detail)
    - Smooth Animations: Fluid transitions for all interactions (drag, zoom, card morphing)
    - Responsive Layout: Grid adapts to screen size while maintaining proportional relationships
    - Touch Support: Full touch gesture support for mobile and tablet devices

  - **2.1.2 Card Morphing System**
    - Seamless Transitions: Cards smoothly expand from thumbnail to full-screen view
    - Context Preservation: Users can easily return to the grid from any expanded view
    - Loading States: Elegant loading indicators for content that requires fetching
    - Back Navigation: Consistent escape routes (ESC key, back button, outside click)

- **2.2 Navigation & Discovery Tools**
  - **2.2.1 Interactive Mini-Map**
    - Location: Bottom-left corner (desktop), collapsible on mobile
    - Features:
      - Real-time position indicator showing current grid viewport
      - Clickable regions for instant navigation to any grid area
      - Visual representation of card clusters and their relationships
      - Smooth auto-scroll animation when navigating via mini-map

  - **2.2.2 Search Functionality**
    - Trigger: Search button adjacent to mini-map
    - Capabilities:
      - Global content search across all card types and content
      - Real-time filtering with highlighted matching cards
      - Auto-scroll to first match with "next/previous" navigation
      - Visual dimming of non-matching cards for focus
      - Search history and suggestions
      - Keyboard shortcuts (Ctrl/Cmd + K to open)

  - **2.2.3 Quick Actions Panel**
    - Location: Below mini-map
    - Components:
      - Download Resume: Direct PDF download with analytics tracking
      - Contact User: Quick contact form or direct messaging
      - Theme Toggle: Light/dark mode switcher (if applicable)
      - Language Selector: Multi-language support (future enhancement)

- **3. Content Architecture**
  - **3.1 BioCluster Cards (Unique, Central Position)**
    - **3.1.1 Bio Card**
      - Thumbnail Design:
        - Corporate ID card aesthetic with rounded corners
        - Professional headshot with subtle shadow/glow effect
        - Clean typography hierarchy: Name (large) → Tagline → Position → Location
        - Social media icons with hover animations
        - Contact information with click-to-action (email, phone)
      - Expanded View:
        - Hero section with larger professional photo
        - Detailed personal story and professional journey
        - Interactive timeline of career milestones
        - Downloadable resume/CV section
        - Personal philosophy or mission statement

    - **3.1.2 Welcome Card**
      - Design: Bold, animated welcome message with personal branding colors
      - Behavior: Non-expandable, serves as entry point and brand introduction
      - Features: Subtle animation on grid load, possible typing effect

    - **3.1.3 Skills Card**
      - Thumbnail Design:
        - Interactive constellation/network of technology icons
        - Skill categories with visual grouping (Frontend, Backend, Tools, etc.)
        - Proficiency indicators (years of experience, certification levels)
        - Hover effects revealing quick skill descriptions
      - Expanded View:
        - Detailed skill breakdown with proficiency meters
        - Project portfolio filtered by selected skill
        - Certification gallery with verification links
        - Learning journey and future skill roadmap
        - Related case studies and code samples

    - **3.1.4 Experience Card**
      - Thumbnail Design:
        - Stylized world map with glowing location pins
        - Company logos positioned at geographic locations
        - Timeline visualization showing career progression
      - Subtle animation of connection lines between positions
      - Expanded View:
        - Interactive map with clickable company locations
        - Detailed job descriptions with key achievements
        - Technologies used at each position
        - Testimonials from colleagues/managers
        - Project highlights and impact metrics

    - **3.1.5 Medals Card**
      - Design: Horizontal marquee of high-resolution achievement images
      - Features: Parallax scrolling effect, pause on hover
      - Content: Certifications, awards, course completions, conference speaking
      - Behavior: Non-expandable but includes tooltips with achievement details

    - **3.1.6 Ask Card**
      - Thumbnail Design:
        - Clear call-to-action with compelling copy
        - Engaging visual element (arrow, hand, or custom illustration)
        - Brief description of ideal collaboration or opportunity
        - Urgency indicators if applicable
      - Expanded View:
        - Comprehensive contact form with multiple fields 
        - Expected response time and communication preferences
        - Portfolio of past successful collaborations

    - **3.1.7 MiniGallery Card**
      - Thumbnail Design: Dynamic 3x3 grid or masonry layout of curated images
      - Expanded View:
        - Full gallery with categorized sections (Travel, Events, Behind-the-scenes)
        - Lightbox functionality with navigation
        - Image metadata and story context
        - Social sharing capabilities

    - **3.1.8 TestimonialCarousel Card**
      - Design: Elegant rotating testimonial cards with smooth transitions
      - Features:
        - Client/colleague photos and company logos
        - Star ratings or impact metrics
        - Video testimonial integration with play buttons
      - Auto-rotation with manual controls

    - **3.1.9 FeaturedArticles Card**
      - Design: Magazine-style layout with article thumbnails
      - Content: 3-5 most popular or recent blog posts
      - Expanded View: Selected article in full-screen reader mode

    - **3.1.10 FeaturedSocialEmbeds Card**
      - Design: Social media platform-styled cards with authentic appearance
      - Behavior: Click-through to original posts in new windows
      - Content: Recent highlights from various social platforms

    - **3.1.11 NewsTicker Card**
      - Design: Scrolling banner with relevant industry news or personal updates
      - Features: Smooth animation, readable typography, color-coded categories
      - Behavior: Non-expandable, serves as dynamic information stream

  - **3.2 ContentCluster Cards (Multiple Instances)**
    - **3.2.1 Blog Card**
      - Thumbnail: Magazine cover design with featured image, title, date, and short description
      - Expanded View: Full article with rich text formatting, comments, sharing options

    - **3.2.2 CaseStudy Card**
      - Thumbnail: Professional layout with project icon and brief description
      - Expanded View: Detailed case study with problem/solution structure, metrics, visual aids

    - **3.2.3 Adventure Card**
      - Thumbnail: Travel photo with vintage postcard aesthetic
      - Expanded View: Travel story with photo gallery, interactive map, personal reflections

    - **3.2.4 Testimonial Card**
      - Thumbnail: Single testimonial with client photo and company branding
      - Behavior: Non-expandable unless video testimonial (then morphs to video player)

    - **3.2.5 Snap Card**
      - Thumbnail: Polaroid-style personal photo with handwritten caption aesthetic
      - Expanded View: Full-size image with detailed caption, EXIF data, sharing options

    - **3.2.6 SocialEmbed Card**
      - Thumbnail: Platform-authentic social media post preview
      - Expanded View: Embedded social feed or enlarged post view

    - **3.2.7 NewsUpdate Card**
      - Thumbnail: News ticker style with headline and timestamp
      - Expanded View: Full article or summary with source attribution

**4. Technical Architecture**

**4.1 Frontend Framework**
- Primary: SvelteKit for optimal performance and SEO
- Styling: DaisyUI with TailwindCSS
- Animations: Svelte Motion for smooth interactions

**4.2 Grid Implementation**
- Technology: CSS Grid with JavaScript for dynamic positioning
- Performance: Virtual scrolling for large content sets
- Responsive: Container queries for adaptive card sizing

**4.3 State Management**
- Solution: Svelte stores for global state, local component state for interactions
- Persistence: LocalStorage for user preferences (theme, grid position)

**4.4 Search Implementation**
- Engine: Client-side search with fuzzy matching capabilities
- Indexing: Pre-built search index for fast content discovery
Filters: Category, date, and content type filtering

**5. Admin Dashboard Specifications**

**5.1 Authentication & Security**

Authentication: Firebase Auth

**5.2 Content Management System**

**5.2.1 BioCluster Management**

Features:
- Visual editor for each bioCluster card type
- Real-time preview of changes
- Image upload and management
- Social media integration settings
- SEO metadata configuration

**5.2.2 ContentCluster Management**
Features:
- Full CRUD operations for all content types
- Rich text editor (WYSIWYG) for blog posts and case studies
- Media library with drag-and-drop upload
- Content categorization and tagging system
- Publishing workflow (draft, review, published)
- Content scheduling for future publication
- Archive functionality

**5.3 Grid Layout Manager**
Features:
- Drag-and-drop grid editor
- Card size and position controls
- Grid template management
- Preview mode with different device sizes

**5.4 Analytics & Reporting**
Metrics:
- Page views and user engagement
- Card interaction heatmaps
- Content performance analytics
- User journey mapping
- Download and contact form tracking

**5.5 System Settings**
Configuration Options:
- Site metadata and SEO settings
- Third-party integrations (analytics, social media)
- Performance optimization settings


**6. Performance & Optimization**

**6.1 Loading Strategy**

- Critical Path: Prioritize above-the-fold content and navigation elements
- Lazy Loading: Implement for non-visible cards and heavy media content
- Progressive Enhancement: Ensure basic functionality without JavaScript

**6.2 Caching Strategy**

- Static Assets: Aggressive caching for images, fonts, and CSS
- Content: Smart cache invalidation for dynamic content
- Service Worker: Offline functionality for previously visited content

**6.3 SEO Optimization**

- Meta Tags: Dynamic meta tags for each expandable card
- Structured Data: Schema markup for better search engine understanding
- Social Sharing: Open Graph and Twitter Card meta tags


**7. Accessibility & Usability**

**7.1 Accessibility Compliance**

- WCAG 2.1 AA: Full compliance with accessibility guidelines
- Keyboard Navigation: Complete keyboard-only navigation support
- Screen Readers: Proper ARIA labels and semantic HTML structure
- Color Contrast: Sufficient contrast ratios for all text and interactive elements

**7.2 User Experience Considerations**

- Loading States: Clear feedback for all async operations
- Error Handling: Graceful error messages with recovery options
- Progressive Disclosure: Logical information hierarchy from thumbnail to detail
- Mobile Optimization: Touch-friendly interface with appropriate gesture support


**8. Success Metrics & KPIs**

**8.1 User Engagement**

- Time on Site: Average session duration and page depth
- Interaction Rate: Percentage of users engaging with interactive elements
- Content Discovery: Number of cards viewed per session
- Return Visits: User retention and repeat engagement

**8.2 Business Objectives**

- Lead Generation: Contact form submissions and resume downloads
- Professional Networking: Social media follows and connection requests
- Content Performance: Most viewed content and user preferences
- Technical Performance: Page load times and error rates


**9. Future Enhancements**

**9.1 Phase 2 Features**

- Collaboration Tools: Allow visitors to leave public comments or reactions
- Content Recommendations: AI-driven content suggestions based on user behavior
- Multi-language Support: Internationalization for global audience
- Advanced Analytics: Machine learning insights for content optimization

**9.2 Integration Opportunities**

- CRM Integration: Automatic lead capture and follow-up workflows
- Calendar Integration: Direct meeting scheduling from contact forms
- Social Media Automation: Cross-platform content syndication
- E-commerce: Integration for selling products, courses, or consulting services


**10. Risk Assessment & Mitigation**

**10.1 Technical Risks**

- Performance: Large grid sizes may impact performance on lower-end devices
- Browser Compatibility: Complex animations may not work on older browsers
- Mobile Experience: Touch interactions require careful implementation

**10.2 User Experience Risks**

- Learning Curve: Novel interface may confuse some users
- Content Overload: Too many cards could overwhelm visitors
- Navigation Confusion: Users may get lost in the grid without proper guidance

**10.3 Mitigation Strategies**

- Progressive Enhancement: Ensure basic functionality works without advanced features
- User Testing: Extensive testing with target audience before launch
- Performance Monitoring: Continuous monitoring and optimization
- Alternative Navigation: Provide traditional navigation options as backup


**11. Firebase Database Schema**
    The Firestore database is initialized with the following collections:
    - `bioCluster`: Stores various interactive cards like 'welcome', 'bio', 'skills', 'experience', 'medals', and 'ask'.
    - `categories`: Defines categories for projects or content, e.g., 'Cloud Computing', 'DevOps', 'Networking'.
    - `tags`: Stores tags associated with content, e.g., 'AWS', 'Azure', 'Networking', 'Automation'.
    - `gridLayout`: Contains the default grid layout for the portfolio, defining the positions and dimensions of cards.
    - `settings`: Stores site-wide settings like `site_title` and `contact_email`.

    You can learn the database structure in detail from the file `scripts/init-database.js`. You can also use Firebase MCP to access the database and learn about it if you need it. 

**12. SvelteKit Project Infrastructure Design**
📁 Complete Project Structure
src/
├── app.d.ts                     # TypeScript declarations
├── app.html                     # Main HTML template
├── hooks.client.ts              # Client-side hooks
├── hooks.server.ts              # Server-side hooks
├── service-worker.ts            # Service worker for PWA
│
├── lib/                         # Shared library code
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Base UI components (buttons, inputs, etc.)
│   │   │   ├── Button.svelte
│   │   │   ├── Input.svelte
│   │   │   ├── Modal.svelte
│   │   │   ├── Tooltip.svelte
│   │   │   └── LoadingSpinner.svelte
│   │   │
│   │   ├── grid/                # Bento grid specific components
│   │   │   ├── BentoGrid.svelte
│   │   │   ├── GridCard.svelte
│   │   │   ├── CardMorph.svelte
│   │   │   ├── MiniMap.svelte
│   │   │   ├── SearchOverlay.svelte
│   │   │   └── QuickActions.svelte
│   │   │
│   │   ├── cards/               # Individual card type components
│   │   │   ├── bio/
│   │   │   │   ├── BioCard.svelte
│   │   │   │   ├── BioCardExpanded.svelte
│   │   │   │   └── TimelineComponent.svelte
│   │   │   ├── skills/
│   │   │   │   ├── SkillsCard.svelte
│   │   │   │   ├── SkillsExpanded.svelte
│   │   │   │   └── SkillConstellation.svelte
│   │   │   ├── experience/
│   │   │   │   ├── ExperienceCard.svelte
│   │   │   │   ├── ExperienceExpanded.svelte
│   │   │   │   └── InteractiveMap.svelte
│   │   │   ├── content/
│   │   │   │   ├── BlogCard.svelte
│   │   │   │   ├── BlogExpanded.svelte
│   │   │   │   ├── CaseStudyCard.svelte
│   │   │   │   └── AdventureCard.svelte
│   │   │   └── shared/
│   │   │       ├── CardThumbnail.svelte
│   │   │       ├── CardContainer.svelte
│   │   │       └── ExpandedView.svelte
│   │   │
│   │   ├── admin/               # Admin interface components
│   │   │   ├── AdminLayout.svelte
│   │   │   ├── ContentEditor.svelte
│   │   │   ├── GridLayoutEditor.svelte
│   │   │   ├── MediaManager.svelte
│   │   │   ├── AnalyticsDashboard.svelte
│   │   │   └── forms/
│   │   │       ├── BlogForm.svelte
│   │   │       ├── BioForm.svelte
│   │   │       └── CategoryForm.svelte
│   │   │
│   │   └── layout/              # Layout components
│   │       ├── Header.svelte
│   │       ├── Footer.svelte
│   │       ├── Navigation.svelte
│   │       └── SEOHead.svelte
│   │
│   ├── stores/                  # Svelte 5 state management
│   │   ├── grid.svelte.ts       # Grid state (position, zoom, etc.)
│   │   ├── portfolio.svelte.ts  # Portfolio content state
│   │   ├── search.svelte.ts     # Search functionality state
│   │   ├── ui.svelte.ts         # UI state (modals, loading, etc.)
│   │   ├── auth.svelte.ts       # Authentication state
│   │   └── analytics.svelte.ts  # Analytics tracking state
│   │
│   ├── firebase/                # Firebase integration
│   │   ├── index.ts             # Firebase initialization
│   │   ├── firestore.ts         # Firestore utilities
│   │   ├── auth.ts              # Authentication utilities
│   │   ├── storage.ts           # Storage utilities
│   │   └── services/            # Firebase service layers
│   │       ├── portfolio.ts     # Portfolio data operations
│   │       ├── content.ts       # Content CRUD operations
│   │       ├── analytics.ts     # Analytics tracking
│   │       └── admin.ts         # Admin operations
│   │
│   ├── utils/                   # Utility functions
│   │   ├── grid/                # Grid-specific utilities
│   │   │   ├── calculations.ts  # Position/zoom calculations
│   │   │   ├── animations.ts    # Animation helpers
│   │   │   ├── collision.ts     # Collision detection
│   │   │   └── viewport.ts      # Viewport management
│   │   ├── content/             # Content utilities
│   │   │   ├── markdown.ts      # Markdown processing
│   │   │   ├── search.ts        # Search algorithms
│   │   │   ├── filters.ts       # Content filtering
│   │   │   └── seo.ts           # SEO utilities
│   │   ├── ui/                  # UI utilities
│   │   │   ├── animations.ts    # UI animations
│   │   │   ├── gestures.ts      # Touch/mouse gestures
│   │   │   ├── responsive.ts    # Responsive utilities
│   │   │   └── accessibility.ts # A11y helpers
│   │   └── common/              # Common utilities
│   │       ├── formatters.ts    # Data formatting
│   │       ├── validators.ts    # Input validation
│   │       ├── debounce.ts      # Performance utilities
│   │       └── constants.ts     # App constants
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── portfolio.ts         # Portfolio-specific types
│   │   ├── grid.ts              # Grid system types
│   │   ├── content.ts           # Content types
│   │   ├── ui.ts                # UI component types
│   │   ├── firebase.ts          # Firebase-related types
│   │   └── api.ts               # API response types
│   │
│   ├── styles/                  # Global styles and themes
│   │   ├── global.css           # Global CSS styles
│   │   ├── tailwind.css         # Tailwind CSS imports
│   │   ├── themes/              # Theme configurations
│   │   │   ├── light.css
│   │   │   ├── dark.css
│   │   │   └── variables.css
│   │   └── components/          # Component-specific styles
│   │       ├── grid.css         # Grid system styles
│   │       ├── cards.css        # Card-specific styles
│   │       └── animations.css   # Animation keyframes
│   │
│   └── assets/                  # Static assets
│       ├── icons/               # SVG icons
│       ├── images/              # Placeholder images
│       └── fonts/               # Custom fonts
│
├── routes/                      # SvelteKit routes
│   ├── +layout.svelte           # Root layout
│   ├── +layout.server.ts        # Root layout server logic
│   ├── +page.svelte             # Home page (main portfolio)
│   ├── +page.server.ts          # Home page server logic
│   ├── +error.svelte            # Error page
│   │
│   ├── (portfolio)/             # Portfolio route group
│   │   ├── +layout.svelte       # Portfolio-specific layout
│   │   ├── blog/                # Blog routes
│   │   │   ├── +page.svelte     # Blog listing
│   │   │   ├── +page.server.ts  # Blog listing data
│   │   │   ├── [slug]/          # Individual blog post
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.server.ts
│   │   │   └── category/        # Blog categories
│   │   │       └── [category]/
│   │   │           ├── +page.svelte
│   │   │           └── +page.server.ts
│   │   ├── case-studies/        # Case study routes
│   │   │   ├── +page.svelte
│   │   │   ├── +page.server.ts
│   │   │   └── [slug]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   ├── adventures/          # Adventure/travel routes
│   │   │   ├── +page.svelte
│   │   │   ├── +page.server.ts
│   │   │   └── [slug]/
│   │   │       ├── +page.svelte
│   │   │       └── +page.server.ts
│   │   ├── about/               # Detailed about page
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.ts
│   │   └── contact/             # Contact page
│   │       ├── +page.svelte
│   │       ├── +page.server.ts
│   │       └── +page.form.ts    # Contact form action
│   │
│   ├── (admin)/                 # Admin route group
│   │   ├── +layout.svelte       # Admin layout
│   │   ├── +layout.server.ts    # Admin auth check
│   │   ├── dashboard/           # Admin dashboard
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.ts
│   │   ├── content/             # Content management
│   │   │   ├── +page.svelte     # Content listing
│   │   │   ├── +page.server.ts
│   │   │   ├── create/          # Create content
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.form.ts
│   │   │   ├── edit/            # Edit content
│   │   │   │   └── [id]/
│   │   │   │       ├── +page.svelte
│   │   │   │       ├── +page.server.ts
│   │   │   │       └── +page.form.ts
│   │   │   └── bio/             # Bio cluster management
│   │   │       ├── +page.svelte
│   │   │       ├── +page.server.ts
│   │   │       └── +page.form.ts
│   │   ├── grid/                # Grid layout management
│   │   │   ├── +page.svelte
│   │   │   ├── +page.server.ts
│   │   │   └── +page.form.ts
│   │   ├── media/               # Media management
│   │   │   ├── +page.svelte
│   │   │   ├── +page.server.ts
│   │   │   └── upload/
│   │   │       └── +server.ts   # File upload endpoint
│   │   ├── analytics/           # Analytics dashboard
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.ts
│   │   └── settings/            # Site settings
│   │       ├── +page.svelte
│   │       ├── +page.server.ts
│   │       └── +page.form.ts
│   │
│   ├── api/                     # API endpoints
│   │   ├── content/             # Content API
│   │   │   ├── +server.ts       # CRUD operations
│   │   │   └── [id]/
│   │   │       └── +server.ts
│   │   ├── search/              # Search API
│   │   │   └── +server.ts
│   │   ├── analytics/           # Analytics tracking
│   │   │   └── +server.ts
│   │   ├── upload/              # File upload
│   │   │   └── +server.ts
│   │   └── auth/                # Authentication endpoints
│   │       ├── login/
│   │       │   └── +server.ts
│   │       └── logout/
│   │           └── +server.ts
│   │
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   │   ├── +page.svelte
│   │   │   └── +page.form.ts
│   │   └── callback/            # OAuth callback
│   │       └── +page.server.ts
│   │
│   └── sitemap.xml/             # SEO sitemap
│       └── +server.ts
│
├── static/                      # Static files
│   ├── images/                  # Static images
│   │   ├── profile/
│   │   ├── companies/
│   │   ├── certs/
│   │   └── blog/
│   ├── icons/                   # App icons
│   ├── fonts/                   # Web fonts
│   └── robots.txt               # SEO robots file
│
├── tests/                       # Test files
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests
│
├── docs/                        # Documentation
│   ├── components.md            # Component documentation
│   ├── grid-system.md           # Grid system documentation
│   └── deployment.md            # Deployment guide
│
└── scripts/                     # Build and utility scripts
    ├── init-database.js         # Database initialization (existing)
    ├── test-firebase.js         # Firebase testing (existing)
    ├── build-sitemap.js         # Sitemap generation
    └── optimize-images.js       # Image optimization


🏗️ Key Architectural Decisions
1. State Management (Svelte 5 Runes)

Use Svelte 5 runes for reactive state management
Separate stores for different concerns (grid, content, UI, auth)
Centralized state with reactive derivations

2. Component Architecture

Card System: Modular card components with shared base
Grid System: Flexible bento grid with drag, zoom, morph capabilities
Admin Interface: Complete CMS for content management
Responsive Design: Mobile-first approach with touch gestures

3. Routing Strategy

Route Groups: Organized by purpose (portfolio, admin)
Dynamic Routes: Slug-based content routing
API Routes: RESTful endpoints for data operations
Form Actions: Server-side form handling

4. Performance Optimization

Lazy Loading: Components and content loaded on demand
Virtual Scrolling: For large grid layouts
Image Optimization: Responsive images with modern formats
Service Worker: Offline capabilities and caching

5. Type Safety

Comprehensive Types: Full TypeScript coverage
Firebase Integration: Typed Firestore operations
Component Props: Strict prop typing

🎯 Core Features Implementation
- Interactive Bento Grid
    - Drag and drop functionality
    - Pinch-to-zoom and mouse wheel zoom
    - Smooth animations and transitions
    - Touch gesture support
- Card Morphing System
    - Seamless thumbnail to full-screen transitions
    - Context preservation during navigation
    - Loading states and error handling
- Search and Navigation
    - Real-time search with fuzzy matching
    - Interactive mini-map
    - Quick action panel
    - Keyboard shortcuts
- Content Management
    - WYSIWYG editor for rich content
    - Media library with drag-and-drop upload
    - Grid layout visual editor
    - Analytics and reporting
- SEO and Performance
    - Server-side rendering
    - Dynamic meta tags
    - Structured data
    - Progressive web app features

