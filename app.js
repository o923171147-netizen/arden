/* app.js - JavaScript logic for Sustainable Logistics & Green Tech Dashboard */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Sidebar Toggle
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  if (menuToggle && sidebar && sidebarOverlay) {
    const toggleSidebar = () => {
      sidebar.classList.toggle('mobile-active');
      sidebarOverlay.classList.toggle('active');
    };
    
    menuToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking a menu link on mobile
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (sidebar.classList.contains('mobile-active')) {
          toggleSidebar();
        }
      });
    });
  }

  // Sidebar Menu Navigation between Sections
  const menuItems = document.querySelectorAll('.menu-item');
  const sections = document.querySelectorAll('section');
  
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all menu items
      menuItems.forEach(mi => mi.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
      
      // Hide all sections
      sections.forEach(sec => sec.classList.remove('active'));
      
      // Show targeted section
      const targetId = item.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of main content
        document.querySelector('.main-content').scrollTop = 0;
      }
    });
  });

  // Slide Viewer (Carousel) Logic
  const totalSlides = 28;
  let currentSlide = 1;
  
  const slideImage = document.getElementById('slideImage');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const progressFill = document.getElementById('slideProgressFill');
  const indexLabel = document.getElementById('slideIndexLabel');
  const slideLoading = document.getElementById('slideLoading');
  
  const getSlideSrc = (index) => {
    if (index === 11) {
      return `slides_images/slide11.jpeg`;
    }
    return `slides_images/slide${index}.png`;
  };

  const preloadAdjacentSlides = (currentIndex) => {
    // Preload next slide
    if (currentIndex < totalSlides) {
      const nextImg = new Image();
      nextImg.src = getSlideSrc(currentIndex + 1);
    }
    // Preload previous slide
    if (currentIndex > 1) {
      const prevImg = new Image();
      prevImg.src = getSlideSrc(currentIndex - 1);
    }
  };
  
  const updateSlide = (index) => {
    if (index < 1 || index > totalSlides) return;
    currentSlide = index;
    
    // Show loading spinner
    slideLoading.classList.add('active');
    
    // Create new image object to ensure smooth loading transition
    const tempImg = new Image();
    tempImg.src = getSlideSrc(currentSlide);
    tempImg.onload = () => {
      slideImage.src = tempImg.src;
      slideLoading.classList.remove('active');
      preloadAdjacentSlides(currentSlide);
    };
    
    tempImg.onerror = () => {
      // Fallback if load fails
      slideLoading.classList.remove('active');
    };
    
    // Update Button states
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
    
    // Update Progress Bar & Labels
    const progressPercent = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progressPercent}%`;
    indexLabel.textContent = `第 ${currentSlide} / ${totalSlides} 頁`;
  };
  
  if (prevBtn && nextBtn && slideImage) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 1) {
        updateSlide(currentSlide - 1);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentSlide < totalSlides) {
        updateSlide(currentSlide + 1);
      }
    });
    
    // Support keyboard arrow keys for slide navigation if section is active
    document.addEventListener('keydown', (e) => {
      const pptSection = document.getElementById('ppt-section');
      if (pptSection && pptSection.classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          if (currentSlide < totalSlides) updateSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (currentSlide > 1) updateSlide(currentSlide - 1);
        }
      }
    });

    // Initial load
    updateSlide(1);
  }

  // Chart.js Implementations
  // Chart 1: Market growth Trend Line Chart
  const trendCtx = document.getElementById('marketTrendChart');
  if (trendCtx) {
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026 (預估)'],
        datasets: [{
          label: '全球綠色物流市場規模 (十億美元)',
          data: [1008, 1075, 1148, 1230, 1318, 1420, 1535],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#080b11',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
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
            padding: 12,
            backgroundColor: '#0d121f',
            titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
            bodyFont: { family: 'Inter', size: 13 },
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `產值: $${context.raw} 十億美元`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawTicks: false
            },
            ticks: {
              color: '#9ca3af',
              font: { family: 'Inter', size: 12 },
              padding: 10
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawTicks: false
            },
            ticks: {
              color: '#9ca3af',
              font: { family: 'Inter', size: 12 },
              padding: 10
            }
          }
        }
      }
    });
  }

  // Chart 2: Tech carbon reduction contributions Donut Chart
  const contribCtx = document.getElementById('reductionContributionChart');
  if (contribCtx) {
    new Chart(contribCtx, {
      type: 'doughnut',
      data: {
        labels: ['AI 智慧路線優化', '新能源電動車隊', 'IoT 節能倉庫', '包裝循環與回收'],
        datasets: [{
          data: [35, 30, 20, 15],
          backgroundColor: [
            '#10b981', // Emerald
            '#06b6d4', // Cyan
            '#3b82f6', // Blue
            '#f59e0b'  // Amber
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#9ca3af',
              font: { family: 'Inter', size: 12 },
              padding: 18,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            padding: 12,
            backgroundColor: '#0d121f',
            titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
            bodyFont: { family: 'Inter', size: 13 },
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return ` 減碳貢獻比重: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }
});
