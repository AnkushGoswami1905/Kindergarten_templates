document.addEventListener('DOMContentLoaded', function() {
    // 1. Smooth scroll for Discover More button
    const discoverBtn = document.getElementById('discoverBtn');
    const contentSection = document.getElementById('about-us');
    
    if (discoverBtn && contentSection) {
        discoverBtn.addEventListener('click', function() {
            contentSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // 2. Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // 3. Gallery Carousel Functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Only initialize carousel if elements exist
    if (slides.length > 0) {
        // Function to show current slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Deactivate all indicators
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Show current slide
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            currentSlide = index;
        }

        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Event listeners for buttons
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Event listeners for indicators
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });

        // Initialize first slide
        showSlide(0);
    }

    // 4. Faculty Section Animations (New Addition)
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    // Only run if faculty section exists
    if (teacherCards.length > 0) {
        // Set initial state for animation
        teacherCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
        });

        // Animate cards sequentially
        function animateCards() {
            teacherCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
        
        // Start animation with slight delay
        setTimeout(animateCards, 300);
        
        // Optional: Uncomment to animate when section comes into view
        
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }
        
        function checkFacultyVisibility() {
            if (isInViewport(document.querySelector('.faculty-section'))) {
                animateCards();
                window.removeEventListener('scroll', checkFacultyVisibility);
            }
        }
        
        window.addEventListener('scroll', checkFacultyVisibility);
        
    }

    document.addEventListener('DOMContentLoaded', function() {
  // Animate connecting lines on load
  const lines = document.querySelectorAll('.line');
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.animation = `drawLine 1s ${index * 0.2}s forwards`;
    }, 500);
  });

  // Make orbs draggable (optional)
  const orbs = document.querySelectorAll('.contact-orb');
  orbs.forEach(orb => {
    orb.addEventListener('mousedown', function(e) {
      let shiftX = e.clientX - orb.getBoundingClientRect().left;
      let shiftY = e.clientY - orb.getBoundingClientRect().top;
      
      function moveAt(pageX, pageY) {
        const orbit = document.querySelector('.contact-orbit');
        const orbitRect = orbit.getBoundingClientRect();
        
        // Keep within orbit bounds
        const x = Math.min(Math.max(pageX - orbitRect.left - shiftX, 0), orbitRect.width - orb.offsetWidth);
        const y = Math.min(Math.max(pageY - orbitRect.top - shiftY, 0), orbitRect.height - orb.offsetHeight);
        
        orb.style.left = x + 'px';
        orb.style.top = y + 'px';
        
        // Update connector lines (simplified)
        updateConnectors();
      }
      
      function updateConnectors() {
        // This would require more complex SVG path calculations
        // For simplicity, we'll just trigger a reflow
        document.querySelector('.connectors').style.display = 'none';
        document.querySelector('.connectors').offsetHeight;
        document.querySelector('.connectors').style.display = 'block';
      }
      
      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }
      
      document.addEventListener('mousemove', onMouseMove);
      
      orb.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        orb.onmouseup = null;
      };
    });
    
    orb.ondragstart = function() {
      return false;
    };
  });
});
});