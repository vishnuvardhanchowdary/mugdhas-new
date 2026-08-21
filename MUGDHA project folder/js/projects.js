/* ============================================
   MUGDHA CONSTRUCTIONS LLP — Projects JS
   Fetch, filter, render project cards from JSON
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projects-grid');
  const tabs = document.querySelectorAll('.filter-tab');

  if (!grid) return;

  let allProjects = [];

  async function loadProjects() {
    try {
      const res = await fetch('data/projects.json');
      const data = await res.json();
      allProjects = data.projects;
      renderProjects('all');
    } catch (err) {
      console.error('Failed to load projects:', err);
      grid.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">Projects coming soon.</p>';
    }
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

    const plotBarHTML = project.totalPlots ? `
      <div class="plot-bar">
        <div class="plot-bar__header">
          <span class="plot-bar__count"><span data-count-to="${project.soldPlots}">${project.soldPlots}</span> Sold</span>
          <span class="plot-bar__total">of ${project.totalPlots} Plots</span>
        </div>
        <div class="plot-bar__track">
          <div class="plot-bar__fill" data-width="${Math.round((project.soldPlots / project.totalPlots) * 100)}" style="width: ${Math.round((project.soldPlots / project.totalPlots) * 100)}%"></div>
        </div>
      </div>
    ` : '';

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
        <p class="project-card__text">${project.description}</p>
        ${plotBarHTML}
        <a href="${detailLink}" class="card__link arrow-nudge" style="margin-top: var(--space-4); display: inline-flex;">
          View Details
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </a>
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
