document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. THREE.JS — FULL-PAGE 3D WAVE MESH BACKGROUND
  // =========================================================================
  const waveCanvas = document.getElementById('wave-canvas');
  if (waveCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 18, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: waveCanvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Primary Wave
    const planeGeo = new THREE.PlaneGeometry(60, 60, 180, 180);
    planeGeo.rotateX(-Math.PI * 0.5);
    const planeMat = new THREE.MeshBasicMaterial({ color: 0xec9117, wireframe: true, transparent: true, opacity: 0.08 });
    const waveMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(waveMesh);

    // Depth Wave
    const planeGeo2 = new THREE.PlaneGeometry(60, 60, 120, 120);
    planeGeo2.rotateX(-Math.PI * 0.5);
    const planeMat2 = new THREE.MeshBasicMaterial({ color: 0xf5a623, wireframe: true, transparent: true, opacity: 0.04 });
    const waveMesh2 = new THREE.Mesh(planeGeo2, planeMat2);
    waveMesh2.position.y = -1.5;
    scene.add(waveMesh2);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('pointermove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    const clock = new THREE.Clock();

    function animateWave() {
      requestAnimationFrame(animateWave);
      const t = clock.getElapsedTime();

      const pos = planeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), z = pos.getZ(i);
        const y = Math.sin(x * 0.3 + t * 0.4) * Math.cos(z * 0.3 + t * 0.3) * 1.5 + Math.sin(x * 0.15 + t * 0.2) * 0.8;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      const pos2 = planeGeo2.attributes.position;
      for (let i = 0; i < pos2.count; i++) {
        const x = pos2.getX(i), z = pos2.getZ(i);
        const y = Math.sin(x * 0.2 + t * 0.3) * Math.cos(z * 0.25 + t * 0.25) * 1.2 + Math.cos(x * 0.1 + t * 0.18) * 0.6;
        pos2.setY(i, y);
      }
      pos2.needsUpdate = true;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animateWave();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // =========================================================================
  // 2. THREE.JS — HERO CLOSE-UP WAVE
  // =========================================================================
  const heroWaveCanvas = document.getElementById('hero-wave-canvas');
  const heroVisualEl = document.querySelector('.hero-visual');
  if (heroWaveCanvas && heroVisualEl && typeof THREE !== 'undefined') {
    const hScene = new THREE.Scene();
    const hCamera = new THREE.PerspectiveCamera(50, heroVisualEl.offsetWidth / heroVisualEl.offsetHeight, 0.1, 100);
    hCamera.position.set(0, 8, 12);
    hCamera.lookAt(0, 0, 0);

    const hRenderer = new THREE.WebGLRenderer({ canvas: heroWaveCanvas, antialias: true, alpha: true });
    hRenderer.setSize(heroVisualEl.offsetWidth, heroVisualEl.offsetHeight);
    hRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const hGeo = new THREE.PlaneGeometry(30, 30, 150, 150);
    hGeo.rotateX(-Math.PI * 0.55);
    const hMat = new THREE.MeshBasicMaterial({ color: 0xec9117, wireframe: true, transparent: true, opacity: 0.15 });
    const hWave = new THREE.Mesh(hGeo, hMat);
    hScene.add(hWave);

    const hClock = new THREE.Clock();

    function animateHeroWave() {
      requestAnimationFrame(animateHeroWave);
      const t = hClock.getElapsedTime();
      const pos = hGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), z = pos.getZ(i);
        const y = Math.sin(x * 0.4 + t * 0.5) * Math.cos(z * 0.35 + t * 0.4) * 2.0 + Math.sin(x * 0.2 + t * 0.25) * 1.0;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
      hCamera.position.x = Math.sin(t * 0.15) * 1.5;
      hCamera.lookAt(0, 0, 0);
      hRenderer.render(hScene, hCamera);
    }
    animateHeroWave();

    window.addEventListener('resize', () => {
      if (heroVisualEl.offsetWidth > 0) {
        hCamera.aspect = heroVisualEl.offsetWidth / heroVisualEl.offsetHeight;
        hCamera.updateProjectionMatrix();
        hRenderer.setSize(heroVisualEl.offsetWidth, heroVisualEl.offsetHeight);
      }
    });
  }

  // =========================================================================
  // 3. GRAIN CANVAS
  // =========================================================================
  const grainCanvas = document.getElementById('grain-canvas');
  if (grainCanvas) {
    const ctx = grainCanvas.getContext('2d');
    const grainResize = () => { grainCanvas.width = window.innerWidth; grainCanvas.height = window.innerHeight; };
    grainResize();
    window.addEventListener('resize', grainResize);
    
    let lastGrain = 0;
    const drawGrain = (ts) => {
      if (ts - lastGrain > 100) {
        const idata = ctx.createImageData(grainCanvas.width, grainCanvas.height);
        for (let i = 0; i < idata.data.length; i += 4) {
          const n = Math.random() * 50;
          idata.data[i] = n; idata.data[i+1] = n; idata.data[i+2] = n; idata.data[i+3] = 14;
        }
        ctx.putImageData(idata, 0, 0);
        lastGrain = ts;
      }
      requestAnimationFrame(drawGrain);
    };
    requestAnimationFrame(drawGrain);
  }

  // =========================================================================
  // 4. ANIMATIONS & TABS
  // =========================================================================
  const easeOutExpo = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const cObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const isDec = el.dataset.count.includes('.');
          const pre = el.dataset.prefix || '';
          const suf = el.dataset.suffix || '';
          let start = null;
          const tick = (now) => {
            if (!start) start = now;
            const p = Math.min((now - start) / 2000, 1);
            const v = easeOutExpo(p) * target;
            el.textContent = `${pre}${isDec ? v.toFixed(1) : Math.floor(v)}${suf}`;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = `${pre}${isDec ? target.toFixed(1) : target}${suf}`;
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cObs.observe(c));
  }

  const fadeEls = document.querySelectorAll('.animate-on-scroll');
  const fObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => fObs.observe(el));

  const caseTabs = document.querySelectorAll('.case-tabs .tab-btn');
  const caseCard = document.querySelector('.case-card');
  const caseData = [
    { title: "Deeper markets, less capital", desc: "Discover how Morpho utilized automated liquidity management to drastically increase their liquidity depth while simultaneously reducing the capital required to sustain it onchain." },
    { title: "Automated Treasury Management", desc: "Streamlining DAO treasury operations with algorithmic yield generation and risk-adjusted portfolio rebalancing across multiple DeFi protocols." },
    { title: "Cross-chain Liquidity Provisioning", desc: "Enabling seamless token swaps across 8 different Layer 1 and Layer 2 networks with unified liquidity pools and automated rebalancing." }
  ];
  
  if (caseTabs.length > 0 && caseCard) {
    caseTabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        caseTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        caseCard.style.opacity = '0';
        setTimeout(() => {
          const d = caseData[idx];
          caseCard.querySelector('h3').textContent = d.title;
          caseCard.querySelector('p').textContent = d.desc;
          caseCard.style.opacity = '1';
        }, 300);
      });
    });
  }

  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

});
