# KGPath Education Platform - Design Guidelines

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from modern education platforms like Coursera, Udacity, HeroVired, and edX, emphasizing trust-building, course showcase clarity, and conversion optimization.

**Core Principle**: Create an aspirational yet approachable experience that positions KGPath as a premium AI education provider while maintaining accessibility for diverse learners.

---

## Typography System

**Font Families** (via Google Fonts):
- Primary: 'Inter' - for UI elements, navigation, body text
- Headings: 'Space Grotesk' or 'Plus Jakarta Sans' - for headlines, course titles
- Accent: 'JetBrains Mono' - sparingly for code snippets, technical callouts

**Hierarchy**:
- Hero Headlines: text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight
- Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subsections: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Copy: text-base md:text-lg, leading-relaxed
- Small Print: text-sm, for metadata, captions
- CTAs: text-base md:text-lg, font-semibold, tracking-wide

---

## Layout System

**Spacing Primitives**: Limit to Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Component internal spacing: p-4, p-6, p-8
- Section padding: py-16 md:py-20 lg:py-24
- Container gaps: gap-6, gap-8, gap-12
- Element margins: mb-4, mb-6, mb-8, mb-12

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Content sections: max-w-6xl mx-auto
- Text-heavy content: max-w-4xl mx-auto
- Course cards grid: max-w-7xl with responsive columns

**Grid System**:
- Course cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature highlights: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Testimonials: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Stats: grid-cols-2 md:grid-cols-4
- Team profiles: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

---

## Page-Specific Layouts

### Homepage Structure (8 sections)

1. **Hero Section** (70vh-80vh):
   - Full-width background with large hero image
   - Centered content overlay with max-w-4xl
   - Headline + subheadline + dual CTA buttons (primary: "Explore Courses", secondary: "Download Brochure")
   - Trust indicators below fold: "10,000+ Students | 95% Placement Rate | 200+ Partner Companies"

2. **About Us Brief** (py-16):
   - max-w-4xl centered, single column
   - 2-3 sentences with "Learn More" link to About page

3. **Course Highlights Grid** (py-20):
   - 3-column grid on desktop, cards with:
     - Large course icon (96px×96px)
     - Course title (text-2xl font-bold)
     - 3-4 line description
     - Duration + Level badges
     - "Learn More" button
   - Hover: lift effect with shadow-xl transition

4. **Why Choose Us** (py-20):
   - 4-column grid for benefits
   - Each card: Icon (64px) + Title + 2-line description
   - Features: Expert Instructors, Industry Curriculum, Hands-on Projects, Placement Support

5. **Stats/Numbers** (py-16):
   - 4-column stat blocks
   - Large numbers (text-5xl font-bold) + labels
   - Animated counter effect on scroll

6. **How It Works** (py-20):
   - Horizontal stepper: 4 steps
   - Step number circles + arrows + descriptions
   - Mobile: vertical stack

7. **Testimonials Carousel** (py-20):
   - 3 cards visible on desktop, 1 on mobile
   - Cards: Student photo (80px circle) + Quote + Name + Role + Company logo
   - Navigation dots below

8. **Partner Companies** (py-16):
   - Logo grid: 4-6 logos per row
   - Grayscale with hover transition to full color

9. **Final CTA Section** (py-24):
   - Centered content, max-w-3xl
   - Headline + CTA buttons + contact info

### About Us Page (6 sections)

1. **Hero Banner** (40vh): Company name + mission statement overlay
2. **Mission/Vision** (py-20): 2-column split
3. **Story Section** (py-20): Timeline layout with milestones
4. **Core Values** (py-20): 3-column cards with icons
5. **Team Grid** (py-20): 4-column profiles (photo, name, title, credentials)
6. **Achievements** (py-16): Horizontal scrolling timeline

### Courses Listing Page

**Header**: Page title + filter bar (sticky on scroll)
**Filters**: Horizontal pills (Category, Duration, Level)
**Grid**: 3-column course cards matching homepage style
**Card Detail**: Includes all metadata + "View Details" button

### Course Detail Pages (Individual)

**Layout**: Single column, max-w-5xl
1. **Course Hero** (py-12): Title + breadcrumbs + primary CTA (sticky on scroll)
2. **Overview** (py-12): 2-column (description left, quick facts sidebar right)
3. **What You'll Learn** (py-12): Checklist grid (2 columns)
4. **Curriculum Accordion** (py-12): Expandable modules
5. **Tools & Tech** (py-12): Logo grid with tooltips
6. **Instructor Profile** (py-12): Card with photo + bio
7. **Fee Structure** (py-12): Pricing table with payment plans
8. **Batch Info** (py-12): Calendar-style upcoming batches
9. **FAQs Accordion** (py-12)
10. **Related Courses** (py-12): 2-column mini cards
11. **Sticky Bottom Bar**: Pricing + "Enroll Now" (appears on scroll)

### Placement Page

1. **Stats Banner** (py-16): 4-column key metrics
2. **Success Stories** (py-20): Alternating image-text sections
3. **Partner Logos** (py-16): Multi-row grid
4. **Placement Process** (py-20): 4-step visual flow
5. **Support Services** (py-16): 4-column cards
6. **Alumni Section** (py-20): Profile cards with company logos

### Contact Page

**2-column layout** (60/40 split):
- **Left**: Form (Name, Email, Phone, Course dropdown, Message textarea) + Submit button
- **Right**: Embedded Google Maps (400px height) + office details + business hours + social links

---

## Component Library

### Navigation
- **Desktop**: Horizontal menu, logo left, links center, "Enroll Now" button right
- **Mobile**: Hamburger menu, full-screen overlay
- **Sticky behavior**: Shadow appears on scroll, background blur

### Cards
- **Course Cards**: Aspect ratio 4:3 image top, content padding p-6, border rounded-xl
- **Feature Cards**: Icon top-center, centered text, min-height for alignment
- **Testimonial Cards**: Quoted text, author info bottom, shadow on hover
- **Team Cards**: Photo full-width top, content below, hover overlay with social links

### Buttons
- **Primary CTA**: px-8 py-4, rounded-lg, font-semibold, shadow-lg, scale on hover
- **Secondary**: px-8 py-4, rounded-lg, border-2, font-semibold
- **Text Links**: Underline on hover, transition smooth
- **Hero CTAs on images**: Backdrop blur (backdrop-blur-md), semi-transparent background

### Forms
- **Inputs**: Full-width, px-4 py-3, rounded-lg, border, focus ring
- **Labels**: text-sm font-semibold, mb-2
- **Error states**: Border change + error message below
- **Success**: Checkmark icon + confirmation message

### Badges
- **Level**: px-3 py-1, rounded-full, text-xs font-semibold
- **Duration**: Similar styling with clock icon prefix

### Icons
**Library**: Heroicons (via CDN)
- **Usage**: Consistent 24px size for UI, 64px-96px for feature icons
- **Placement**: Left of text in buttons, above text in cards

---

## Images Specification

### Required Images

1. **Homepage Hero**: Large tech-themed image (1920×1080) - AI/technology workspace, diverse students coding, or futuristic tech environment
2. **Course Cards** (3 images): 
   - AI Digital Marketing: Digital marketing dashboard/analytics
   - Full Stack Development: Coding workspace/IDE
   - Data Analytics: Data visualization/charts
3. **About Us Hero**: Team collaboration or modern office space (1920×800)
4. **Team Photos**: Professional headshots (400×400) for 8-12 team members
5. **Testimonial Photos**: Student headshots (160×160) for 6-8 testimonials
6. **Success Stories**: Before/after or students at work (800×600) for 4-6 stories
7. **Partner Company Logos**: 20-30 company logos (SVG preferred, 200×100)
8. **Course Detail Heroes**: One unique image per course (1920×600)
9. **Placement Page**: Gallery images of placement drives, interviews (various sizes)

**Image Treatment**: All images have subtle overlay gradients for text readability when needed

---

## Animations & Interactions

**Minimal & Purposeful**:
- Scroll-triggered fade-ins for sections (100ms stagger for grid items)
- Hover states: Scale(1.02) + shadow for cards, underline for links
- Button hovers: Slight scale + shadow enhancement
- Navigation: Smooth scroll behavior
- Stats: Count-up animation on viewport enter
- No parallax, no complex scroll effects

---

## Accessibility

- Semantic HTML5 throughout
- ARIA labels for all interactive elements
- Keyboard navigation: visible focus states (ring-2 ring-offset-2)
- Form labels properly associated
- Image alt text for all visuals
- Sufficient contrast ratios (check with accessibility tools)
- Mobile tap targets minimum 44×44px

---

## Responsive Breakpoints

- Mobile: base (320px+)
- Tablet: md: (768px+)
- Desktop: lg: (1024px+)
- Large: xl: (1280px+)

**Mobile-First Adjustments**:
- Stack all grids to single column
- Hero text sizes reduce by 1-2 steps
- Padding reduces: py-12 on mobile vs py-20 on desktop
- Hamburger menu replaces horizontal nav
- Forms full-width, sidebars stack below

---

This comprehensive design system ensures KGPath presents as a premium, trustworthy AI education platform while maintaining usability and conversion optimization across all touchpoints.