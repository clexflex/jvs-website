# JVS Enterprises Website — Site Structure, Global UX & Navigation

## Brand position

**JVS Enterprises** should be positioned as a trusted, execution-focused construction company from Panhala serving Panhala, Kolhapur, and nearby regions.

The brand should feel:
- established, not loud
- premium, not decorative
- practical, not corporate-heavy
- trustworthy, not sales-driven
- local, but professionally presented

## Core slogan

**A NAME YOU CAN TRUST**

Use this as a repeated brand line across the site, but do not overuse it as a headline on every page. It should appear in the hero, footer, contact CTA, and selected trust sections.

## Recommended website structure

### Primary pages

1. Home — `/`
2. Our Company — `/our-company`
3. Services — `/services`
4. Projects — `/projects`
5. Insights — `/insights`
6. Contact — `/contact`

### Reusable templates

1. Project Detail Template — `/projects/[project-slug]`
2. Insight Article Template — `/insights/[article-slug]`

### Pages not recommended at launch

Do not create these as separate pages at launch:

- Careers
- Gallery
- Testimonials
- Equipment
- CSR
- ESG
- Every service as an individual page
- Every location as an individual page
- Separate leadership page
- Heavy corporate governance page

The site should stay lean and premium.

---

# Global desktop header

## Closed/default header

The header should feel inspired by the Turner-style premium construction layout: strong brand presence, clean typography, generous spacing, and a clear contact action.

### Desktop layout

**Left:** JVS Enterprises logo block  
**Center navigation:** Our Company / Services / Projects / Insights / Contact  
**Right CTA:** Discuss a Project  
**Menu icon:** opens full-screen navigation overlay  
**Search icon:** optional, mainly useful for Insights and Projects

### Header text

Logo lockup:

```text
JVS
ENTERPRISES
A NAME YOU CAN TRUST
```

Primary nav:

```text
Our Company
Services
Projects
Insights
Contact
```

CTA:

```text
Discuss a Project
```

Optional compact CTA:

```text
Call JVS
```

### Header behavior

- Header overlays the hero on the homepage.
- On scroll, header becomes solid white with a thin border.
- Use blue for the logo block or active navigation state.
- Use red only as the interaction accent: arrows, hover underline, active menu indicator.
- On mobile, show only logo, menu icon, and sticky bottom CTAs.

---

# Full-screen navigation overlay

The open menu can follow the Turner-style structure: left brand panel, center navigation list, right featured project panel, and bottom utility strip.

## Layout

### Left panel

Blue background.

```text
JVS ENTERPRISES
A NAME YOU CAN TRUST

Panhala · Kolhapur · Since 2006
```

Bottom:

```text
jvs243110@gmail.com
+91 98609 43500
```

### Top row

Search:

```text
Type To Search
```

Close label/icon:

```text
Close
```

Right CTA:

```text
Contact Us
```

### Main menu list

```text
Our Company
Services
Projects
Insights
Contact
```

Each main item should expand on hover/click.

---

## Expanded menu: Our Company

```text
Overview
Founder Journey
Mission & Vision
How We Work
Team & Site Leadership
Panhala Roots
```

Microcopy:

```text
A construction company built from the ground up, shaped by local experience, disciplined execution, and long-term client trust.
```

CTA:

```text
Know Our Story
```

---

## Expanded menu: Services

Group services into columns.

### Planning

```text
Site Assessment
Project Planning
Drawing Coordination
Estimation & Budgeting
BOQ Preparation
Approval Coordination
```

### Construction

```text
Residential Construction
Commercial Construction
Institutional Construction
Industrial Buildings
Turnkey Projects
```

### Structural Works

```text
Foundation Work
RCC Columns, Beams & Slabs
Brickwork / Blockwork
Compound Walls
Water Tanks
Structural Finishing
```

### Site Development

```text
Drainage & Gutters
RCC Roads & Pavements
Paver Blocks
Boundary Gates
Sports Ground Development
Fabrication & Welding
```

CTA:

```text
Explore Services
```

---

## Expanded menu: Projects

```text
Institutional Projects
Residential Homes
Farmhouses
RCC & Structural Works
Compound Walls
Water Tanks
Sports & Ground Development
Site Development
```

Featured project panel:

```text
Featured Project
YSPM Nursing College, Kodoli
Institutional construction planned for long-term daily use, safety, and structural dependability.
```

CTA:

```text
View All Projects
```

---

## Expanded menu: Insights

```text
Construction Guides
Panhala & Kolhapur Building Advice
RCC & Structural Work
Budgeting & BOQ
Project Planning
Project Notes
```

Featured insight:

```text
Choosing the Right Construction Company in Kolhapur
A practical guide for homeowners, institutions, and project owners planning construction with clarity.
```

CTA:

```text
Read Insights
```

---

## Expanded menu: Contact

```text
Start a Project Enquiry
Call JVS Enterprises
Email the Office
Visit Panhala Office
View Location Map
```

CTA:

```text
Discuss Your Project
```

---

# Mobile navigation

## Mobile header

- Logo left
- Menu icon right
- No full desktop navigation
- Header should remain compact and fixed

## Mobile bottom sticky bar

Use a sticky CTA bar for construction enquiries.

```text
Call
WhatsApp
Enquire
```

## Mobile menu structure

Accordion menu:

```text
Our Company
Services
Projects
Insights
Contact
```

Keep service categories collapsed by default.

---

# Footer content

## Footer brand block

```text
JVS Enterprises
A NAME YOU CAN TRUST

JVS Enterprises is a Panhala-based construction company serving residential, institutional, commercial, and site development projects across Panhala, Kolhapur, and nearby regions.
```

## Footer columns

### Explore

```text
Home
Our Company
Services
Projects
Insights
Contact
```

### Services

```text
Planning & Estimation
Residential Construction
Commercial Construction
Institutional Construction
RCC & Structural Works
Site Development
```

### Contact

```text
Shing Galli, Near S.T. Stand,
Panhala, Tal. Panhala,
Dist. Kolhapur, Maharashtra 416201

Phone: +91 98609 43500
Mobile: +91 90492 43110
Email: jvs243110@gmail.com
GSTIN: 27CJXPB7834H1ZO
```

### Footer bottom

```text
© JVS Enterprises. All rights reserved.
Website by Fat Mango Solutions.
```

---

# Motion and interaction direction

## Lenis smooth scroll

Use Lenis for controlled, premium scrolling. Keep movement subtle.

Recommended use:
- Smooth page scroll
- Section reveal timing
- Navigation anchor scroll
- Project image parallax
- Footer reveal

Avoid:
- heavy scroll hijacking
- excessive delay
- motion that slows enquiry actions

## Swiper usage

Use Swiper only where it improves the experience.

Recommended:
- Homepage hero media slider
- Featured projects carousel
- Latest insights carousel on mobile
- Project detail gallery
- Service capability slider on mobile only

Avoid:
- every section becoming a slider
- hidden content that affects SEO
- auto-play sliders with fast movement

## Animation principles

- Use fade + translate for text reveals.
- Use slow image scale on hero and project cards.
- Use red arrows for CTA movement.
- Use blue panels and white space for brand strength.
- Keep all animation responsive and disabled/reduced for users with reduced motion settings.

---

# Global content rules

1. Write with authority, not exaggeration.
2. Avoid words like "best", "number one", "world-class", unless supported.
3. Use "trusted", "experienced", "disciplined", "reliable", "planned", and "supervised".
4. Use local references naturally: Panhala, Kolhapur, Kodoli, Kadamwadi.
5. Do not make false claims about certifications, awards, safety systems, or government approvals unless confirmed.
6. For numbers, use careful language:
   - "Started around 2006"
   - "Grown to a workforce of 100+ workers"
   - "Around ₹10 crore turnover"
7. Keep CTAs practical:
   - Discuss a Project
   - Request an Estimate
   - View Projects
   - Call JVS
   - Visit Office
