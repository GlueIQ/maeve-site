const fs = require('fs');
const path = require('path');

const SITE_DIR = '/Users/gastonlegorburu/Desktop/Workhorse/My Maeve/site';

const htmlFiles = [
  'index.html',
  'community.html',
  'tools.html',
  'for-advisors.html',
  'the-long-view.html',
  'podcast.html'
];

const beautifulDropdownHtml = `
        <div class="relative items-center z-50 hidden md:inline-flex">
          <button id="maeve-dropdown-toggle" class="font-['Plus_Jakarta_Sans'] text-sm font-medium text-[#001a0e] dark:text-[#faf9f6] hover:opacity-70 transition-opacity duration-300 cursor-pointer">
            My Maeve
          </button>
        </div>
        <button class="hidden md:inline-flex bg-primary text-on-primary px-6 py-2 rounded-sm font-label text-xs uppercase tracking-widest hover:opacity-80 transition-opacity duration-500 ease-in-out">
          Start Here →
        </button>
      </div>
    </div>
    <div class="bg-[#efeeeb] dark:bg-[#132f21] h-[1px] w-full"></div>
  </header>

  <!-- Beautiful Maeve Dropdown Overlay -->
  <div id="maeve-dropdown-overlay" class="fixed top-[74px] left-0 right-0 z-[45] bg-[#001a0e] overflow-hidden opacity-0 pointer-events-none transition-all duration-300 ease-out border-b-2 border-[#D4C5B0] transform -translate-y-4">
    <!-- Noise texture overlay -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 256 256\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')"></div>
    
    <div class="max-w-[900px] mx-auto px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <!-- Member Card -->
      <a href="http://localhost:5173/member" class="block bg-[#fdfbf7] rounded-[24px] p-8 no-underline transition-all duration-300 ease-out border border-transparent hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-[#001a0e] flex items-center justify-center text-[#D4C5B0] font-serif text-base font-semibold">SM</div>
          <div>
            <div class="font-sans font-semibold text-[11px] text-[#D4C5B0] tracking-[2.5px] uppercase">Member Portal</div>
          </div>
        </div>
        <h3 class="font-serif text-[22px] text-[#001a0e] mb-2 font-normal">Welcome back, Sarah</h3>
        <p class="font-sans text-[14px] text-[#1a1c1a] opacity-70 leading-relaxed">Continue your journey through Phase 2: Strategize. You're 62% through.</p>
        <div class="mt-4 h-[3px] bg-[#E8DFC8] rounded-sm overflow-hidden">
          <div class="h-full w-[62%] bg-[#D4C5B0] rounded-sm transition-all duration-1000 ease-out"></div>
        </div>
      </a>

      <!-- Advisor Card -->
      <a href="http://localhost:5173/advisor" class="block bg-[#132f21] rounded-[24px] p-8 no-underline transition-all duration-300 ease-out border border-[#D4C5B0]/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(72,101,84,0.15)] group">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-[#D4C5B0]/20 flex items-center justify-center text-[#D4C5B0] font-serif text-base font-semibold border border-[#D4C5B0]/30 transition-colors duration-300 group-hover:bg-[#D4C5B0] group-hover:text-[#001a0e]">EA</div>
          <div>
            <div class="font-sans font-semibold text-[11px] text-[#D4C5B0] tracking-[2.5px] uppercase">Advisor Portal</div>
          </div>
        </div>
        <h3 class="font-serif text-[22px] text-[#fdfbf7] mb-2 font-normal">Elise Associates</h3>
        <p class="font-sans text-[14px] text-[#faf9f6] opacity-70 leading-relaxed">3 actions required. 2 new documents uploaded by Sarah M.</p>
        <div class="mt-4 flex gap-2">
          <span class="px-2 py-1 bg-[#D4C5B0]/20 text-[#D4C5B0] text-[10px] font-bold tracking-wider uppercase rounded-sm border border-[#D4C5B0]/30">Action Required</span>
        </div>
      </a>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const toggle = document.getElementById('maeve-dropdown-toggle');
      const dropdown = document.getElementById('maeve-dropdown-overlay');
      
      if (toggle && dropdown) {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = dropdown.classList.contains('opacity-100');
          if (isOpen) {
            dropdown.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            dropdown.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
          } else {
            dropdown.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
            dropdown.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
          }
        });

        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target) && e.target !== toggle) {
            dropdown.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            dropdown.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
          }
        });
      }
    });
  </script>
`;

htmlFiles.forEach(file => {
  const filePath = path.join(SITE_DIR, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // We need to replace the cheap dropdown we added
  // It starts with <div class="relative group hidden md:inline-flex items-center z-50">
  // And ends right before the <button ... Start Here
  
  const targetRegex = /<div class="relative group hidden md:inline-flex items-center z-50">[\s\S]*?<\/div>\s*<\/div>\s*<button class="hidden md:inline-flex bg-primary text-on-primary[^>]+>\s*Start Here\s*→\s*<\/button>\s*<\/div>\s*<\/div>\s*<div class="bg-\[#efeeeb\][^>]+><\/div>\s*<\/header>/;
  
  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, beautifulDropdownHtml.trim());
    fs.writeFileSync(filePath, content);
    console.log('Restored beautiful dropdown in ' + file);
  } else {
    // maybe for-advisors has a different href for Start Here, but we replaced the Button!
    const advisorRegex = /<div class="relative group hidden md:inline-flex items-center z-50">[\s\S]*?<\/div>\s*<\/div>\s*<a href="http:\/\/localhost:5173\/[^"]+" class="hidden md:inline-flex bg-primary text-on-primary[^>]+>\s*Start Here\s*→\s*<\/a>\s*<\/div>\s*<\/div>\s*<div class="bg-\[#efeeeb\][^>]+><\/div>\s*<\/header>/;
    
    if (advisorRegex.test(content)) {
      // Modify beautifulDropdownHtml for the anchor version of Start Here
      let customizedNav = beautifulDropdownHtml.replace(
        /<button class="hidden md:inline-flex bg-primary text-on-primary[^>]+>\s*Start Here\s*→\s*<\/button>/,
        '<a href="http://localhost:5173/advisor" class="hidden md:inline-flex bg-primary text-on-primary px-6 py-2 rounded-sm font-label text-xs uppercase tracking-widest hover:opacity-80 transition-opacity duration-500 ease-in-out">Start Here →</a>'
      );
      content = content.replace(advisorRegex, customizedNav.trim());
      fs.writeFileSync(filePath, content);
      console.log('Restored beautiful dropdown in (advisor format) ' + file);
    } else {
        console.log('Could not find match in ' + file);
    }
  }
});
