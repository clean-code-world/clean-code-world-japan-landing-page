document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Slider for cases section
  const caseImageEl = document.getElementById('case-image');
  const prevBtn = document.querySelector('.cases__btn--prev');
  const nextBtn = document.querySelector('.cases__btn--next');
  if (caseImageEl && prevBtn && nextBtn) {
    const caseImages = [
      'assets/img/case-1.png',
      'assets/img/case-1.webp',
      'assets/img/case-2.webp'
    ];
    let caseIdx = 0;
    
    const updateCase = (direction = 'next') => {
      // Fade out
      caseImageEl.style.opacity = '0';
      caseImageEl.style.transform = direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)';
      
      setTimeout(() => {
        // Update image
        caseImageEl.src = caseImages[caseIdx];
        
        // Fade in with opposite direction
        caseImageEl.style.opacity = '1';
        caseImageEl.style.transform = 'translateX(0)';
      }, 250);
    };
    
    prevBtn.addEventListener('click', () => {
      caseIdx = (caseIdx - 1 + caseImages.length) % caseImages.length;
      updateCase('prev');
    });
    
    nextBtn.addEventListener('click', () => {
      caseIdx = (caseIdx + 1) % caseImages.length;
      updateCase('next');
    });
    
    // Initialize with first image
    if (caseImages.length > 0) {
      caseImageEl.src = caseImages[0];
      caseImageEl.style.opacity = '1';
      caseImageEl.style.transform = 'translateX(0)';
    }
  }

  // Scroll-triggered animations for reason cards
  const reasonsSection = document.getElementById('reasons');
  const reasonCards = document.querySelectorAll('.reason-card');
  
  if (reasonsSection && reasonCards.length > 0) {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reasonCards.forEach((card, index) => {
            // Add visible class to trigger entrance animation
            card.classList.add('reason-card--visible');
            
            // Calculate delay based on card position
            const entranceDelay = index * 200; // 0ms, 200ms, 400ms, 600ms
            const entranceDuration = 800; // 0.8s
            
            // After entrance animation completes, remove visible class and add continuous animation
            setTimeout(() => {
              card.classList.remove('reason-card--visible');
              card.classList.add('reason-card--animated');
            }, entranceDelay + entranceDuration + 100); // Wait for entrance to complete
          });
          
          // Unobserve after triggering to prevent re-triggering
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(reasonsSection);
  }
});


