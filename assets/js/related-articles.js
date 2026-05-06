/* related-articles.js — populates the "Más artículos" grid on article pages.
   Reads /articulos/articles.json, excludes the current article (by slug),
   picks 3 random articles, renders cards into .related-grid.

   Each article's grid div should ideally set:
     <div class="related-grid" data-article-slug="my-slug"></div>
   so the article does not link to itself in its own related list.
   If the attribute is missing the script still works — it just may
   surface the current article among the related cards. */

(function () {
  const grid = document.querySelector('.related-grid');
  if (!grid) return;

  const currentSlug = grid.dataset.articleSlug || '';

  fetch('/articulos/articles.json')
    .then(r => r.json())
    .then(articles => {
      /* Exclude any hub-like sentinel entries and the current article */
      const candidates = articles.filter(a => {
        const slug = a.url.replace(/^\/|\/$/g, '');
        return slug !== currentSlug && !a.url.includes('/./');
      });

      /* Shuffle and pick up to 3 */
      const picked = candidates
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      if (picked.length === 0) {
        const wrap = grid.closest('.article-related');
        if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
        return;
      }

      grid.innerHTML = picked.map(a => `
        <a href="${a.url}" class="related-card">
          <img src="${a.image}" alt="${a.title.replace(/"/g, '&quot;')}" loading="lazy">
          <div class="related-card-body">
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
          </div>
        </a>
      `).join('');
    })
    .catch(() => {
      /* If articles.json doesn't exist yet, hide the section silently */
      const wrap = grid.closest('.article-related');
      if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    });
})();
