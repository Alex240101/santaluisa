document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const body = document.body;

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        body.classList.toggle('no-scroll');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('nav-active');
            body.classList.remove('no-scroll');
            burger.classList.remove('toggle');
            navLinks.forEach((link) => {
                link.style.animation = '';
            });
        }
    });

    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const yOffset = -60; // Adjust this value based on your header height
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({top: y, behavior: 'smooth'});

                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    body.classList.remove('no-scroll');
                    burger.classList.remove('toggle');
                    navLinks.forEach((link) => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

    // Contact form submission to WhatsApp
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && message) {
                if (isValidEmail(email)) {
                    const whatsappMessage = `Nombre: ${name}%0AEmail: ${email}%0AMensaje: ${message}`;
                    const whatsappUrl = `https://wa.me/51123456789?text=${whatsappMessage}`;
                    window.open(whatsappUrl, '_blank');
                    contactForm.reset();
                } else {
                    alert('Por favor, ingresa un email válido.');
                }
            } else {
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Parallax effect for hero sections
    const parallaxSections = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;

        parallaxSections.forEach(section => {
            let offset = section.offsetTop;
            let height = section.offsetHeight;

            if (scrollPosition >= offset - window.innerHeight && scrollPosition < offset + height) {
                let speed = section.dataset.speed || 0.5;
                let yPos = (scrollPosition - offset) * speed;
                section.style.backgroundPosition = `50% ${yPos}px`;
            }
        });
    });

    // Animate numbers
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const numberElements = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const finalValue = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, finalValue, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    numberElements.forEach(el => observer.observe(el));

    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        let currentSlide = 0;
        const slides = testimonialsSlider.querySelectorAll('.testimonial');
        const totalSlides = slides.length;
        const prevButton = testimonialsSlider.querySelector('.prev-button');
        const nextButton = testimonialsSlider.querySelector('.next-button');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }

        setInterval(nextSlide, 5000); // Change slide every 5 seconds
        showSlide(currentSlide); // Show initial slide
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                lazyImageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
    });

    // Form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                form.submit();
            }
        });
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    // Tooltip
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.classList.add('tooltip');
            tooltipEl.textContent = tooltipText;
            document.body.appendChild(tooltipEl);

            const rect = e.target.getBoundingClientRect();
            tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
            tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
        });

        tooltip.addEventListener('mouseleave', () => {
            const tooltipEl = document.querySelector('.tooltip');
            if (tooltipEl) {
                tooltipEl.remove();
            }
        });
    });
});
// Agregar al final del archivo script.js

// Función para manejar el envío del formulario de admisión
function handleAdmisionFormSubmit(e) {
    e.preventDefault();
    
    const nombreAlumno = document.getElementById('nombre-alumno').value.trim();
    const gradoAcademico = document.getElementById('grado-academico').value.trim();
    const colegioProcedencia = document.getElementById('colegio-procedencia').value.trim();
    const nombreApoderado = document.getElementById('nombre-apoderado').value.trim();
    const celular = document.getElementById('celular').value.trim();
    
    if (nombreAlumno && gradoAcademico && colegioProcedencia && nombreApoderado && celular) {
        const mensaje = 
`NOMBRES Y APELLIDOS DEL ALUMNO: ${nombreAlumno}
GRADO ACADÉMICO: ${gradoAcademico}
COLEGIO DE PROCEDENCIA: ${colegioProcedencia}
DATOS DEL APODERADO
NOMBRES Y APELLIDOS: ${nombreApoderado}
CELULAR: ${celular}
REQUIERO INFORME POR FAVOR.`;

        const mensajeCodeado = encodeURIComponent(mensaje);
        const whatsappUrl = `https://wa.me/51997562008?text=${mensajeCodeado}`;
        window.open(whatsappUrl, '_blank');
        
        // Reiniciar el formulario
        document.getElementById('admision-form').reset();
    } else {
        alert('Por favor, complete todos los campos requeridos.');
    }
}

// Agregar el evento de envío al formulario de admisión
document.addEventListener('DOMContentLoaded', () => {
    const admisionForm = document.getElementById('admision-form');
    if (admisionForm) {
        admisionForm.addEventListener('submit', handleAdmisionFormSubmit);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Función para alternar el menú
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Evento para el botón hamburguesa
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Prevenir que el menú se cierre al hacer clic dentro
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    // Función para alternar el menú
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    // Event listener para el botón hamburguesa
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Cerrar menú cuando se hace clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Funcionalidad de los dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
    });

    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', () => {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            
            // Número de WhatsApp
            const phoneNumber = '997562008';
            
            // Crear el mensaje para WhatsApp
            const whatsappMessage = encodeURIComponent(`Nombre: ${name}\nMensaje: ${message}`);
            
            // Crear el enlace de WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            
            // Redirigir a WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery-grid');
    let currentIndex = 0;
    const images = gallery.querySelectorAll('a');
  
    function openLightbox(index) {
      const lightbox = document.createElement('div');
      lightbox.classList.add('lightbox');
      
      const content = document.createElement('div');
      content.classList.add('lightbox-content');
      
      const img = document.createElement('img');
      img.src = images[index].href;
      img.alt = images[index].querySelector('img').alt;
      img.classList.add('lightbox-image');
      
      const caption = document.createElement('div');
      caption.classList.add('lightbox-caption');
      caption.textContent = images[index].dataset.title;
      
      const close = document.createElement('button');
      close.classList.add('lightbox-close');
      close.innerHTML = '&times;';
      close.addEventListener('click', closeLightbox);
      
      const prev = document.createElement('button');
      prev.classList.add('lightbox-prev');
      prev.innerHTML = '&#10094;';
      prev.addEventListener('click', () => navigate(-1));
      
      const next = document.createElement('button');
      next.classList.add('lightbox-next');
      next.innerHTML = '&#10095;';
      next.addEventListener('click', () => navigate(1));
      
      content.appendChild(img);
      content.appendChild(caption);
      content.appendChild(close);
      content.appendChild(prev);
      content.appendChild(next);
      lightbox.appendChild(content);
      
      document.body.appendChild(lightbox);
      setTimeout(() => lightbox.classList.add('show'), 50);
      
      currentIndex = index;
    }
  
    function closeLightbox() {
      const lightbox = document.querySelector('.lightbox');
      lightbox.classList.remove('show');
      setTimeout(() => lightbox.remove(), 300);
    }
  
    function navigate(direction) {
      currentIndex = (currentIndex + direction + images.length) % images.length;
      const lightboxImage = document.querySelector('.lightbox-image');
      const lightboxCaption = document.querySelector('.lightbox-caption');
      lightboxImage.src = images[currentIndex].href;
      lightboxImage.alt = images[currentIndex].querySelector('img').alt;
      lightboxCaption.textContent = images[currentIndex].dataset.title;
    }
  
    gallery.addEventListener('click', function(e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        const index = Array.from(images).indexOf(e.target.parentElement);
        openLightbox(index);
      }
    });
  
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      }
    });
  });



        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        let currentIndex = 0;

        function openModal(index) {
            currentIndex = index;
            modalImg.src = galleryItems[index].src;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        function showPrevious() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            modalImg.src = galleryItems[currentIndex].src;
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            modalImg.src = galleryItems[currentIndex].src;
        }

        galleryItems.forEach((img, index) => {
            img.addEventListener('click', () => openModal(index));
        });

        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrevious);
        nextBtn.addEventListener('click', showNext);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft') showPrevious();
                if (e.key === 'ArrowRight') showNext();
            }
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            if (touchEndX < touchStartX) {
                showNext();
            }
            if (touchEndX > touchStartX) {
                showPrevious();
            }
        }

        // Burger menu functionality
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });







  