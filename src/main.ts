declare const anime: any;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize background particles
  createBackgroundParticles();

  // Initial Hero Animation
  animateHero();

  // Button Interaction
  const revealBtn = document.querySelector('.btn-reveal') as HTMLElement;
  if (revealBtn) {
    revealBtn.addEventListener('click', startMessageReveal);

    // Magnetic Hover Effect
    revealBtn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = revealBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      anime({
        targets: revealBtn,
        translateX: x * 0.2,
        translateY: y * 0.2,
        duration: 400,
        easing: 'easeOutQuad'
      });
    });

    revealBtn.addEventListener('mouseleave', () => {
      anime({
        targets: revealBtn,
        translateX: 0,
        translateY: 0,
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
      });
    });
  }
});

function createBackgroundParticles() {
  const particleContainer = document.body;
  const colors = ['#F8BBD0', '#FFCCBC', '#FFE0B2', '#D4AF37'];
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('bg-particle');

    // Random properties
    const size = Math.random() * 20 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.left = `${left}vw`;
    particle.style.top = `${top}vh`;

    particleContainer.appendChild(particle);

    // Animate each particle
    anime({
      targets: particle,
      translateX: () => anime.random(-50, 50),
      translateY: () => anime.random(-50, 50),
      scale: [0.8, 1.2],
      opacity: [0.3, 0.6],
      easing: 'easeInOutSine',
      duration: () => anime.random(3000, 8000),
      direction: 'alternate',
      loop: true,
      delay: () => anime.random(0, 2000)
    });
  }
}

function animateHero() {
  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000
  });

  timeline
    .add({
      targets: 'h1',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1200,
      delay: 500
    })
    .add({
      targets: '.subtext',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      offset: '-=800'
    })
    .add({
      targets: '.btn-reveal',
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 800,
      offset: '-=600'
    });
}

function startMessageReveal() {
  const heroSection = document.querySelector('.hero-content') as HTMLElement;
  const messageContainer = document.querySelector('.message-container') as HTMLElement;
  const finalReveal = document.querySelector('.final-reveal') as HTMLElement;

  // Fade out hero content
  anime({
    targets: heroSection,
    opacity: 0,
    translateY: -20,
    duration: 800,
    easing: 'easeInOutQuad',
    complete: () => {
      heroSection.style.display = 'none';
      messageContainer.style.display = 'flex';

      // Animate message lines
      const messageTimeline = anime.timeline({
        easing: 'easeOutQuad'
      });

      const lines = document.querySelectorAll('.message-line');

      lines.forEach((line, index) => {
        messageTimeline.add({
          targets: line,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 1500,
          delay: index === 0 ? 500 : 2000 // Pause between lines
        });

        // Fade out previous line if not the last one (optional, but requested "display lines one by one")
        // The prompt says "Display lines one by one", usually implies stacking or replacing.
        // "Pause slightly between each line for emotional pacing."
        // Let's keep them visible to build the message, or fade them out?
        // "Display lines one by one with soft fade + upward motion"
        // I'll keep them on screen to form a poem, it's more emotional.
      });

      // After messages, show final reveal
      messageTimeline.finished.then(() => {
        setTimeout(() => {
          // Fade out messages
          anime({
            targets: messageContainer,
            opacity: 0,
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: () => {
              messageContainer.style.display = 'none';
              finalReveal.style.display = 'block';
              animateFinalReveal();
            }
          });
        }, 3000); // Wait a bit after last line
      });
    }
  });
}

function animateFinalReveal() {
  const timeline = anime.timeline({
    easing: 'easeOutCubic'
  });

  // Particle burst
  createParticleBurst();

  timeline
    .add({
      targets: '.mom-photo-container',
      opacity: [0, 1],
      scale: [0.5, 1],
      rotate: [-10, 0],
      duration: 1200
    })
    .add({
      targets: '.final-heading',
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 1500,
      offset: '-=800'
    })
    .add({
      targets: '.final-subtext',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      offset: '-=1000'
    })
    .add({
      targets: '.signature',
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 1000,
      offset: '-=800'
    });

  // Soft glow pulse loop for final message
  anime({
    targets: '.final-heading',
    textShadow: [
      '0 2px 10px rgba(212, 175, 55, 0.2)',
      '0 2px 20px rgba(212, 175, 55, 0.5)'
    ],
    duration: 2000,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });
}

function createParticleBurst() {
  const container = document.querySelector('.container') as HTMLElement;
  const colors = ['#D4AF37', '#F8BBD0', '#FFF'];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('floating-element');

    const size = Math.random() * 8 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.left = '50%';
    particle.style.top = '50%';

    container.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 200 + 50;

    anime({
      targets: particle,
      translateX: Math.cos(angle) * radius,
      translateY: Math.sin(angle) * radius,
      opacity: [1, 0],
      scale: [1, 0],
      duration: Math.random() * 1500 + 1000,
      easing: 'easeOutExpo',
      complete: () => particle.remove()
    });
  }
}
