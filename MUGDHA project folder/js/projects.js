/* ============================================
   MUGDHA CONSTRUCTIONS LLP — Projects JS
   Fetch, filter, render project cards from JSON
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projects-grid');
  const tabs = document.querySelectorAll('.filter-tab');

  if (!grid) return;

  const DEFAULT_PROJECTS = [
    {
  id: "radha-krishna-enclave",
  slug: "radha-krishna-enclave",
  name: "Radha Krishna Enclave",
  title: "Radha Krishna Enclave",

  location: "Near Police Quarters, 80 Feet Road, Vasavi Colony, Ongole",

  status: "ongoing",

  totalPlots: null,
  soldPlots: null,
  plots: null,

  brochure: "assets/brochures/radha-krishna-enclave-brochure.pdf",

  description: [
    "Radha Krishna Enclave is a premium residential apartment project in Ongole, offering spacious 3 BHK homes with modern design, quality construction, and comfortable living spaces."
  ],

  images: [
    "assets/images/radha-krishna-enclave-1.png",
    "assets/images/radha-krishna-enclave-2.png",
    "assets/images/radha-krishna-enclave-3.png"
  ],

  features: [
    "Luxurious 3 BHK Flats",
    "R.C.C. Framed Structure",
    "Premium Quality Tiles",
    "UPVC Windows with Mesh and Grill",
    "Granite Cooking Platform",
    "Municipal and Bore Water Supply",
    "Generator Backup for Common Areas",
    "Lift Facility",
    "Premium Electrical Fittings",
    "Teak Wood Main Door Frame"
  ]
},
    {
      id: "mugdha-serene-park",
      slug: "mugdha-serene-park",
      name: "Mugdha Serene Park",
      title: "Mugdha Serene Park",
      location: "East & South 40 Feet Road Junction, Ongole",
      status: "ongoing",
      totalPlots: 20,
      soldPlots: 14,
      plots: { total: 20, sold: 14 },
      description: ["Modern multi-storey luxury apartment complex featuring contemporary architecture, wooden accent paneling, spacious balconies, and private gated entry."],
      images: ["assets/images/mugdha-serene-park.jpg"],
      features: [
        "Contemporary 5-storey luxury apartment design",
        "Prime corner location on 40-foot wide roads",
        "Private gated compound with dedicated parking",
        "Spacious balconies with glass railings & green views",
        "Elevator, 24/7 power backup & water supply",
        "100% Vasthu compliant floor plans"
      ]
    },
    {
      id: "mugdha-prime-heights",
      slug: "mugdha-prime-heights",
      name: "Mugdha Prime Heights",
      title: "Mugdha Prime Heights",
      location: "Revenue Ward No. 46, Ongole, Andhra Pradesh",
      status: "completed",
      totalPlots: 24,
      soldPlots: 24,
      plots: { total: 24, sold: 24 },
      description: ["Successfully completed and delivered 5-storey premium residential apartment project in Ongole. Features modern elevation, 24/7 power backup, covered parking, and 100% Vasthu compliant 2 & 3 BHK flats."],
      images: ["assets/images/supervision.jpg", "assets/images/mugdha-serene-park.jpg"],
      features: [
        "100% Sold & Successfully Handed Over to Owners",
        "DTCP Approved 5-Storey Residential Structure",
        "High-speed Automatic Elevator & 24/7 Generator Backup",
        "Premium Exterior Elevation with Teak & Glass Balconies",
        "Covered Stilt Parking & Gated Entry Compound"
      ]
    },
    {
      id: "mugdha-commercial-plaza",
      slug: "mugdha-commercial-plaza",
      name: "Mugdha Commercial & HVAC Plaza",
      title: "Mugdha Commercial & HVAC Plaza",
      location: "Miyapur Main Road, Hyderabad, Telangana",
      status: "completed",
      totalPlots: 16,
      soldPlots: 16,
      plots: { total: 16, sold: 16 },
      description: ["Comprehensive civil structural construction and central VRF HVAC installation for a multi-tenant commercial plaza in Miyapur, Hyderabad. Delivered on time with high energy efficiency standards."],
      images: ["assets/images/hvac-installation.jpg", "assets/images/hero-construction.jpg"],
      features: [
        "Complete Civil Structural Construction & Central HVAC Installation",
        "Energy-efficient Central VRF Cooling System & Ductwork",
        "Structural Steel & Reinforced Concrete Framework",
        "Modern Glass Facade & Fire Safety Compliance"
      ]
    },
    {
      id: "upcoming-luxury-villas",
      slug: "upcoming-luxury-villas",
      name: "Mugdha Green Villas",
      title: "Mugdha Green Villas",
      location: "Ongole, Andhra Pradesh",
      status: "upcoming",
      totalPlots: null,
      soldPlots: null,
      plots: null,
      description: ["Upcoming luxury villa project featuring modern architecture, sustainable design, and premium amenities. Pre-launch registrations opening soon."],
      images: ["assets/images/project-placeholder.jpg"],
      features: [
        "Contemporary villa designs",
        "Eco-friendly construction practices",
        "Premium community amenities"
      ]
    }
  ];

  let allProjects = [];

  async function loadProjects() {
    try {
      const res = await fetch('data/projects.json');
      if (!res.ok) throw new Error('HTTP status ' + res.status);
      const data = await res.json();
      allProjects = data.projects;
    } catch (err) {
      console.warn('Could not fetch data/projects.json (CORS/file:// restriction), using embedded project fallback dataset:', err);
      allProjects = DEFAULT_PROJECTS;
    }
    renderProjects('all');
  }

  function renderProjects(filter) {
    const filtered = filter === 'all'
      ? allProjects
      : allProjects.filter(p => p.status === filter);

    // Animate out
    const existingCards = grid.querySelectorAll('.project-card');
    existingCards.forEach(card => card.classList.add('hiding'));

    setTimeout(() => {
      grid.innerHTML = '';

      if (filtered.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">No projects in this category yet.</p>';
        return;
      }

      filtered.forEach((project, index) => {
        const card = createProjectCard(project);
        card.style.animationDelay = `${index * 80}ms`;
        card.classList.add('showing');
        grid.appendChild(card);
      });
    }, 200);
  }

  function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';

    const badgeClass = `project-card__badge--${project.status}`;
    const statusLabel = project.status.charAt(0).toUpperCase() + project.status.slice(1);

    const detailLink = project.slug ? `project-detail.html?project=${project.slug}` : '#';

    card.innerHTML = `
      <div class="project-card__image img-zoom">
        <img src="${project.images[0] || 'assets/images/project-placeholder.jpg'}" alt="${project.name} — ${project.location}" loading="lazy" width="600" height="375">
        <span class="project-card__badge ${badgeClass}">${statusLabel}</span>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${project.name}</h3>
        <div class="project-card__location">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          ${project.location}
        </div>
        <p class="project-card__text">${Array.isArray(project.description) ? project.description.join(' ') : project.description}</p>
        <div style="margin-top: var(--space-4); display: flex; justify-content: space-between; align-items: center; gap: 10px;">
          <a href="${detailLink}" class="card__link arrow-nudge" style="display: inline-flex;">
            View Details
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </a>
          ${project.brochure ? `
            <a href="${project.brochure}" download class="btn btn--outline btn--small" style="padding: 5px 12px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px; border-color: var(--color-primary); color: var(--color-primary);">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Brochure
            </a>
          ` : ''}
        </div>
      </div>
    `;

    return card;
  }

  // Filter tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.getAttribute('data-filter'));
    });
  });

  loadProjects();
});
