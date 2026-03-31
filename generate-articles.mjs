/**
 * Article Page Generator for MAEVE Editorial
 * Fetches article data from Supabase REST API and generates article HTML pages
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://struhccfsxvfmfsffsbr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cnVoY2Nmc3h2Zm1mc2Zmc2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTQxOTYsImV4cCI6MjA4NTY3MDE5Nn0.5lBrnJoeRjiaK83OizRDDsfEi14PcilyDx3oLe1i1iU';

async function fetchArticle(slug) {
  const url = `${SUPABASE_URL}/rest/v1/articles?slug=eq.${slug}&select=*`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    }
  });
  const data = await res.json();
  return data[0];
}

function markdownToHtml(md) {
  if (!md) return '';
  let html = md;
  
  // Escaped quotes
  html = html.replace(/\\"/g, '"');
  
  // Blockquotes with attribution
  html = html.replace(/^> "(.+?)"\s*\n^> — (.+)$/gm, (_, quote, cite) => {
    return `<blockquote class="pull-quote article-reveal">"${quote}"\n<cite>— ${cite}</cite></blockquote>`;
  });
  
  // Simple blockquotes
  html = html.replace(/^> (.+)$/gm, (_, content) => {
    if (content.startsWith('—') || content.startsWith('— ')) {
      return `<cite>${content}</cite>`;
    }
    return `<blockquote class="pull-quote article-reveal">${content}</blockquote>`;
  });
  
  // Headers - must happen before paragraph wrapping
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<!--SECTION_BREAK-->\n<h2>$1</h2>');
  
  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, '<em>$1</em>');
  
  // Unordered lists
  html = html.replace(/(^- .+\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map(line => 
      `  <li>${line.replace(/^- /, '')}</li>`
    ).join('\n');
    return `<ul class="article-list">\n${items}\n</ul>`;
  });
  
  // Paragraphs
  const lines = html.split('\n');
  const result = [];
  let firstParagraph = true;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) { result.push(''); continue; }
    
    // Skip lines that are already HTML tags
    if (line.startsWith('<') || line.startsWith('<!--')) {
      result.push(lines[i]);
      continue;
    }
    
    // Wrap plain text in paragraph tags
    if (firstParagraph) {
      result.push(`<p class="drop-cap">${line}</p>`);
      firstParagraph = false;
    } else {
      result.push(`<p>${line}</p>`);
    }
  }
  
  html = result.join('\n');
  
  // Now wrap sections
  const sectionParts = html.split('<!--SECTION_BREAK-->');
  let finalHtml = '';
  
  for (let i = 0; i < sectionParts.length; i++) {
    const part = sectionParts[i].trim();
    if (!part) continue;
    
    // Extract h2 title for section ID
    const h2Match = part.match(/<h2>(.+?)<\/h2>/);
    if (h2Match) {
      const title = h2Match[1];
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      finalHtml += `\n<section id="${id}">\n${part}\n</section>\n`;
    } else {
      // First section (before any h2)
      finalHtml += part;
    }
  }

  return finalHtml;
}

function generateTocItems(md) {
  if (!md) return [];
  const headings = [];
  const regex = /^## (.+)$/gm;
  let match;
  while ((match = regex.exec(md)) !== null) {
    const title = match[1];
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ id, title });
  }
  return headings;
}

function generateFaqHtml(faqs) {
  if (!faqs || !faqs.length) return '';
  let html = '<section id="faq">\n<h2>Frequently Asked Questions</h2>\n<div class="faq-section">\n';
  for (const faq of faqs) {
    html += `<details class="faq-item article-reveal">
  <summary class="faq-question">${faq.question}</summary>
  <div class="faq-answer"><p>${faq.answer}</p></div>
</details>\n`;
  }
  html += '</div>\n</section>';
  return html;
}

function generateTakeawaysHtml(takeaways) {
  if (!takeaways || !takeaways.length) return '';
  let html = '<div class="key-takeaways article-reveal">\n  <div class="key-takeaways__title">Key Takeaways</div>\n  <ul>\n';
  for (const t of takeaways) {
    html += `    <li>${t}</li>\n`;
  }
  html += '  </ul>\n</div>';
  return html;
}

function escAttr(s) {
  return (s || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function generateArticlePage(article) {
  const tocItems = generateTocItems(article.content_markdown);
  const articleBodyHtml = markdownToHtml(article.content_markdown);
  const takeawaysHtml = generateTakeawaysHtml(article.key_takeaways);
  const faqHtml = generateFaqHtml(article.faq);
  const keywords = (article.seo_keywords || []).join(', ');
  const categoryLower = (article.category || '').toLowerCase();
  const heroImage = article.hero_image_url || '';

  const tocHtml = tocItems.map((item, i) => 
    `        <li class="article-toc__item"><a href="#${item.id}" class="article-toc__link${i === 0 ? ' active' : ''}">${item.title}</a></li>`
  ).join('\n');

  const faqJsonLd = (article.faq && article.faq.length) ? `\n  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  }, null, 2)}
  </script>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${article.title} — MAEVE | The Long View</title>
  <meta name="description" content="${escAttr(article.seo_description || article.subtitle)}" />
  <meta name="author" content="MAEVE Editorial" />
  <meta name="keywords" content="${keywords}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escAttr(article.title)}" />
  <meta property="og:description" content="${escAttr(article.subtitle)}" />
  <meta property="og:image" content="${heroImage}" />
  <meta property="og:url" content="https://mymaeve.com/articles/${article.slug}" />
  <meta property="og:site_name" content="MAEVE — The Long View" />
  <meta property="article:published_time" content="2026-03-31T12:00:00Z" />
  <meta property="article:section" content="${article.category}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escAttr(article.title)} — MAEVE" />
  <meta name="twitter:description" content="${escAttr(article.subtitle)}" />
  <meta name="twitter:image" content="${heroImage}" />
  <link rel="canonical" href="https://mymaeve.com/articles/${article.slug}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#001a0e',
            secondary: '#f5f0e8',
            accent: '#486554',
            'accent-light': '#6b8f7b',
            surface: '#fdfbf7',
            'surface-dim': '#efeeeb',
            'warm-grey': '#b8b2a8',
            'dark-brown': '#3d2e22',
          },
          fontFamily: {
            serif: ['Noto Serif', 'Georgia', 'serif'],
            sans: ['DM Sans', 'system-ui', 'sans-serif'],
            label: ['Plus Jakarta Sans', 'DM Sans', 'sans-serif'],
          },
        },
      },
    };
  </script>
  <link rel="stylesheet" href="/css/style.css" />
  <link rel="stylesheet" href="/css/article.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${escAttr(article.title)}",
    "description": "${escAttr(article.seo_description)}",
    "image": "${heroImage}",
    "datePublished": "2026-03-31T12:00:00Z",
    "author": { "@type": "Organization", "name": "MAEVE Editorial", "url": "https://mymaeve.com" },
    "publisher": { "@type": "Organization", "name": "MAEVE", "url": "https://mymaeve.com" },
    "articleSection": "${article.category}",
    "wordCount": ${article.word_count || 3000}
  }
  </script>${faqJsonLd}
</head>

<body class="bg-surface text-primary antialiased">
  <div class="reading-progress" id="readingProgress"></div>

  <style>
    .slanted-a { position: relative; display: inline-block; }
    .slanted-a::after { content: ''; position: absolute; top: 52%; left: 17%; width: 66%; height: 0.07em; background-color: currentColor; transform: rotate(-12deg); transform-origin: center; border-radius: 1px; }
  </style>

  <!-- NAVIGATION -->
  <header class="bg-[#faf9f6] fixed top-0 left-0 w-full z-50">
    <div class="flex justify-between items-center w-full px-6 md:px-12 py-5 md:py-6 max-w-[1440px] mx-auto">
      <a href="/index.html" class="flex-shrink-0 font-['Noto_Serif'] text-xl md:text-2xl font-bold text-[#001a0e] tracking-tight uppercase"><span aria-hidden="true">M<span class="slanted-a">&Lambda;</span>EVE</span><span class="sr-only">MAEVE</span></a>
      <div class="hidden md:flex items-center space-x-12 font-['Noto_Serif'] text-lg tracking-tight">
        <a class="text-[#1a1c1a]/70 font-medium hover:text-[#001a0e] transition-colors duration-300" href="/the-long-view.html" style="text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 2px;">The Long View</a>
        <a class="text-[#1a1c1a]/70 font-medium hover:text-[#001a0e] transition-colors duration-300" href="/tools.html">Tools</a>
        <a class="text-[#1a1c1a]/70 font-medium hover:text-[#001a0e] transition-colors duration-300" href="/community.html">Community</a>
        <a class="text-[#1a1c1a]/70 font-medium hover:text-[#001a0e] transition-colors duration-300" href="/for-advisors.html">For Advisors</a>
        <a class="text-[#4a6b5d] italic font-medium hover:text-[#001a0e] transition-colors duration-300" href="/podcast.html">Podcast</a>
      </div>
      <div class="flex items-center gap-6">
        <button class="hidden md:inline-flex bg-[#001a0e] text-[#faf9f6] px-6 py-2 rounded-sm font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest hover:opacity-80 transition-opacity duration-500 ease-in-out">Start Here →</button>
        <button class="nav__toggle md:hidden flex flex-col gap-[5px] bg-transparent p-2 cursor-pointer border-none" aria-label="Toggle menu" aria-expanded="false">
          <span class="block w-6 h-0.5 bg-[#001a0e] rounded-sm transition-all duration-300"></span>
          <span class="block w-6 h-0.5 bg-[#001a0e] rounded-sm transition-all duration-300"></span>
          <span class="block w-6 h-0.5 bg-[#001a0e] rounded-sm transition-all duration-300"></span>
        </button>
      </div>
    </div>
    <div class="bg-[#efeeeb] h-[1px] w-full"></div>
  </header>

  <div class="mobile-menu fixed inset-0 bg-[#faf9f6] z-[999] flex flex-col items-center justify-center gap-7 opacity-0 pointer-events-none transition-opacity duration-400" role="dialog" aria-label="Mobile navigation">
    <a href="/index.html" class="mobile-menu__link font-serif font-light text-3xl text-[#001a0e] no-underline opacity-0 translate-y-4 transition-all duration-400">Home</a>
    <a href="/the-long-view.html" class="mobile-menu__link font-serif font-light text-3xl text-[#001a0e] no-underline opacity-0 translate-y-4 transition-all duration-400">The Long View</a>
    <a href="/tools.html" class="mobile-menu__link font-serif font-light text-3xl text-[#001a0e] no-underline opacity-0 translate-y-4 transition-all duration-400">Tools</a>
    <a href="/community.html" class="mobile-menu__link font-serif font-light text-3xl text-[#001a0e] no-underline opacity-0 translate-y-4 transition-all duration-400">Community</a>
    <a href="/for-advisors.html" class="mobile-menu__link font-serif font-light text-3xl text-[#001a0e] no-underline opacity-0 translate-y-4 transition-all duration-400">For Advisors</a>
    <a href="/podcast.html" class="mobile-menu__link font-serif italic font-light text-3xl text-[#4a6b5d] hover:text-[#001a0e] no-underline opacity-0 translate-y-4 transition-all duration-400">Podcast</a>
  </div>

  <!-- BREADCRUMB -->
  <div class="max-w-[1100px] mx-auto px-6">
    <nav class="article-breadcrumb" aria-label="Breadcrumb">
      <a href="/the-long-view.html">The Long View</a>
      <span class="separator">›</span>
      <a href="/the-long-view.html#${categoryLower}">${article.category}</a>
      <span class="separator">›</span>
      <span>${article.title}</span>
    </nav>
  </div>

  <!-- HERO -->
  <header class="article-hero">
    <span class="article-category">${article.category}</span>
    <h1>${article.title}</h1>
    <p class="article-deck">${article.subtitle || ''}</p>
    <div class="article-byline">
      <span class="author-name">MAEVE Editorial</span>
      <span class="dot"></span>
      <span>${article.read_time_minutes || 15} min read</span>
      <span class="dot"></span>
      <time datetime="2026-03-31">March 31, 2026</time>
    </div>
  </header>

  <!-- HERO IMAGE -->
  <figure class="article-hero-image px-6">
    <img src="${heroImage}" alt="${escAttr(article.title)}" width="1100" height="620" loading="eager" />
    <figcaption>${article.title} — MAEVE Editorial</figcaption>
  </figure>

  <!-- ARTICLE LAYOUT -->
  <div class="article-layout">
    <aside class="article-toc" aria-label="Table of contents">
      <div class="article-toc__title">In This Article</div>
      <ul class="article-toc__list">
${tocHtml}
${article.faq?.length ? '        <li class="article-toc__item"><a href="#faq" class="article-toc__link">FAQ</a></li>' : ''}
      </ul>
      <div class="share-widget">
        <span class="share-widget__label">Share</span>
        <button class="share-widget__btn" onclick="navigator.clipboard.writeText(window.location.href)" title="Copy link">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        </button>
        <a href="https://twitter.com/intent/tweet?url=https://mymaeve.com/articles/${article.slug}&text=${encodeURIComponent(article.title)}%20—%20MAEVE" target="_blank" rel="noopener" class="share-widget__btn" title="Share on X">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://mymaeve.com/articles/${article.slug}" target="_blank" rel="noopener" class="share-widget__btn" title="Share on LinkedIn">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
      </div>
    </aside>

    <article class="article-body" id="article-content">
      ${takeawaysHtml}
      ${articleBodyHtml}
      ${faqHtml}
    </article>
  </div>

  <!-- RELATED ARTICLES -->
  <section class="related-articles">
    <div class="max-w-[1100px] mx-auto px-6">
      <h3 class="related-articles__title">Continue Reading</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a href="/articles/navigating-the-care-paradox.html" class="group block">
          <div class="aspect-[16/9] bg-[#efeeeb] overflow-hidden mb-4 grayscale-hover">
            <img src="/assets/images/care_paradox.png" alt="Navigating the Care Paradox" class="w-full h-full object-cover" />
          </div>
          <span class="font-label text-[10px] uppercase tracking-[2px] text-accent-light mb-1 block">Care</span>
          <h4 class="font-serif text-xl text-primary group-hover:underline underline-offset-4 decoration-1">Navigating the Care Paradox</h4>
        </a>
        <a href="/the-long-view.html" class="group block">
          <div class="aspect-[16/9] bg-[#efeeeb] overflow-hidden mb-4 flex items-center justify-center">
            <span class="font-serif text-2xl text-primary/20">Browse All Articles</span>
          </div>
          <span class="font-label text-[10px] uppercase tracking-[2px] text-accent-light mb-1 block">Editorial</span>
          <h4 class="font-serif text-xl text-primary group-hover:underline underline-offset-4 decoration-1">The Long View — All Articles</h4>
        </a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="article-footer">
    <div class="max-w-[1100px] mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div class="col-span-2">
          <a href="/index.html" class="font-serif text-xl font-bold text-secondary mb-4 block">MAEVE</a>
          <p class="text-sm text-secondary/50 leading-relaxed max-w-sm">Editorial intelligence for life's most significant transitions. Guiding the generational transfer of wisdom and wealth.</p>
        </div>
        <div>
          <h4 class="font-label text-[10px] font-bold tracking-[2.5px] uppercase text-secondary/30 mb-4">Explore</h4>
          <div class="flex flex-col gap-2">
            <a href="/the-long-view.html#wealth" class="text-sm text-secondary/50 hover:text-secondary/80 transition-colors">Wealth</a>
            <a href="/the-long-view.html#legacy" class="text-sm text-secondary/50 hover:text-secondary/80 transition-colors">Legacy</a>
            <a href="/the-long-view.html#care" class="text-sm text-secondary/50 hover:text-secondary/80 transition-colors">Care</a>
            <a href="/the-long-view.html#stewardship" class="text-sm text-secondary/50 hover:text-secondary/80 transition-colors">Stewardship</a>
          </div>
        </div>
        <div>
          <h4 class="font-label text-[10px] font-bold tracking-[2.5px] uppercase text-secondary/30 mb-4">Legal</h4>
          <div class="flex flex-col gap-2">
            <a href="#" class="text-sm text-secondary/50 hover:text-secondary/80 transition-colors">Privacy Policy</a>
            <a href="#" class="text-sm text-secondary/50 hover:text-secondary/80 transition-colors">Terms of Service</a>
            <a href="#" class="text-sm text-secondary/50 hover:text-secondary/80 transition-colors">Disclosures</a>
          </div>
        </div>
      </div>
      <div class="border-t border-secondary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-secondary/30">© 2026 MAEVE. All rights reserved. Editorial content is for informational purposes only and does not constitute financial, legal, or medical advice.</p>
      </div>
    </div>
  </footer>

  <script src="/js/main.js"></script>
  <script>
    (function() {
      const progress = document.getElementById('readingProgress');
      const article = document.getElementById('article-content');
      if (!progress || !article) return;
      window.addEventListener('scroll', function() {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY - articleTop + windowHeight;
        const total = articleHeight + windowHeight;
        const pct = Math.min(Math.max((scrolled / total) * 100, 0), 100);
        progress.style.width = pct + '%';
      }, { passive: true });
    })();
    (function() {
      const sections = document.querySelectorAll('.article-body section[id]');
      const tocLinks = document.querySelectorAll('.article-toc__link');
      if (!sections.length || !tocLinks.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            tocLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href') === '#' + id); });
          }
        });
      }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
      sections.forEach(section => observer.observe(section));
    })();
    (function() {
      const revealEls = document.querySelectorAll('.article-reveal');
      if (!revealEls.length) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
      revealEls.forEach(el => observer.observe(el));
    })();
  </script>
  <script src="/feedback-widget.js" data-user-id="" data-user-name="" data-user-email=""></script>
</body>
</html>`;
}

async function main() {
  const slugs = [
    'the-multi-generational-blueprint',
    'the-architecture-of-legacy',
    'precision-longevity-protocols',
    'the-rightsizing-framework',
    'estate-preservation-in-volatility'
  ];

  mkdirSync(join(__dirname, 'articles'), { recursive: true });

  for (const slug of slugs) {
    console.log(`Generating: ${slug}...`);
    const article = await fetchArticle(slug);
    if (!article) { console.error(`  ✗ Not found: ${slug}`); continue; }
    
    const html = generateArticlePage(article);
    const outPath = join(__dirname, 'articles', `${slug}.html`);
    writeFileSync(outPath, html, 'utf8');
    console.log(`  ✓ ${outPath} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  console.log('\nDone! All article pages generated.');
}

main().catch(console.error);
