import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesDir = join(__dirname, 'articles');

// All articles with metadata for cross-linking
const allArticles = [
  { slug: 'navigating-the-care-paradox', title: 'Navigating the Care Paradox', category: 'Care', image: '/assets/images/care_paradox.png', excerpt: "The invisible weight of love: when caregiving spans generations — and the financial toll no one talks about." },
  { slug: 'the-multi-generational-blueprint', title: 'The Multi-Generational Blueprint', category: 'Family', image: '/assets/images/family_lodge.png', excerpt: "The families that endure don't just pass down assets — they pass down architecture." },
  { slug: 'the-architecture-of-legacy', title: 'The Architecture of Legacy', category: 'Legal', image: '/assets/images/architecture_of_legacy.png', excerpt: "What you inherit isn't always wealth. Sometimes it's a way of seeing the world." },
  { slug: 'precision-longevity-protocols', title: 'Precision Longevity Protocols', category: 'Health', image: '/assets/images/longevity_protocols.png', excerpt: "The science of living longer is no longer theoretical — it's a financial planning variable." },
  { slug: 'the-rightsizing-framework', title: 'The Rightsizing Framework', category: 'Housing', image: '/assets/images/rightsizing_framework.png', excerpt: "Your home is your largest asset. Rightsizing isn't downsizing — it's optimizing." },
  { slug: 'estate-preservation-in-volatility', title: 'Estate Preservation in Volatility', category: 'Wealth', image: '/assets/images/estate_volatility.png', excerpt: "Markets shift. Tax laws change. The estates that survive are the ones designed for uncertainty." },
];

// Pick 3 related articles (not self)
function getRelatedArticles(currentSlug) {
  const others = allArticles.filter(a => a.slug !== currentSlug);
  // Return first 3 (will create a nice rotation)
  // Shuffle based on current slug to vary per article
  const hash = currentSlug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = [...others].sort((a, b) => {
    const ha = a.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const hb = b.slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return ((ha + hash) % 7) - ((hb + hash) % 7);
  });
  return shuffled.slice(0, 3);
}

// Sidebar Premium Card HTML
const sidebarPremiumHTML = `
    <!-- Right Rail: Cross-Sell -->
    <aside class="article-sidebar">
      <div class="sidebar-premium-card">
        <div class="sidebar-premium-card__label">MAEVE Premium</div>
        <div class="sidebar-premium-card__title">Navigate life's biggest transitions with confidence.</div>
        <div class="sidebar-premium-card__text">This article is a starting point. Premium members get the full toolkit — personalized guidance, expert frameworks, and a community of women navigating similar crossroads.</div>
        <ul class="sidebar-premium-card__features">
          <li>Transition Radar™ assessment</li>
          <li>Personalized care-planning tools</li>
          <li>Expert-led monthly workshops</li>
          <li>Private community of 500+ women</li>
          <li>One-on-one guidance sessions</li>
        </ul>
        <a href="/join.html" class="sidebar-premium-card__cta">Explore Premium →</a>
      </div>
    </aside>`;

// Final Premium CTA HTML
const finalPremiumCTA = `
  <!-- FINAL PREMIUM CTA -->
  <section class="final-premium-cta">
    <div class="final-premium-cta__label">MAEVE Premium</div>
    <h2 class="final-premium-cta__title">You've read the perspective.<br/>Imagine having the guide.</h2>
    <p class="final-premium-cta__text">MAEVE Premium turns insight into action — with personalized tools, expert guidance, and a community of women who understand exactly where you are.</p>
    <a href="/join.html" class="final-premium-cta__button">
      Start Here
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    </a>
  </section>`;

// Build related articles HTML (3-card grid matching Care Paradox)
function buildRelatedHTML(related) {
  const cards = related.map(a => `      <a href="/articles/${a.slug}.html" class="related-card article-reveal">
        <img src="${a.image}" alt="${a.title}" class="related-card__image" loading="lazy" />
        <div class="related-card__category">${a.category}</div>
        <div class="related-card__title">${a.title}</div>
        <p class="related-card__excerpt">${a.excerpt}</p>
      </a>`).join('\n');

  return `  <!-- RELATED ARTICLES -->
  <section class="related-articles">
    <div class="related-articles__title">Continue Reading — The Long View</div>
    <div class="related-articles__grid">
${cards}
    </div>
  </section>`;
}

// Files to patch (the 5 generated articles)
const filesToPatch = [
  'the-multi-generational-blueprint',
  'the-architecture-of-legacy',
  'precision-longevity-protocols',
  'the-rightsizing-framework',
  'estate-preservation-in-volatility',
];

for (const slug of filesToPatch) {
  const filePath = join(articlesDir, `${slug}.html`);
  let html = readFileSync(filePath, 'utf-8');

  // 1. Add sidebar premium AFTER </article> but BEFORE the closing </div> of article-layout
  //    Current: </article>\n  </div>
  //    Target:  </article>\n  SIDEBAR\n  </div>
  html = html.replace(
    /(<\/article>\s*\n)(\s*<\/div>)/,
    `$1${sidebarPremiumHTML}\n$2`
  );

  // 2. Replace the existing Related Articles section with the 3-card version
  const related = getRelatedArticles(slug);
  const newRelatedHTML = buildRelatedHTML(related);
  
  html = html.replace(
    /\s*<!-- RELATED ARTICLES -->[\s\S]*?<\/section>\s*\n/,
    `\n\n${newRelatedHTML}\n\n`
  );

  // 3. Add Final Premium CTA between Related Articles and Footer
  html = html.replace(
    /(<\/section>\s*\n\n)(\s*<!-- FOOTER -->)/,
    `$1${finalPremiumCTA}\n\n  $2`
  );

  writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Patched: ${slug}.html`);
}

// Also fix the Care Paradox related links (currently href="#")
const careParadoxPath = join(articlesDir, 'navigating-the-care-paradox.html');
let careHtml = readFileSync(careParadoxPath, 'utf-8');
careHtml = careHtml.replace(
  /<a href="#" class="related-card article-reveal">\s*<img src="\/assets\/images\/architecture_of_legacy\.png"/,
  '<a href="/articles/the-architecture-of-legacy.html" class="related-card article-reveal">\n        <img src="/assets/images/architecture_of_legacy.png"'
);
// Fix the other two # links in Care Paradox (they reference unpublished articles, point to Long View)
careHtml = careHtml.replace(
  /<a href="#" class="related-card article-reveal">\s*<img src="\/assets\/images\/suddenly-single\.png"/,
  '<a href="/the-long-view.html" class="related-card article-reveal">\n        <img src="/assets/images/suddenly-single.png"'
);
careHtml = careHtml.replace(
  /<a href="#" class="related-card article-reveal">\s*<img src="\/assets\/images\/sandwich-generation\.png"/,
  '<a href="/the-long-view.html" class="related-card article-reveal">\n        <img src="/assets/images/sandwich-generation.png"'
);
writeFileSync(careParadoxPath, careHtml, 'utf-8');
console.log('✅ Patched: navigating-the-care-paradox.html (fixed related links)');

console.log('\n🎉 All articles patched with Premium sidebar, Final CTA, and 3-article Continue Reading grid.');
