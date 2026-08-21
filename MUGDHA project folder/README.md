# 🏗️ MUGDHA CONSTRUCTIONS LLP — Website

A professional, responsive website for Mugdha Constructions LLP showcasing civil construction and HVAC services across Andhra Pradesh & Telangana.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [File Structure](#file-structure)
- [How to Run Locally](#how-to-run-locally)
- [How to Edit Content](#how-to-edit-content)
- [Deployment](#deployment)
- [Contact & Support](#contact--support)

---

## 🎯 Overview

**Website URL:** https://mugdhas.com/

**Built with:** HTML5, CSS3, JavaScript (vanilla, no frameworks)  
**Hosting:** Static site (works on any web server, CDN, or static host)

This is a fully functional, production-ready website with:
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Multi-step quote form with validation
- ✅ Project showcase & portfolio
- ✅ Service pages (Construction, HVAC, Projects, About)
- ✅ WhatsApp & call integration
- ✅ SEO-optimized (meta tags, structured data, Open Graph)
- ✅ Accessibility features (skip links, ARIA labels)

---

## 🎨 Features

### Pages
1. **Home (index.html)** — Hero section, trust bar, services overview
2. **Construction (construction.html)** — Plot owner, new homes, land development, renovation
3. **HVAC (hvac.html)** — HVAC services with 6 service cards
4. **Projects (projects.html)** — Portfolio of completed projects
5. **Project Detail (project-detail.html)** — Individual project showcase
6. **About (about.html)** — Company story, vision, mission, team approach
7. **Contact (contact.html)** — Multi-step quote form + direct contact info
8. **404 (404.html)** — Error page with navigation

### Interactive Features
- **Quote Form** (contact.html) — 3-step form with validation
  - Step 1: Personal details (name, phone, email, location)
  - Step 2: Service selection
  - Step 3: Project description, budget, timeline
- **WhatsApp Integration** — Click-to-chat button (9951028866)
- **Mobile Floating Bar** — Quick call, WhatsApp, quote buttons
- **Scroll Animations** — Reveal effects, smooth scrolling
- **Responsive Images** — Lazy loading, object-fit for different devices

---

## 📁 File Structure

```
MUGDHA project folder/
├── index.html                      # Homepage
├── construction.html               # Construction services
├── hvac.html                       # HVAC services
├── projects.html                   # Project listing
├── project-detail.html             # Single project detail
├── about.html                      # About company
├── contact.html                    # Contact & quote form
├── 404.html                        # Error page
│
├── css/
│   ├── tokens.css                  # Design tokens (colors, spacing, fonts)
│   ├── base.css                    # Base styles, resets
│   ├── layout.css                  # Header, footer, grid, containers
│   ├── components.css              # Buttons, cards, forms
│   ├── animations.css              # Scroll reveals, transitions
│   └── pages/
│       ├── home.css                # Homepage specific
│       ├── construction.css         # Construction page
│       ├── hvac.css                # HVAC page
│       ├── about.css               # About page
│       ├── contact.css             # Contact & form styles
│       ├── projects.css            # Projects listing
│       ├── project-detail.css      # Project detail
│       └── 404.css                 # Error page styles
│
├── js/
│   ├── main.js                     # Main navigation, header, scroll reveal
│   ├── quote-form.js               # Multi-step form logic & validation
│   ├── hero-3d.js                  # 3D canvas on homepage (optional)
│   ├── projects.js                 # Dynamic project loading
│   └── plot-counter.js             # Animated counter (optional)
│
├── assets/
│   └── images/
│       ├── mugdha-logo.png         # Main logo (header/footer)
│       ├── hero-construction.jpg   # Construction service image
│       ├── project-placeholder.jpg # Placeholder images
│       ├── bhagya-nagar-1.jpg      # Sample project images
│       ├── bhagya-nagar-2.jpg
│       └── bhagya-nagar-3.jpg
│
├── data/
│   └── projects.json               # Project data (for dynamic loading)
│
├── files/
│   └── SITE-CONTENT-INSTRUCTIONS.txt # Guide for updating content
│
├── README.md                        # This file
└── .gitignore                      # Git ignore rules

```

---

## 🚀 How to Run Locally

### Option 1: Python HTTP Server (Recommended)
```bash
cd "C:\MUGDHA project folder"
python -m http.server 8000
```
Then open: **http://localhost:8000**

### Option 2: Using VS Code Live Server
1. Install VS Code extension: "Live Server"
2. Right-click on `index.html` → "Open with Live Server"

### Option 3: Using Node.js (http-server)
```bash
npm install -g http-server
cd "C:\MUGDHA project folder"
http-server -p 8000
```

### Option 4: Docker
```bash
docker run -p 8000:80 -v "C:\MUGDHA project folder":/usr/share/nginx/html nginx
```
Then open: **http://localhost:8000**

---

## 📝 How to Edit Content

### 1️⃣ **Add or Change Images**

**Location:** `assets/images/`

**Steps:**
1. Place your image file into `assets/images/` (JPEG, PNG, WebP recommended)
2. Open the HTML file where you want to use it
3. Update the `<img>` tag:
   ```html
   <img src="assets/images/your-image.jpg" alt="Description" loading="lazy">
   ```

**Best Practices:**
- Use compressed images (optimize with TinyPNG, ImageOptim)
- Use JPG for photos, PNG for graphics with transparency
- Alt text must be descriptive for accessibility
- Ensure you own rights or use properly licensed images ✅

---

### 2️⃣ **Update Phone Number & Email**

**Search for:** `9951028866` and `info@mugdhas.com` in all files

**Files to update:**
- `index.html` — footer
- `construction.html` — footer
- `hvac.html` — footer
- `contact.html` — contact form, footer
- `about.html` — footer
- `projects.html` — footer
- `404.html` — footer

**Pro tip:** Use Find & Replace in your editor (Ctrl+H) to replace all at once.

---

### 3️⃣ **Update Social Media Links**

**Location:** All HTML files, look for `footer-social` section

**Replace `href="#"` with actual URLs:**
```html
<a href="https://facebook.com/your-page" aria-label="Facebook">...</a>
<a href="https://instagram.com/your-profile" aria-label="Instagram">...</a>
<a href="https://wa.me/919951028866" aria-label="WhatsApp">...</a>
```

**Format for WhatsApp:**
- Use country code: `https://wa.me/919951028866` (91 = India)
- No spaces, no `+` in the URL

---

### 4️⃣ **Add Project Details**

**Location:** `data/projects.json`

**Add a new project:**
```json
{
  "id": "bhagya-nagar-4",
  "name": "Bhagya Nagar Phase 4",
  "category": "residential",
  "image": "assets/images/your-project.jpg",
  "description": "Modern residential development in Ongole",
  "location": "Ongole, AP",
  "year": 2024,
  "area": "5000 sq.m"
}
```

Then update `projects.html` or use JavaScript to load dynamically from JSON.

---

### 5️⃣ **Edit Text Content**

Simply open any `.html` file and edit the text directly. Common sections:

**Homepage tagline:**
- Find: `<h1 id="hero-title">Building Trust. Shaping Structures.</h1>`

**Service descriptions:**
- Search for the section in the HTML and edit the `<p>` or `<h2>` text

**Footer contact info:**
- Search for address, phone, email in footer section

---

### 6️⃣ **Update Logo**

**Replace:** `assets/images/mugdha-logo.png`

1. Save new logo as `mugdha-logo.png` (56x56 or 88x88 pixels recommended)
2. Place into `assets/images/`
3. No need to change HTML — already references this filename

---

## 🌐 Deployment

### Option 1: Netlify (Recommended - Free, Easy)
1. Drag & drop your project folder onto [netlify.com](https://netlify.com)
2. Automatic deployment, free HTTPS
3. To update: drag folder again or connect to GitHub

### Option 2: Vercel (Free)
1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repo or upload folder
3. Auto-deploys on push to main branch

### Option 3: GitHub Pages (Free)
1. Push folder to GitHub repo
2. Enable Pages in Settings → GitHub Pages
3. Choose main branch as source
4. Site publishes at `yourusername.github.io/repo-name`

### Option 4: Traditional Web Hosting (cPanel, FTP)
1. Log into cPanel or FTP
2. Navigate to `public_html/` folder
3. Upload all files maintaining folder structure
4. Site is live at your domain

### Option 5: AWS S3 + CloudFront
1. Create S3 bucket with public access
2. Upload files maintaining folder structure
3. Configure CloudFront for HTTPS + caching
4. Point domain via Route53

---

## 📞 Contact & Support

**Company:** Mugdha Constructions LLP  
**Phone:** 9951028866  
**Email:** info@mugdhas.com  
**Location:** D.No. 46-139, 1475/601, Revenue Ward No. 46, Ongole, Prakasam District, AP – 523002  
**WhatsApp:** https://wa.me/919951028866

---

## ⚖️ Copyright & Licensing

**© 2024 Mugdha Constructions LLP. All rights reserved.**

- ✅ Tagline: "Building Trust. Shaping Structures."
- ✅ Logo & branding: Owned by Mugdha Constructions LLP
- ✅ Images: Use only images you own or have licensed rights to use
- ✅ Keep proper attribution for any 3rd-party licensed content

**Important:** Only upload images you own or are properly licensed to use (Creative Commons with commercial rights, purchased stock images, etc.). Respect copyright laws. 🔒

---

## 🛠️ Troubleshooting

### Form not working?
- Check `js/quote-form.js` for validation logic
- Ensure all form inputs match the expected selectors
- Check browser console (F12) for errors

### Images not loading?
- Verify file path is correct: `assets/images/filename.ext`
- Check that image file exists in folder
- Try clearing browser cache (Ctrl+Shift+Delete)

### Logo looks cut off?
- Check logo dimensions (should be square, 56x56px minimum)
- Check CSS in `css/layout.css` — `.site-logo__icon` styles

### Styling looks wrong?
- Clear browser cache
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check for CSS typos or missing files

### WhatsApp link not working on desktop?
- On desktop, WhatsApp links open in web.whatsapp.com
- Mobile users will open the native app (automatic)

---

## 📚 Additional Resources

- **HTML Guide:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS Guide:** [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Web Fonts:** [Google Fonts](https://fonts.google.com) (used: Cinzel, Inter)
- **Image Optimization:** [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app)
- **SEO:** [Google Search Central](https://developers.google.com/search)
- **Web Performance:** [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 🎉 You're All Set!

The website is production-ready. Start editing, deploy, and grow your business! 🚀

**Questions?** Refer to `SITE-CONTENT-INSTRUCTIONS.txt` for quick content updates, or reach out to support.

---

**Last Updated:** August 2024  
**Version:** 1.0
