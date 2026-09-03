const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'images', 'products');

function createIPhoneSvg(title, primaryColor, secondaryColor, accentColor, lensRingColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 620" width="100%" height="100%">
  <defs>
    <!-- Titanium Body Gradient -->
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="50%" stop-color="${secondaryColor}"/>
      <stop offset="100%" stop-color="${accentColor}"/>
    </linearGradient>

    <!-- Edge Reflection -->
    <linearGradient id="edgeGleam" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/>
      <stop offset="25%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="75%" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3"/>
    </linearGradient>

    <!-- Camera Plateau -->
    <linearGradient id="islandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="${primaryColor}"/>
    </linearGradient>

    <!-- Lens Gradient -->
    <radialGradient id="lensGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0a121e"/>
      <stop offset="60%" stop-color="#182330"/>
      <stop offset="85%" stop-color="#050a10"/>
      <stop offset="100%" stop-color="#2a3d52"/>
    </radialGradient>

    <!-- Lens Reflection -->
    <linearGradient id="lensReflection" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.6"/>
      <stop offset="40%" stop-color="#3b82f6" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#93c5fd" stop-opacity="0"/>
    </linearGradient>

    <!-- Drop Shadow for Phone Body -->
    <filter id="phoneShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.22"/>
    </filter>
    
    <!-- Island Shadow -->
    <filter id="plateauShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="5" stdDeviation="6" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Phone Shadow and Frame -->
  <g filter="url(#phoneShadow)">
    <!-- Outer Titanium Rim -->
    <rect x="50" y="30" width="280" height="560" rx="52" fill="#1e242d" stroke="#505967" stroke-width="2"/>
    <!-- Sleek inner bezel -->
    <rect x="53" y="33" width="274" height="554" rx="49" fill="url(#edgeGleam)"/>
    <!-- Glass Back Body -->
    <rect x="54" y="34" width="272" height="552" rx="48" fill="url(#bodyGrad)"/>
  </g>

  <!-- Subtle Frosted Glass Texture / Sheen Overlay -->
  <path d="M 54,82 Q 190,200 326,110 L 326,34 L 54,34 Z" fill="#ffffff" opacity="0.08" rx="48"/>

  <!-- Camera Island Plateau -->
  <rect x="74" y="54" width="134" height="142" rx="34" fill="url(#islandGrad)" filter="url(#plateauShadow)" stroke="${lensRingColor}" stroke-width="1.5" stroke-opacity="0.5"/>

  <!-- Camera 1: Top Left (Main 48MP) -->
  <g transform="translate(112, 92)">
    <circle cx="0" cy="0" r="28" fill="${secondaryColor}" stroke="${lensRingColor}" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="24" fill="#0d1117" stroke="#374151" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="18" fill="url(#lensGrad)"/>
    <ellipse cx="-5" cy="-5" rx="10" ry="6" fill="url(#lensReflection)" transform="rotate(-30, -5, -5)"/>
    <circle cx="3" cy="3" r="3.5" fill="#3b82f6" opacity="0.4"/>
  </g>

  <!-- Camera 2: Bottom Left (Telephoto 5x) -->
  <g transform="translate(112, 158)">
    <circle cx="0" cy="0" r="28" fill="${secondaryColor}" stroke="${lensRingColor}" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="24" fill="#0d1117" stroke="#374151" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="18" fill="url(#lensGrad)"/>
    <ellipse cx="-5" cy="-5" rx="10" ry="6" fill="url(#lensReflection)" transform="rotate(-30, -5, -5)"/>
    <circle cx="3" cy="3" r="3.5" fill="#3b82f6" opacity="0.4"/>
  </g>

  <!-- Camera 3: Right Center (Ultra Wide) -->
  <g transform="translate(169, 125)">
    <circle cx="0" cy="0" r="28" fill="${secondaryColor}" stroke="${lensRingColor}" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="24" fill="#0d1117" stroke="#374151" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="18" fill="url(#lensGrad)"/>
    <ellipse cx="-5" cy="-5" rx="10" ry="6" fill="url(#lensReflection)" transform="rotate(-30, -5, -5)"/>
    <circle cx="3" cy="3" r="3.5" fill="#3b82f6" opacity="0.4"/>
  </g>

  <!-- True Tone Flash -->
  <circle cx="169" cy="74" r="10" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <circle cx="169" cy="74" r="6" fill="#fef08a" opacity="0.8"/>

  <!-- LiDAR Sensor -->
  <circle cx="169" cy="176" r="8" fill="#111827" stroke="#374151" stroke-width="1"/>
  <circle cx="169" cy="176" r="4" fill="#1e293b"/>

  <!-- Microphone hole -->
  <circle cx="138" cy="180" r="2.5" fill="#090d13"/>

  <!-- Subtle Apple Logo Minimal Mark -->
  <g transform="translate(190, 310)" opacity="0.25">
    <path d="M 0,-20 C 5,-28 15,-27 15,-27 C 15,-27 12,-18 7,-14 C 2,-10 0,-14 0,-20 Z" fill="#ffffff"/>
    <path d="M 12,-10 C 18,-10 24,-14 27,-14 C 33,-14 38,-7 38,1 C 38,10 32,23 25,23 C 21,23 18,20 12,20 C 6,20 3,23 -1,23 C -8,23 -14,10 -14,1 C -14,-9 -8,-14 -2,-14 C 4,-14 8,-10 12,-10 Z" fill="#ffffff"/>
  </g>

  <!-- Antenna bands subtle lines -->
  <line x1="50" y1="120" x2="54" y2="120" stroke="#64748b" stroke-width="2"/>
  <line x1="326" y1="120" x2="330" y2="120" stroke="#64748b" stroke-width="2"/>
  <line x1="50" y1="500" x2="54" y2="500" stroke="#64748b" stroke-width="2"/>
  <line x1="326" y1="500" x2="330" y2="500" stroke="#64748b" stroke-width="2"/>
</svg>`;
}

function createSamsungSvg(title, primaryColor, secondaryColor, accentColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 620" width="100%" height="100%">
  <defs>
    <linearGradient id="samsungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="50%" stop-color="${secondaryColor}"/>
      <stop offset="100%" stop-color="${accentColor}"/>
    </linearGradient>
    <filter id="phoneShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.22"/>
    </filter>
  </defs>
  <!-- Boxy Ultra Sharp Form Factor -->
  <g filter="url(#phoneShadow)">
    <rect x="52" y="30" width="276" height="560" rx="16" fill="#1e242d" stroke="#64748b" stroke-width="2"/>
    <rect x="55" y="33" width="270" height="554" rx="14" fill="url(#samsungGrad)"/>
  </g>

  <!-- 4 Floating Clean Camera Rings -->
  <!-- Lens 1 (Ultra Wide) -->
  <g transform="translate(95, 80)">
    <circle cx="0" cy="0" r="20" fill="#18181b" stroke="#a1a1aa" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="14" fill="#09090b"/>
    <circle cx="-3" cy="-3" r="4" fill="#60a5fa" opacity="0.6"/>
  </g>
  <!-- Lens 2 (Main 200MP) -->
  <g transform="translate(95, 134)">
    <circle cx="0" cy="0" r="20" fill="#18181b" stroke="#a1a1aa" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="14" fill="#09090b"/>
    <circle cx="-3" cy="-3" r="4" fill="#60a5fa" opacity="0.6"/>
  </g>
  <!-- Lens 3 (Periscope 50MP 5x) -->
  <g transform="translate(95, 188)">
    <circle cx="0" cy="0" r="20" fill="#18181b" stroke="#a1a1aa" stroke-width="2.5"/>
    <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#09090b"/>
  </g>
  <!-- Secondary column: Flash & Laser AF -->
  <circle cx="138" cy="88" r="8" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
  <circle cx="138" cy="134" r="12" fill="#18181b" stroke="#a1a1aa" stroke-width="2"/>
  <circle cx="138" cy="134" r="7" fill="#09090b"/>
  <circle cx="138" cy="178" r="12" fill="#18181b" stroke="#a1a1aa" stroke-width="2"/>
  <circle cx="138" cy="178" r="7" fill="#09090b"/>

  <!-- Subtle Samsung Text -->
  <text x="190" y="530" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#ffffff" opacity="0.3" letter-spacing="4">SAMSUNG</text>
</svg>`;
}

function createPixelSvg(title, primaryColor, secondaryColor, accentColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 620" width="100%" height="100%">
  <defs>
    <linearGradient id="pixelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="50%" stop-color="${secondaryColor}"/>
      <stop offset="100%" stop-color="${accentColor}"/>
    </linearGradient>
    <filter id="phoneShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.22"/>
    </filter>
    <filter id="visorShadow" x="-10%" y="-20%" width="120%" height="150%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Rounded Friendly Pixel Form Factor -->
  <g filter="url(#phoneShadow)">
    <rect x="52" y="30" width="276" height="560" rx="46" fill="#1e242d" stroke="#64748b" stroke-width="2"/>
    <rect x="55" y="33" width="270" height="554" rx="43" fill="url(#pixelGrad)"/>
  </g>

  <!-- Iconic Pixel Camera Visor Pill -->
  <g filter="url(#visorShadow)">
    <rect x="66" y="80" width="248" height="66" rx="33" fill="#18181b" stroke="#e2e8f0" stroke-width="1.5" stroke-opacity="0.3"/>
    <!-- Pill cutout for cameras -->
    <rect x="80" y="90" width="150" height="46" rx="23" fill="#09090b"/>
    <!-- Lenses -->
    <circle cx="106" cy="113" r="16" fill="#1e293b"/>
    <circle cx="106" cy="113" r="10" fill="#020617"/>
    <circle cx="146" cy="113" r="16" fill="#1e293b"/>
    <circle cx="146" cy="113" r="10" fill="#020617"/>
    <rect x="180" y="103" width="30" height="20" rx="4" fill="#020617" stroke="#334155"/>
    
    <!-- Flash & Temp Sensor -->
    <circle cx="266" cy="103" r="7" fill="#fef08a" stroke="#ca8a04" stroke-width="1"/>
    <circle cx="266" cy="123" r="5" fill="#334155"/>
  </g>

  <!-- Minimal 'G' Logo -->
  <g transform="translate(190, 360)" opacity="0.35">
    <circle cx="0" cy="0" r="18" fill="none" stroke="#ffffff" stroke-width="4"/>
    <path d="M 0,-4 L 14,-4 L 14,8 L 0,8 Z" fill="${secondaryColor}"/>
    <line x1="0" y1="0" x2="14" y2="0" stroke="#ffffff" stroke-width="4"/>
  </g>
</svg>`;
}

function createOnePlusSvg(title, primaryColor, secondaryColor, accentColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 620" width="100%" height="100%">
  <defs>
    <linearGradient id="oneplusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="50%" stop-color="${secondaryColor}"/>
      <stop offset="100%" stop-color="${accentColor}"/>
    </linearGradient>
    <filter id="phoneShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.22"/>
    </filter>
  </defs>

  <!-- OnePlus 12 Curvature -->
  <g filter="url(#phoneShadow)">
    <rect x="52" y="30" width="276" height="560" rx="40" fill="#111827" stroke="#4b5563" stroke-width="2"/>
    <rect x="55" y="33" width="270" height="554" rx="37" fill="url(#oneplusGrad)"/>
  </g>

  <!-- Left-spine watch dial camera module -->
  <circle cx="146" cy="142" r="66" fill="#18181b" stroke="#9ca3af" stroke-width="3" stroke-opacity="0.6"/>
  <circle cx="146" cy="142" r="56" fill="#0f172a"/>
  
  <!-- Quad ring layout inside circular dial -->
  <circle cx="124" cy="120" r="16" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <circle cx="124" cy="120" r="10" fill="#020617"/>

  <circle cx="168" cy="120" r="16" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <circle cx="168" cy="120" r="10" fill="#020617"/>

  <rect x="110" y="150" width="28" height="20" rx="4" fill="#020617" stroke="#475569" stroke-width="1.5"/>

  <circle cx="168" cy="160" r="14" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>

  <!-- Hasselblad 'H' detail -->
  <text x="146" y="195" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="700" font-size="9" fill="#94a3b8" letter-spacing="1">HASSELBLAD</text>

  <!-- OnePlus 1+ Logo Subtle Mark -->
  <g transform="translate(190, 360)" opacity="0.3">
    <rect x="-16" y="-16" width="32" height="32" rx="6" fill="none" stroke="#ffffff" stroke-width="2.5"/>
    <text x="-4" y="6" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#ffffff">1+</text>
  </g>
</svg>`;
}

const items = [
  // iPhone 17 Pro
  { filename: 'iphone-17-pro-desert.svg', svg: createIPhoneSvg('Desert Titanium', '#d69e77', '#b57c55', '#8a5937', '#f4ceb0') },
  { filename: 'iphone-17-pro-white.svg', svg: createIPhoneSvg('White Titanium', '#f5f5f7', '#e5e5ea', '#d1d1d6', '#ffffff') },
  { filename: 'iphone-17-pro-black.svg', svg: createIPhoneSvg('Black Titanium', '#3a393e', '#2c2b30', '#1c1b20', '#636269') },
  // Samsung S24 Ultra
  { filename: 'samsung-s24-gray.svg', svg: createSamsungSvg('Titanium Gray', '#797b82', '#5e6066', '#44454a') },
  { filename: 'samsung-s24-black.svg', svg: createSamsungSvg('Titanium Black', '#303136', '#222326', '#141517') },
  { filename: 'samsung-s24-violet.svg', svg: createSamsungSvg('Titanium Violet', '#534b63', '#3e374d', '#2b2538') },
  // Pixel 9 Pro
  { filename: 'pixel-9-porcelain.svg', svg: createPixelSvg('Porcelain', '#f3f0e8', '#e5dfd3', '#cfc7b8') },
  { filename: 'pixel-9-obsidian.svg', svg: createPixelSvg('Obsidian', '#292a2d', '#1f2023', '#111214') },
  { filename: 'pixel-9-rose.svg', svg: createPixelSvg('Rose Quartz', '#eed0d3', '#dbaab0', '#c2878f') },
  // OnePlus 12
  { filename: 'oneplus-12-black.svg', svg: createOnePlusSvg('Silky Black', '#2b2d30', '#1f2022', '#121314') },
  { filename: 'oneplus-12-emerald.svg', svg: createOnePlusSvg('Flowy Emerald', '#234a41', '#183831', '#0e241f') },
];

for (const item of items) {
  const filePath = path.join(outDir, item.filename);
  fs.writeFileSync(filePath, item.svg, 'utf8');
  console.log(`Created ${item.filename}`);
}

console.log('All vector phone graphics generated successfully!');
