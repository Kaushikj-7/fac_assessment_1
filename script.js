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
