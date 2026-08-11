# Arrakis Finance — Master Template & Specification

This document contains the production-ready **Master Template**, architectural specification, and complete source code for the high-fidelity **Arrakis Finance** landing page clone.

---

## 🎨 Design Tokens & Architecture Specification

### 1. Color Palette & Lighting Tokens
- **Primary Background**: `#060709` (Atmospheric Obsidian Dark)
- **Surface Cards**: `rgba(15, 17, 24, 0.75)` with `backdrop-filter: blur(12px)`
- **Border Accents**: `rgba(255, 255, 255, 0.08)` and `rgba(245, 158, 11, 0.3)`
- **Amber Primary**: `#f59e0b`
- **Amber Glow / Highlights**: `#fbbf24` & `#fef08a`
- **Liquid Mirror Specular Light**: `#cbd5e1`
- **Cyan Reflection Accent**: `#06b6d4`

### 2. Typography Rules
- **Logo Brand**: `'Syne', sans-serif; font-weight: 800; letter-spacing: 0.08em;`
- **Main Headings**: `'Plus Jakarta Sans', sans-serif; font-weight: 600; letter-spacing: -0.025em;`
- **Italic Sub-Headings**: `'Playfair Display', serif; font-style: italic; font-weight: 400;`
- **Body & Navigation**: `'Inter', sans-serif; font-weight: 500;`

### 3. 3D WebGL PBR Liquid Grey Mirror Water Physics
- **Engine**: Three.js WebGL Renderer
- **Geometry**: `THREE.PlaneGeometry(90, 90, 240, 240)` rotated `-Math.PI * 0.15` (gentle horizontal tilt)
- **Camera Perspective**: Low-angle horizon view `camera.position.set(0, 1.2, 14)` looking at `(0, -1.2, -10)`
- **Material**: `THREE.MeshPhysicalMaterial`
  - `color`: `0x090b10`
  - `roughness`: `0.16`
  - `metalness`: `0.82`
  - `clearcoat`: `1.0`
  - `clearcoatRoughness`: `0.08`
  - `reflectivity`: `0.95`
- **Lighting Dynamics**:
  - Cool Silver-Grey Specular Directional Light: `DirectionalLight(0xcbd5e1, 1.9)` at `(25, 15, 15)`
  - Warm Glowing Amber Point Light: `PointLight(0xf59e0b, 7.0)` at `(-4, -2, -2)`
  - Secondary Copper Light: `PointLight(0xd97706, 5.0)` at `(10, -3, -4)`
  - Cyan Accent Light: `PointLight(0x06b6d4, 3.5)` at `(22, -4, -6)`
- **Stacking Rule**: `#wave-canvas` MUST be set to `position: fixed; inset: 0; z-index: 1; pointer-events: none;` with content set to `z-index: 10`.

---

## 📄 Complete Source Files

### 1. `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arrakis Finance | Onchain Market Making</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Interactive Glow Spotlight -->
    <div id="cursor-glow" class="cursor-glow" aria-hidden="true"></div>

    <!-- 3D Liquid Wave Silk Canvas -->
    <canvas id="wave-canvas" aria-hidden="true"></canvas>

    <header class="site-header" id="site-header">
        <div class="container nav-wrap">
            <a href="#" class="brand">
                <svg class="brand-logo" width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L16 16L6 26H11L18.5 18.5L26 26H30L19.5 15.5L29 6H24L17 13L10.5 6H6Z" fill="white"/>
                </svg>
                <span class="brand-text">ARRAKIS</span>
            </a>
            
            <nav class="desktop-nav">
                <ul>
                    <li class="dropdown">
                        <a href="#solutions">Solutions <span class="chevron">˅</span></a>
                    </li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#docs">Docs</a></li>
                </ul>
            </nav>

            <div class="nav-actions">
                <a href="#app" class="btn btn-outline">Enter app</a>
                <a href="#contact" class="btn btn-amber">Contact us</a>
            </div>

            <button class="mobile-menu-btn" aria-label="Toggle menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </div>
    </header>

    <main>
        <section class="hero" id="hero">
            <div class="container hero-container">
                <div class="hero-content">
                    <a href="#guide" class="promo-pill animate-fade-in delay-1">
                        <span class="pill-badge">Guide</span>
                        <span class="pill-text">The Practical Guide to TGE 2026</span>
                        <span class="pill-arrow">→</span>
                    </a>
                    
                    <p class="kicker animate-fade-in delay-2">Onchain Market Making</p>
                    
                    <h1 class="hero-title animate-fade-in delay-3">
                        We Make Onchain Markets<br>
                        <span class="hero-serif">Liquid and Efficient</span>
                    </h1>
                </div>

                <!-- Infinite Marquee Ticker for Partner Logos at Hero Bottom -->
                <div class="partners-hero animate-fade-in delay-4">
                    <div class="logo-marquee">
                        <div class="marquee-track">
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,8.5 22,19.5 12,26 2,19.5 2,8.5"/></svg>
                                <span>RedStone</span>
                            </div>
                            <div class="partner-item">
                                <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor"><path d="M12 0L15 7H24L17 12L20 20L12 15L4 20L7 12L0 7H9L12 0Z"/></svg>
                                <span>Maple</span>
                            </div>
                            <div class="partner-item partner-text-logo">
                                <span>WORMHOLE</span>
                            </div>
                            <div class="partner-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="3" rx="1.5"/><rect x="3" y="10.5" width="18" height="3" rx="1.5"/><rect x="3" y="17" width="18" height="3" rx="1.5"/></svg>
                                <span>Euler</span>
                            </div>
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,8.5 22,19.5 12,26 2,19.5 2,8.5"/></svg>
                                <span>RedStone</span>
                            </div>
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" fill="none"/><circle cx="12" cy="12" r="4"/></svg>
                                <span>bitpanda</span>
                            </div>
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6A6 6 0 1 0 18 12"/></svg>
                                <span>Centrifuge</span>
                            </div>
                            <!-- Duplicated track for infinite seamless scroll -->
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,8.5 22,19.5 12,26 2,19.5 2,8.5"/></svg>
                                <span>RedStone</span>
                            </div>
                            <div class="partner-item">
                                <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor"><path d="M12 0L15 7H24L17 12L20 20L12 15L4 20L7 12L0 7H9L12 0Z"/></svg>
                                <span>Maple</span>
                            </div>
                            <div class="partner-item partner-text-logo">
                                <span>WORMHOLE</span>
                            </div>
                            <div class="partner-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="3" rx="1.5"/><rect x="3" y="10.5" width="18" height="3" rx="1.5"/><rect x="3" y="17" width="18" height="3" rx="1.5"/></svg>
                                <span>Euler</span>
                            </div>
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,8.5 22,19.5 12,26 2,19.5 2,8.5"/></svg>
                                <span>RedStone</span>
                            </div>
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" fill="none"/><circle cx="12" cy="12" r="4"/></svg>
                                <span>bitpanda</span>
                            </div>
                            <div class="partner-item">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6A6 6 0 1 0 18 12"/></svg>
                                <span>Centrifuge</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Metrics Section -->
        <section class="metrics-section">
            <div class="container">
                <div class="metrics-grid">
                    <article class="metric-card animate-on-scroll">
                        <p class="metric-label">Token Issuers Supported</p>
                        <p class="metric-value" data-count="220" data-suffix="+">0+</p>
                    </article>
                    <article class="metric-card animate-on-scroll">
                        <p class="metric-label">Onchain Volume Managed</p>
                        <p class="metric-value" data-count="8.4" data-prefix="$" data-suffix="B+">$0B+</p>
                    </article>
                    <article class="metric-card animate-on-scroll">
                        <p class="metric-label">DEX Protocols Integrated</p>
                        <p class="metric-value" data-count="15" data-suffix="+">0+</p>
                    </article>
                </div>
            </div>
        </section>

        <section id="solutions" class="solutions">
            <div class="container">
                <header class="section-head animate-on-scroll">
                    <p class="kicker-sm">PRODUCTS</p>
                    <h2>Automated Non-Custodial Liquidity Management</h2>
                </header>

                <div class="solution-grid">
                    <article class="sol-card animate-on-scroll glow-tilt">
                        <div class="sol-tag">PROJECT TOKENS</div>
                        <h3>Launch with managed deep liquidity</h3>
                        <p>Deploy token liquidity strategically at TGE across Uniswap V4, Aerodrome, and PancakeSwap with algorithmic spread management and fee optimization.</p>
                        <div class="sol-footer">
                            <span class="sol-stat">Efficiency <strong>+28%</strong></span>
                        </div>
                    </article>

                    <article class="sol-card animate-on-scroll glow-tilt">
                        <div class="sol-tag">YIELD-BEARING RWAS</div>
                        <h3>Deep 24/7 secondary markets</h3>
                        <p>Provide liquid secondary markets for tokenized Real World Assets, ensuring tight spreads and institutional exit liquidity with automated rebalancing.</p>
                        <div class="sol-footer">
                            <span class="sol-stat">Slippage <strong>&lt;0.05%</strong></span>
                        </div>
                    </article>

                    <article class="sol-card animate-on-scroll glow-tilt">
                        <div class="sol-tag">COMMODITIES &amp; EQUITIES</div>
                        <h3>Bootstrap synthetic asset pairs</h3>
                        <p>Maintain accurate price pegging and continuous market depth for synthetic commodities and cross-chain tokenized assets with custom vaults.</p>
                        <div class="sol-footer">
                            <span class="sol-stat">Uptime <strong>99.99%</strong></span>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section id="cases" class="cases">
            <div class="container">
                <header class="section-head animate-on-scroll">
                    <p class="kicker-sm">CASE STUDIES</p>
                    <h2>Trusted by leading DeFi protocols</h2>
                </header>

                <div class="case-layout animate-on-scroll">
                    <div class="case-tabs">
                        <button class="tab-btn active" data-tab="0">Morpho</button>
                        <button class="tab-btn" data-tab="1">Maple</button>
                        <button class="tab-btn" data-tab="2">Bitpanda</button>
                    </div>

                    <article class="case-card glow-tilt">
                        <div class="case-copy">
                            <span class="case-badge">Case Study</span>
                            <h3 id="case-title">Deeper markets, less capital</h3>
                            <p id="case-desc">Discover how Morpho utilized automated liquidity management to drastically increase their liquidity depth while simultaneously reducing the capital required to sustain it onchain.</p>
                            <a href="#" class="text-link">Read full case study →</a>
                        </div>
                        <div class="case-stats">
                            <div class="stat-box">
                                <span class="stat-num">+230%</span>
                                <span class="stat-lbl">Liquidity Depth</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-num">-40%</span>
                                <span class="stat-lbl">Capital Overhead</span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="cta" id="contact">
            <div class="container cta-wrap animate-on-scroll">
                <div class="cta-glow"></div>
                <h2>Make your onchain markets liquid and efficient.</h2>
                <a href="#" class="btn btn-amber cta-btn">Get in touch</a>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="f-col f-brand">
                    <a href="#" class="f-logo">
                        <svg class="brand-logo" width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M6 6L16 16L6 26H11L18.5 18.5L26 26H30L19.5 15.5L29 6H24L17 13L10.5 6H6Z" fill="white"/></svg>
                        <span>ARRAKIS</span>
                    </a>
                    <p>Onchain Market Maker for Token Issuers</p>
                </div>
                <div class="f-col">
                    <h4>Solutions</h4>
                    <ul>
                        <li><a href="#">Project Tokens</a></li>
                        <li><a href="#">Yield RWAs</a></li>
                        <li><a href="#">Synthetic Assets</a></li>
                    </ul>
                </div>
                <div class="f-col">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">TGE Guide</a></li>
                        <li><a href="#">Research</a></li>
                    </ul>
                </div>
                <div class="f-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Arrakis Finance. All rights reserved.</p>
                <div class="social-links">
                    <a href="#">Twitter / X</a>
                    <a href="#">Discord</a>
                    <a href="#">GitHub</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="three.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

### 2. `styles.css`
```css
:root {
  --bg-dark: #060709;
  --surface-dark: #090a0f;
  --surface-card: rgba(15, 17, 24, 0.75);
  --border-light: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(245, 158, 11, 0.3);
  
  --text-main: #ffffff;
  --text-sub: #9ca3af;
  --text-muted: #6b7280;
  
  --amber-primary: #f59e0b;
  --amber-glow: #fbbf24;
  --amber-dark: #d97706;
  
  --font-sans: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-logo: 'Syne', sans-serif;
  
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Reset & Global */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  min-height: 100%;
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: var(--font-sans);
  line-height: 1.5;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
  transition: all 0.25s var(--ease-smooth);
}

button {
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  color: inherit;
}

ul, ol {
  list-style: none;
}

.container {
  width: min(1280px, calc(100% - 64px));
  margin: 0 auto;
}

/* 3D Liquid Wave Canvas - POSITIONED OVER BACKGROUND, UNDER CONTENT */
#wave-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
}

/* Cursor Spotlight Glow */
.cursor-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 65%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: opacity 0.5s ease;
}

/* Header Navbar */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  background: rgba(6, 7, 9, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
}

.site-header.scrolled {
  background: rgba(6, 7, 9, 0.94);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-text {
  font-family: var(--font-logo);
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: 0.08em;
  color: #ffffff;
}

.desktop-nav {
  margin-left: auto;
  margin-right: 36px;
}

.desktop-nav ul {
  display: flex;
  align-items: center;
  gap: 32px;
}

.desktop-nav a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-sub);
  display: flex;
  align-items: center;
  gap: 4px;
}

.desktop-nav a:hover {
  color: var(--text-main);
}

.chevron {
  font-size: 0.75rem;
  opacity: 0.7;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.25s ease;
}

.btn-outline {
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.02);
}

.btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.btn-amber {
  background: var(--amber-primary);
  color: #000000;
}

.btn-amber:hover {
  background: var(--amber-glow);
  box-shadow: 0 4px 20px rgba(245, 158, 11, 0.35);
  transform: translateY(-1px);
}

.mobile-menu-btn {
  display: none;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 140px;
  padding-bottom: 40px;
  z-index: 10;
}

.hero-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 180px);
  position: relative;
  z-index: 10;
}

.hero-content {
  text-align: left;
  max-width: 1100px;
  position: relative;
  z-index: 10;
}

/* Promo Badge Pill */
.promo-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 4px 18px 4px 4px;
  border-radius: 999px;
  margin-bottom: 32px;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.promo-pill:hover {
  border-color: rgba(245, 158, 11, 0.5);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 24px rgba(245, 158, 11, 0.15);
}

.pill-badge {
  background: var(--amber-primary);
  color: #000000;
  font-weight: 700;
  font-size: 0.78rem;
  padding: 4px 12px;
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.pill-text {
  font-size: 0.88rem;
  color: #d1d5db;
  font-weight: 500;
}

.pill-arrow {
  color: var(--amber-primary);
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.promo-pill:hover .pill-arrow {
  transform: translateX(4px);
}

/* Sub-headline & Main Headline */
.kicker {
  font-size: 1.35rem;
  font-weight: 500;
  color: #9ca3af;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.hero-title {
  font-family: var(--font-sans);
  font-size: clamp(2.8rem, 5.2vw, 4.6rem);
  font-weight: 600;
  line-height: 1.1;
  color: #ffffff;
  letter-spacing: -0.025em;
  white-space: nowrap;
}

.hero-serif {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(3.2rem, 5.8vw, 5.2rem);
  color: #fef08a;
  opacity: 0.95;
  display: block;
  margin-top: 4px;
  white-space: nowrap;
  animation: pulseGold 6s ease-in-out infinite alternate;
}

@keyframes pulseGold {
  0% { color: #fef08a; text-shadow: 0 0 0px transparent; }
  100% { color: #fef9c3; text-shadow: 0 0 28px rgba(245, 158, 11, 0.35); }
}

/* Infinite Marquee Ticker for Partner Logos */
.partners-hero {
  margin-top: auto;
  padding-top: 48px;
  overflow: hidden;
  width: 100%;
  position: relative;
  z-index: 10;
}

.logo-marquee {
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 64px;
  width: max-content;
  animation: marqueeScroll 35s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.partner-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  opacity: 0.85;
  transition: opacity 0.3s, transform 0.3s;
  flex-shrink: 0;
}

.partner-item:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.partner-text-logo span {
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 1.05rem;
}

@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Metrics Cards Section */
.metrics-section {
  position: relative;
  z-index: 10;
  padding: 60px 0;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.metric-card {
  background: var(--surface-card);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  padding: 28px 32px;
  backdrop-filter: blur(12px);
  transition: all 0.3s var(--ease-smooth);
}

.metric-card:hover {
  border-color: var(--border-accent);
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}

.metric-label {
  font-size: 0.88rem;
  color: var(--text-sub);
  margin-bottom: 8px;
  font-weight: 500;
}

.metric-value {
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

/* Solutions & Case Studies Sections */
.solutions, .cases, .cta {
  position: relative;
  z-index: 10;
  padding: 100px 0;
}

.section-head {
  margin-bottom: 48px;
}

.kicker-sm {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--amber-primary);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.section-head h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  max-width: 720px;
}

.solution-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.sol-card {
  background: var(--surface-card);
  border: 1px solid var(--border-light);
  border-radius: 24px;
  padding: 36px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  transition: transform 0.35s var(--ease-smooth), border-color 0.35s ease, box-shadow 0.35s ease;
}

.sol-card:hover {
  transform: translateY(-6px);
  border-color: rgba(245, 158, 11, 0.45);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.12);
}

.sol-tag {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--amber-primary);
  margin-bottom: 16px;
}

.sol-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 14px;
  line-height: 1.25;
}

.sol-card p {
  color: var(--text-sub);
  font-size: 0.98rem;
  line-height: 1.6;
  margin-bottom: 28px;
}

.sol-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 16px;
  font-size: 0.9rem;
  color: var(--text-sub);
}

.sol-stat strong {
  color: var(--amber-glow);
  font-weight: 700;
}

/* Case Studies Tabs */
.case-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 32px;
  align-items: start;
}

.case-tabs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tab-btn {
  background: var(--surface-card);
  border: 1px solid var(--border-light);
  border-radius: 14px;
  padding: 16px 24px;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-sub);
  transition: all 0.25s ease;
}

.tab-btn:hover {
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.2);
}

.tab-btn.active {
  background: rgba(245, 158, 11, 0.12);
  border-color: var(--amber-primary);
  color: var(--text-main);
  box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);
}

.case-card {
  background: var(--surface-card);
  border: 1px solid var(--border-light);
  border-radius: 28px;
  padding: 48px;
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 40px;
  align-items: center;
  backdrop-filter: blur(12px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.case-card:hover {
  border-color: var(--border-accent);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4);
}

.case-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--amber-primary);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.case-copy h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  transition: opacity 0.3s ease;
}

.case-copy p {
  color: var(--text-sub);
  font-size: 1.05rem;
  line-height: 1.65;
  margin-bottom: 24px;
  transition: opacity 0.3s ease;
}

.text-link {
  color: var(--amber-primary);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.25s ease;
}

.text-link:hover {
  transform: translateX(4px);
  color: var(--amber-glow);
}

.case-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 20px;
  transition: border-color 0.3s ease;
}

.stat-box:hover {
  border-color: rgba(245, 158, 11, 0.3);
}

.stat-num {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--amber-glow);
}

.stat-lbl {
  font-size: 0.8rem;
  color: var(--text-sub);
  font-weight: 500;
}

/* CTA */
.cta-wrap {
  position: relative;
  background: rgba(12, 14, 20, 0.85);
  border: 1px solid var(--border-light);
  border-radius: 36px;
  padding: 90px 40px;
  text-align: center;
  overflow: hidden;
  backdrop-filter: blur(16px);
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
  animation: floatGlow 8s ease-in-out infinite alternate;
}

@keyframes floatGlow {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

.cta-wrap h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 600;
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}

.cta-btn {
  font-size: 1.05rem;
  padding: 14px 32px;
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--border-light);
  background: rgba(4, 5, 7, 0.95);
  padding: 80px 0 40px;
  position: relative;
  z-index: 10;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 64px;
}

.f-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.f-logo span {
  font-family: var(--font-logo);
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--text-main);
}

.f-brand p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.f-col h4 {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-main);
  margin-bottom: 20px;
}

.f-col ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.f-col a {
  color: var(--text-sub);
  font-size: 0.9rem;
}

.f-col a:hover {
  color: var(--amber-primary);
}

.footer-bottom {
  border-top: 1px solid var(--border-light);
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.social-links {
  display: flex;
  gap: 24px;
}

.social-links a {
  color: var(--text-sub);
}

.social-links a:hover {
  color: var(--amber-primary);
}

/* Animations */
.animate-fade-in {
  opacity: 1;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-title, .hero-serif { white-space: normal; }
}

@media (max-width: 1024px) {
  .hero-title { font-size: 3.4rem; }
  .hero-serif { font-size: 3.6rem; }
  .metrics-grid, .solution-grid { grid-template-columns: 1fr 1fr; }
  .case-layout { grid-template-columns: 1fr; }
  .case-tabs { flex-direction: row; }
  .case-card { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .desktop-nav, .nav-actions { display: none; }
  .mobile-menu-btn { display: flex; flex-direction: column; gap: 5px; }
  .hamburger-line { width: 24px; height: 2px; background: var(--text-main); }
  .hero-title { font-size: 2.6rem; }
  .hero-serif { font-size: 2.8rem; }
  .kicker { font-size: 1.1rem; }
  .metrics-grid, .solution-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
}
```

### 3. `script.js`
```javascript
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. THREE.JS — HORIZONTAL HORIZON VIEW 3D LIQUID MIRROR WATER MESH
  // =========================================================================
  const waveCanvas = document.getElementById('wave-canvas');
  if (waveCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    
    // Low-angle horizontal perspective camera looking along the horizon
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.2, 14);
    camera.lookAt(0, -1.2, -10);

    const renderer = new THREE.WebGLRenderer({
      canvas: waveCanvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // High-density segment plane geometry tilted gently for horizontal horizon view
    const widthSegments = 240;
    const heightSegments = 240;
    const geometry = new THREE.PlaneGeometry(90, 90, widthSegments, heightSegments);
    geometry.rotateX(-Math.PI * 0.15); // Gentle horizontal tilt (~27 deg)

    // Physically Based Rendering (PBR) Liquid Grey Mirror Water Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x090b10,              // Dark metallic grey mirror base
      emissive: 0x030406,
      roughness: 0.16,              // High-gloss liquid mirror surface
      metalness: 0.82,              // Liquid dark chrome reflection
      clearcoat: 1.0,               // Wet glossy clearcoat
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide
    });

    const waveMesh = new THREE.Mesh(geometry, material);
    waveMesh.position.set(0, -3.8, -4);
    scene.add(waveMesh);

    // Lighting setup for horizontal horizon reflections
    const ambientLight = new THREE.AmbientLight(0x181c24, 0.9);
    scene.add(ambientLight);

    // Soft Silver-Grey Specular Directional Light along the horizontal horizon
    const mainLight = new THREE.DirectionalLight(0xcbd5e1, 1.9);
    mainLight.position.set(25, 15, 15);
    scene.add(mainLight);

    // Warm Amber Point Light inside lower wave horizon folds
    const amberLight = new THREE.PointLight(0xf59e0b, 7.0, 45);
    amberLight.position.set(-4, -2, -2);
    scene.add(amberLight);

    // Secondary Warm Copper Light
    const copperLight = new THREE.PointLight(0xd97706, 5.0, 40);
    copperLight.position.set(10, -3, -4);
    scene.add(copperLight);

    // Cyan Accent Reflection Light at Far Right Horizon
    const cyanLight = new THREE.PointLight(0x06b6d4, 3.5, 35);
    cyanLight.position.set(22, -4, -6);
    scene.add(cyanLight);

    // Store original vertex positions
    const posAttribute = geometry.attributes.position;
    const initialPositions = posAttribute.array.slice();

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('pointermove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const clock = new THREE.Clock();

    function animateHorizontalWaves() {
      requestAnimationFrame(animateHorizontalWaves);

      const elapsedTime = clock.getElapsedTime();
      const t = elapsedTime * 0.45;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Animate 3D Horizontal Wave Vertices
      for (let i = 0; i < posAttribute.count; i++) {
        const x = initialPositions[i * 3];
        const y = initialPositions[i * 3 + 1];

        // Multi-frequency horizontal wave displacement equation
        const w1 = Math.sin(x * 0.18 + t) * Math.cos(y * 0.14 + t * 0.75) * 2.2;
        const w2 = Math.sin(x * 0.38 - t * 0.6 + y * 0.25) * 1.2;
        const w3 = Math.cos(x * 0.1 + y * 0.18 + t * 0.32) * 1.4;
        const w4 = Math.sin(Math.sqrt(x * x + y * y) * 0.12 - t * 0.4) * 0.7;

        const mouseNudge = Math.sin(x * 0.15 + mouseX * 1.5) * mouseY * 0.4;
        const z = w1 + w2 + w3 + w4 + mouseNudge;

        posAttribute.setZ(i, z);
      }

      posAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Animate Point Lights along the horizon
      amberLight.position.x = Math.sin(t * 0.3) * 8 - 4;
      amberLight.position.z = Math.cos(t * 0.25) * 4 - 3;

      copperLight.position.x = Math.cos(t * 0.35) * 10 + 4;
      copperLight.position.z = Math.sin(t * 0.3) * 4 - 5;

      camera.position.x = Math.sin(t * 0.15) * 0.4 + mouseX * 0.6;
      camera.position.y = 1.2 + mouseY * 0.3;
      camera.lookAt(0, -1.2, -10);

      renderer.render(scene, camera);
    }

    animateHorizontalWaves();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // =========================================================================
  // 2. CURSOR SPOTLIGHT TRACKER
  // =========================================================================
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    let curX = window.innerWidth / 2, curY = window.innerHeight / 2;
    let targetX = curX, targetY = curY;

    document.addEventListener('pointermove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    function animateCursor() {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      cursorGlow.style.left = `${curX}px`;
      cursorGlow.style.top = `${curY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // =========================================================================
  // 3. 3D CARD TILT MICRO-INTERACTIONS
  // =========================================================================
  const tiltCards = document.querySelectorAll('.glow-tilt, .metric-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 18;
      const rotateY = (centerX - x) / 18;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // =========================================================================
  // 4. STAT COUNTERS ANIMATION
  // =========================================================================
  const easeOutExpo = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const isDec = el.dataset.count.includes('.');
          const pre = el.dataset.prefix || '';
          const suf = el.dataset.suffix || '';
          let startTime = null;
          
          const tick = (now) => {
            if (!startTime) startTime = now;
            const progress = Math.min((now - startTime) / 2000, 1);
            const value = easeOutExpo(progress) * target;
            el.textContent = `${pre}${isDec ? value.toFixed(1) : Math.floor(value)}${suf}`;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = `${pre}${isDec ? target.toFixed(1) : target}${suf}`;
          };
          
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  // =========================================================================
  // 5. CASE STUDY TABS SWITCHER
  // =========================================================================
  const caseTabs = document.querySelectorAll('.case-tabs .tab-btn');
  const caseTitle = document.getElementById('case-title');
  const caseDesc = document.getElementById('case-desc');
  
  const caseData = [
    { title: "Deeper markets, less capital", desc: "Discover how Morpho utilized automated liquidity management to drastically increase their liquidity depth while simultaneously reducing the capital required to sustain it onchain." },
    { title: "Automated Treasury Management", desc: "Streamlining DAO treasury operations with algorithmic yield generation and risk-adjusted portfolio rebalancing across multiple DeFi protocols." },
    { title: "Cross-chain Liquidity Provisioning", desc: "Enabling seamless token swaps across 8 different Layer 1 and Layer 2 networks with unified liquidity pools and automated rebalancing." }
  ];

  if (caseTabs.length > 0 && caseTitle && caseDesc) {
    caseTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.tab, 10);
        caseTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        caseTitle.style.opacity = '0';
        caseDesc.style.opacity = '0';
        
        setTimeout(() => {
          caseTitle.textContent = caseData[idx].title;
          caseDesc.textContent = caseData[idx].desc;
          caseTitle.style.opacity = '1';
          caseDesc.style.opacity = '1';
        }, 200);
      });
    });
  }

  // =========================================================================
  // 6. SCROLL OBSERVER & STICKY NAVBAR
  // =========================================================================
  const fadeEls = document.querySelectorAll('.animate-on-scroll');
  const scrollObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => scrollObs.observe(el));

  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 15);
    }, { passive: true });
  }

});
```
