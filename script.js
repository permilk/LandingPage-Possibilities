/* ═══════════════════════════════════════════════════════
   POSSIBILITIES FOR YOU — Interactive Scripts
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar Scroll ──
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Mobile Menu Toggle ──
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.navbar-links');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ── Scroll Reveal Animation ──
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Counter Animation ──
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                const prefix = el.dataset.prefix || '';
                const duration = 2000;
                const start = performance.now();

                function updateCounter(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    el.textContent = prefix + current.toLocaleString() + suffix;
                    if (progress < 1) requestAnimationFrame(updateCounter);
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    // ── Video Modal ──
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const playOverlay = document.querySelector('.play-overlay');
    const modalClose = document.querySelector('.video-modal-close');

    if (playOverlay) {
        playOverlay.addEventListener('click', () => {
            videoModal.classList.add('active');
            modalVideo.play();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            videoModal.classList.remove('active');
            modalVideo.pause();
            modalVideo.currentTime = 0;
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.currentTime = 0;
            }
        });
    }

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ═══════════════════════════════════════════════════════
    //  CHATBOT — Virtual Assistant
    // ═══════════════════════════════════════════════════════
    const chatToggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const chatMessages = document.querySelector('.chatbot-messages');

    const faqData = [
        {
            question: '¿Qué es la Masterclass Possibilities For You?',
            answer: 'Es un programa intensivo de <strong>6.5 horas</strong> basado en la metodología <strong>Clifton Strengths® de Gallup</strong>. Te ayuda a descubrir tus 34 talentos naturales, definir tu propósito de vida y crear un plan de acción concreto para alcanzar tu máximo potencial.'
        },
        {
            question: '¿Qué incluye el programa?',
            answer: 'El programa incluye:<br>• <strong>Reporte Clifton Strengths®</strong> (34 talentos, valor USD $59.99)<br>• <strong>Masterclass de 6:30 horas</strong> en formato virtual<br>• <strong>Sesión 1:1 personalizada</strong> para diagnóstico de vida<br>• <strong>Acceso a Plataforma de Coaching</strong> con recursos y herramientas de seguimiento'
        },
        {
            question: '¿Quién es el facilitador?',
            answer: '<strong>Porfirio Gómez</strong> es Coach Certificado en Fortalezas por Gallup, Licenciado en Ciencias de la Familia, con más de <strong>14 años de experiencia</strong>. Ha dado consultoría en <strong>+9 países</strong>, trabajando con <strong>+40 organizaciones</strong> como PepsiCo, Walmart, AXA Seguros y Televisa, impactando a <strong>+3,000 líderes</strong>.'
        },
        {
            question: '¿Cuánto cuesta y cómo me inscribo?',
            answer: 'Para conocer precios actualizados y próximas fechas, puedes inscribirte directamente en nuestra plataforma de boletos:<br><br><a href="https://buytickets.at/possibilitiesco" target="_blank" style="color:#d4b85c;font-weight:600;">🎟️ Inscribirme Ahora</a><br><br>O agenda una <a href="https://calendly.com/porfirio-gomez/possibilities-call" target="_blank" style="color:#d4b85c;font-weight:600;">videollamada gratuita</a> para más información.'
        },
        {
            question: '¿Qué resultados puedo esperar?',
            answer: 'Al finalizar el programa podrás:<br>• Conocer tus <strong>34 talentos</strong> y cómo potenciarlos<br>• Tener un <strong>plan de vida</strong> alineado con tu propósito<br>• Definir <strong>metas SMART</strong> con prioridades claras<br>• Construir una <strong>red de apoyo sólida</strong><br>• Desarrollar <strong>inmunidad al fracaso</strong> y resiliencia'
        },
        {
            question: '¿Es presencial o virtual?',
            answer: 'La Masterclass se imparte en <strong>formato virtual</strong>, lo que te permite participar desde cualquier lugar. El contenido es estructurado, dinámico e interactivo para asegurar la mejor experiencia de aprendizaje.'
        },
        {
            question: 'Quiero hablar con alguien directamente',
            answer: '¡Por supuesto! Puedes agendar una <strong>videollamada gratuita</strong> con Porfirio Gómez para resolver todas tus dudas:<br><br><a href="https://calendly.com/porfirio-gomez/possibilities-call" target="_blank" style="color:#d4b85c;font-weight:600;">📅 Agendar Videollamada</a>'
        }
    ];

    // Toggle chatbot
    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatToggle.classList.toggle('active');
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active') && chatMessages.children.length === 0) {
                showWelcomeMessage();
            }
        });
    }

    function showWelcomeMessage() {
        addBotMessage('👋 ¡Hola! Soy el <strong>Asistente Possibilities</strong>. Estoy aquí para ayudarte a conocer más sobre nuestra Masterclass. ¿Qué te gustaría saber?');
        setTimeout(() => showOptions(), 400);
    }

    function showOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';
        faqData.forEach((faq, index) => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = faq.question;
            btn.addEventListener('click', () => handleOptionClick(index, optionsDiv));
            optionsDiv.appendChild(btn);
        });
        chatMessages.appendChild(optionsDiv);
        scrollChat();
    }

    function handleOptionClick(index, optionsContainer) {
        const faq = faqData[index];
        // Remove the options
        if (optionsContainer) optionsContainer.remove();
        // Show user question
        addUserMessage(faq.question);
        // Show typing indicator briefly
        const typing = addBotMessage('<em>Escribiendo...</em>');
        setTimeout(() => {
            typing.innerHTML = faq.answer;
            // Show options again after response
            setTimeout(() => {
                addBotMessage('¿Hay algo más en lo que pueda ayudarte?');
                setTimeout(() => showOptions(), 300);
            }, 600);
        }, 800);
    }

    function addBotMessage(html) {
        const msg = document.createElement('div');
        msg.className = 'chat-message bot';
        msg.innerHTML = html;
        chatMessages.appendChild(msg);
        scrollChat();
        return msg;
    }

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'chat-message user';
        msg.textContent = text;
        chatMessages.appendChild(msg);
        scrollChat();
        return msg;
    }

    function scrollChat() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 50);
    }

});
