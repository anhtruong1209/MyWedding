/**
 * Custom Wedding Animations
 * Beautiful animations for Trâm & Trường wedding website
 */

(function() {
  'use strict';

  // Initialize animations when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Floating Hearts Animation
    createFloatingHearts();
    
    // 2. Typing Animation
    initTypingAnimation();
    
    // 3. Scroll Progress Indicator
    initScrollProgress();
    
    // 4. Smooth Scroll Animation
    initSmoothScroll();
    
    // 5. Scroll Reveal Animations
    initScrollReveal();
    
    // 6. Image Hover Effects
    initImageHoverEffects();
    
    // 7. Sparkle Effects
    createSparkles();
    
    // 8. Magnetic Buttons
    initMagneticButtons();
    
    // 9. Animate on Scroll
    initAnimateOnScroll();
    
    // 10. 3D Card Effects
    init3DCardEffects();
    
  });

  // Create floating hearts
  function createFloatingHearts() {
    const section = document.querySelector('#section-hero');
    if (!section) return;
    
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#dc143c', '#ff69b4'];
    
    function createHeart() {
      const heart = document.createElement('div');
      heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.className = 'floating-heart';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
      heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
      heart.style.animationDelay = Math.random() * 2 + 's';
      
      section.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 3000);
  }

  // Typing animation for names
  function initTypingAnimation() {
    const nameElements = document.querySelectorAll('.name');
    nameElements.forEach(function(element, index) {
      const text = element.textContent;
      element.textContent = '';
      element.style.opacity = '1';
      
      let i = 0;
      setTimeout(function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
        }
      }, index * 2000);
    });
  }

  // Scroll progress indicator
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }

  // Smooth scroll
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Scroll reveal animations
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Add different animation classes based on data attribute
          const animationType = entry.target.getAttribute('data-animation');
          if (animationType) {
            entry.target.classList.add(animationType);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animation attributes
    document.querySelectorAll('[data-animation]').forEach(el => {
      observer.observe(el);
    });

    // Add animations to images
    document.querySelectorAll('img').forEach(img => {
      img.classList.add('img-zoom-on-scroll');
      observer.observe(img);
    });
  }

  // Image hover effects with tilt
  function initImageHoverEffects() {
    const images = document.querySelectorAll('.img-responsive, figure img');
    
    images.forEach(img => {
      img.parentElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(1deg)';
      });
      
      img.parentElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
      });
      
      // Add transition
      img.parentElement.style.transition = 'transform 0.5s ease';
    });
  }

  // Create sparkle effects
  function createSparkles() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      if (section.id && !section.id.includes('countdown') && !section.id.includes('couple')) {
        for (let i = 0; i < 5; i++) {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          sparkle.style.left = Math.random() * 100 + '%';
          sparkle.style.top = Math.random() * 100 + '%';
          sparkle.style.animationDelay = Math.random() * 2 + 's';
          sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
          section.appendChild(sparkle);
        }
      }
    });
  }

  // Magnetic button effect
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, a, button');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Animate elements on scroll
  function initAnimateOnScroll() {
    const animatedElements = document.querySelectorAll('.wow');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.2
    });
    
    animatedElements.forEach(el => observer.observe(el));
  }

  // 3D Card Effects
  function init3DCardEffects() {
    const cards = document.querySelectorAll('.card, .de_testi, .picframe');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  // Counter Animation Enhancement
  function animateCounter() {
    const counters = document.querySelectorAll('.timer');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Add parallax effect to sections
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('[data-parallax]');
    
    sections.forEach(section => {
      const speed = section.getAttribute('data-parallax') || 0.5;
      section.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn, button, a');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add CSS for ripple animation if not exists
  if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      .btn, button, a {
        position: relative;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  // Text reveal animation on scroll
  function initTextReveal() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
          entry.target.style.transition = 'clip-path 1s ease-out';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    textElements.forEach(el => {
      el.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
      observer.observe(el);
    });
  }

  // Initialize text reveal
  setTimeout(initTextReveal, 500);

})();
