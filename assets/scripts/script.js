document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

window.onload = function () {
  lax.init()

  lax.addDriver('scrollY', function () {
    return window.scrollY
  })

  lax.addElements('.fade-in-out-effect', {
    scrollY: {
      opacity: [
        ['elInY', 'elCenterY', 'elOutY'],
        [0, 1, 0],
      ],
      translateY: [
        ['elInY', 'elCenterY', 'elOutY'],
        {
          500: [0, 0, 0], // Screen width < 500
          900: [-150, 0, 150], // Screen width > 500 and < 900
        },
      ]
    }
  })

  lax.addElements('.fade-out-effect', {
    scrollY: {
      opacity: [
        ['elInY', 'elCenterY', 'elOutY'],
        [1, 1, 0],
      ],
      translateY: [
        ['elInY', 'elCenterY', 'elOutY'],
        {
          500: [0, 0, 100], // Screen width < 500
          900: [0, 0, 200], // Screen width > 500 and < 900
        },
      ]
    }
  })
}