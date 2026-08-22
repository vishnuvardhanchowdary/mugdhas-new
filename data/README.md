# Mugdha Constructions LLP — Website Data Management (CMS Guide)

This guide explains how to manage content, add/edit/delete projects, update plot availability counters, change photos, or update contact details after hosting your website.

---

## 📂 File Structure Overview

- **`data/projects.json`**: Controls all projects shown on the **Projects** page (`projects.html`) and the **Project Detail** page (`project-detail.html`).
- **`assets/images/`**: Stores all website photos and images.
- **`contact.html` & `index.html`**: Contains company contact info, address, telephone numbers, and email links.

---

## 🏗️ 1. Managing Projects (`data/projects.json`)

To add, edit, or remove projects from the website, edit `data/projects.json` using any text editor or code editor (e.g. VS Code, Notepad).

### ➕ Adding a New Project
Add a new JSON object to the array in `data/projects.json`:

```json
{
  "slug": "sri-lakshmi-enclave",
  "name": "Sri Lakshmi Enclave",
  "location": "Pothavaram, Ongole, Prakasam Dist.",
  "status": "upcoming",
  "totalPlots": 50,
  "soldPlots": 5,
  "description": "Premium gated residential township with 40ft wide blacktop roads, underground drainage, and 24/7 security.",
  "images": [
    "assets/images/project-placeholder.jpg"
  ],
  "features": [
    "APCRDA approved layout",
    "40 feet wide BT roads",
    "Underground electricity & drainage",
    "Avenue plantation & park area"
  ],
  "bookingDetails": "Advance booking open. Contact 9951028866 for plot reservations.",
  "highlights": {
    "plotSizes": "180 - 350 sq. yards",
    "facing": "East, West & North",
    "possession": "December 2026"
  }
}
```

*Status options:* `"ongoing"`, `"upcoming"`, or `"completed"`.

---

### 📊 Updating Plot Availability (e.g., Plots Sold Counter)
To update plot counters (e.g., from 42 to 45 plots sold):
1. Open `data/projects.json`
2. Find the project (e.g., `bhagya-nagar`)
3. Change `"soldPlots": 45`
4. Save the file. The website counter and progress bar will update automatically!

---

### ❌ Deleting a Project
To remove a project:
1. Open `data/projects.json`
2. Delete the project entry from `{ ... }` including the trailing comma.
3. Save the file.

---

## 🖼️ 2. Adding / Changing Photos

1. Copy your new image file (JPEG or PNG format) into `assets/images/`
   *(Example: `assets/images/my-new-photo.jpg`)*
2. In `data/projects.json` or HTML files, update the `src` attribute:
   ```json
   "images": [
     "assets/images/my-new-photo.jpg"
   ]
   ```

---

## 📱 3. Hosting & Deployment Options

When hosting your site on services like **Netlify**, **Vercel**, **GitHub Pages**, or **Hostinger**:
- Simply upload the entire project folder (or push to a GitHub repository).
- Whenever you update `data/projects.json` or add photos to `assets/images/`, commit and push or re-upload the folder. The changes go live instantly!

---

## 📞 Support & Contacts
- **Company**: Mugdha Constructions LLP
- **Phone**: +91 9951028866
- **Email**: Sales@mugdhas.com
