/* app.js - ESG Premium Dashboard Frontend Logic & Visual Interactions */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Mobile Sidebar & Backdrop Navigation
  // ==========================================
  const sidebar = document.getElementById('sidebar');
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (menuToggleBtn && sidebar && drawerOverlay) {
    const toggleSidebar = () => {
      sidebar.classList.toggle('mobile-open');
      drawerOverlay.classList.toggle('active');
    };

    menuToggleBtn.addEventListener('click', toggleSidebar);
    drawerOverlay.addEventListener('click', toggleSidebar);

    // Close sidebar on link click (mobile)
    const navButtons = document.querySelectorAll('.nav-item-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (sidebar.classList.contains('mobile-open')) {
          toggleSidebar();
        }
      });
    });
  }

  // ==========================================
  // 2. Multi-section Page Swapping
  // ==========================================
  const navButtons = document.querySelectorAll('.nav-item-btn');
  const sections = document.querySelectorAll('main section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all nav items
      navButtons.forEach(b => b.classList.remove('active'));
      // Add active to clicked item
      btn.classList.add('active');

      // Hide all sections
      sections.forEach(sec => sec.classList.remove('active'));

      // Show targeted section
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
        // Scroll main content to top
        document.querySelector('.main-content').scrollTop = 0;
      }
    });
  });

  // ==========================================
  // 3. Online Presenter (Slide Viewer)
  // ==========================================
  const totalSlides = 28;
  let currentSlide = 1;

  const slideDisplay = document.getElementById('slideDisplay');
  const slidePrevBtn = document.getElementById('slidePrevBtn');
  const slideNextBtn = document.getElementById('slideNextBtn');
  const slideProgressBarFill = document.getElementById('slideProgressBarFill');
  const slideIndexLabel = document.getElementById('slideIndexLabel');
  const slideSpinner = document.getElementById('slideSpinner');

  const getSlideSrc = (index) => {
    if (index === 11) {
      return `slides_images/slide11.jpeg`;
    }
    return `slides_images/slide${index}.png`;
  };

  const preloadAdjacent = (index) => {
    if (index < totalSlides) {
      const imgNext = new Image();
      imgNext.src = getSlideSrc(index + 1);
    }
    if (index > 1) {
      const imgPrev = new Image();
      imgPrev.src = getSlideSrc(index - 1);
    }
  };

  const renderSlide = (index) => {
    if (index < 1 || index > totalSlides) return;
    currentSlide = index;

    // Show loader
    if (slideSpinner) {
      slideSpinner.classList.add('active');
    }

    const imgLoader = new Image();
    imgLoader.src = getSlideSrc(currentSlide);
    imgLoader.onload = () => {
      if (slideDisplay) {
        slideDisplay.src = imgLoader.src;
      }
      if (slideSpinner) {
        slideSpinner.classList.remove('active');
      }
      preloadAdjacent(currentSlide);
    };

    imgLoader.onerror = () => {
      if (slideSpinner) {
        slideSpinner.classList.remove('active');
      }
    };

    // Update buttons state
    if (slidePrevBtn) slidePrevBtn.disabled = currentSlide === 1;
    if (slideNextBtn) slideNextBtn.disabled = currentSlide === totalSlides;

    // Update progress bar
    if (slideProgressBarFill) {
      const pct = (currentSlide / totalSlides) * 100;
      slideProgressBarFill.style.width = `${pct}%`;
    }

    // Update page label
    if (slideIndexLabel) {
      slideIndexLabel.textContent = `第 ${currentSlide} / ${totalSlides} 頁`;
    }
  };

  if (slidePrevBtn && slideNextBtn && slideDisplay) {
    slidePrevBtn.addEventListener('click', () => {
      if (currentSlide > 1) {
        renderSlide(currentSlide - 1);
      }
    });

    slideNextBtn.addEventListener('click', () => {
      if (currentSlide < totalSlides) {
        renderSlide(currentSlide + 1);
      }
    });

    // Keyboard support: right arrow & space for next, left arrow for prev
    document.addEventListener('keydown', (e) => {
      const slidesSection = document.getElementById('slides-section');
      if (slidesSection && slidesSection.classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          if (currentSlide < totalSlides) {
            renderSlide(currentSlide + 1);
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (currentSlide > 1) {
            renderSlide(currentSlide - 1);
          }
        }
      }
    });

    // Load first slide
    renderSlide(1);
  }

  // ==========================================
  // 4. Premium Dark-Mode Charts (Chart.js)
  // ==========================================
  
  // Custom global Chart.js configurations for Dark Theme
  Chart.defaults.color = '#9CA3AF'; // text-secondary
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 12;

  // Chart 1: Global Market scale trend (Line Chart)
  const trendCtx = document.getElementById('trendChart');
  if (trendCtx) {
    const ctx = trendCtx.getContext('2d');
    
    // Create gradient fill for line chart
    const lineGradient = ctx.createLinearGradient(0, 0, 0, 300);
    lineGradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');   /* Emerald opacity */
    lineGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026 (預估)'],
        datasets: [{
          label: '市場規模 (十億美元)',
          data: [1008, 1075, 1148, 1230, 1318, 1420, 1535],
          borderColor: '#10B981',       /* Emerald */
          borderWidth: 3,
          backgroundColor: lineGradient,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#080B11',   /* Match background */
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#34D399',
          pointHoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#F3F4F6',
            bodyColor: '#10B981',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            titleFont: { family: 'Outfit', size: 13, weight: 'bold' },
            bodyFont: { family: 'Inter', size: 13, weight: '500' },
            callbacks: {
              label: (context) => ` $${context.parsed.y} 十億美元`
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.03)',
              drawTicks: false
            },
            ticks: {
              padding: 10
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.03)',
              drawTicks: false
            },
            ticks: {
              padding: 10
            }
          }
        }
      }
    });
  }

  // Chart 2: Tech Contribution Ratio (Doughnut Chart)
  const contributionCtx = document.getElementById('contributionChart');
  if (contributionCtx) {
    new Chart(contributionCtx, {
      type: 'doughnut',
      data: {
        labels: ['AI智慧路線優化', '新能源電動車隊', 'IoT節能倉庫', '包裝循環與回收'],
        datasets: [{
          data: [35, 30, 20, 15],
          backgroundColor: [
            '#10B981',  /* Emerald */
            '#059669',  /* Medium Emerald */
            '#047857',  /* Deep Emerald */
            '#34D399'   /* Mint */
          ],
          borderColor: '#0E1320', /* Card background color to create clean gaps */
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#9CA3AF',
              padding: 20,
              font: {
                size: 11
              },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#F3F4F6',
            bodyColor: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (context) => ` 貢獻佔比: ${context.parsed}%`
            }
          }
        }
      }
    });
  }

  // ==========================================
  // 5. Personal Wine Collection Lightbox
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const imageContainers = document.querySelectorAll('.collection-image-container');

  if (lightbox && lightboxImg && lightboxTitle && lightboxDesc) {
    
    // Open lightbox
    imageContainers.forEach(container => {
      container.addEventListener('click', () => {
        const imgSrc = container.getAttribute('data-img-src');
        const title = container.getAttribute('data-title');
        const desc = container.getAttribute('data-desc');

        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;

        lightbox.classList.add('active');
      });
    });

    // Close lightbox functions
    const closeLightbox = () => {
      lightbox.classList.remove('active');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close by clicking outside the content
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});
