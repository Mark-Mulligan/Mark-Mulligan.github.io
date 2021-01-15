init();

function init() {
    console.log('init ran');
    if (document.querySelector('.hero-section')) {
        animatedTitle();
    } else if (document.querySelector('.projects-section')) {
        runProjectJavascript();
    } else if (document.querySelector('.contact-section')) {
        handleContactMessage();
    } else if (document.querySelector('.skills-section')) {
        skillPageAnimation();
    }
}

function handleContactMessage() {
    console.log('contact form code ran');
    var form = document.getElementById('contact-form');
    var button = document.getElementById('submit-btn');
    var status = document.querySelector('.status');

    function success() {
        form.reset();
        button.classList.add('hidden');
        status.innerHTML = 'Thanks!';
        document.querySelector('.status').classList.add('border-bottom');
    }

    function error() {
        status.innerHTML = 'Oops! There was a problem.';
        document.querySelector('.status').classList.add('border-bottom');
    }

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });

    function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                success(xhr.response, xhr.responseType);
            } else {
                error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
    }
}


function animatedTitle() {
    console.log('animated title ran');
    var textWrapper = document.querySelector('.ml1 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    //Variables for normal line animation on title page
    let num1 = -.625;
    let num2 = 0.625;
    let num3 = 2;

    //Vaiables for modified line animation on smaller page
    if ($(window).width() < 391) {
        num1 = -1;
        num2 = 1;
        num3 = 2.2
    }

    function lineAnimation(i) {
        return (num1 + num2 * num3 * i) + 'em';
    }


    anime.timeline().add({
        targets: '.ml5 .line',
        opacity: [0.5, 1],
        scaleX: [0, 1],
        easing: "easeInOutExpo",
        duration: 700
    }).add({
        targets: '.ml5 .line',
        duration: 800,
        easing: "easeOutExpo",
        translateY: (el, i) => lineAnimation(i),
    }).add({
        targets: '.ml5',
        opacity: [0, 1],
        scaleY: [0.5, 1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=600'
    }).add({
        targets: '.ml5 .letters-left',
        opacity: [0, 1],
        translateX: ["0.5em", 0],
        easing: "easeOutExpo",
        duration: 1200,
        offset: '-=300'
    }).add({
        targets: '.ml5 .letters-right',
        opacity: [0, 1],
        translateX: ["-0.5em", 0],
        easing: "easeOutExpo",
        duration: 1200,
        offset: '-=600'
    }).add({
        targets: '.ml1 .letter',
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=800',
        delay: (el, i) => 70 * (i + 1)
    }).add({
        targets: '.ml1 .line',
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
        offset: '-=875',
        delay: (el, i, l) => 80 * (l - i)
    }).add({
        targets: '.line',
        opacity: 0,
        duration: 800,
        easing: "easeOutExpo",
        delay: 500
    }).add({
        targets: '.contact-links-container',
        opacity: [0, 1],
        duration: 1000,
        easing: "linear",
    });
}

function skillPageAnimation() {
    console.log('skill animation');

    anime.timeline().add({
        targets: '.fade-in-effect',
        opacity: [0, 1],
        translateX: [-125, 0],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(90, {
            start: 1000
        })
    })
}

function runProjectJavascript() {
    console.log('project js ran');
    let projectInfo = [{
            title: 'Ultimate List App',
            overview: 'This is a full stack web app that allows the user to create an account, create lists, update them and delete them.  It is built on an express server, uses mongoDB to store data, and features passport for authentication.',
            liveLink: 'https://ultimatelistapp.herokuapp.com/',
            githubLink: 'https://github.com/MarkMulligan97/ultimateListApp'
        },
        {
            title: 'React Hangman App',
            overview: 'This application is built with React on top of an Express.js server.  It is my take on the traditional hangman game. The words for the game are generated randomly through a third party API. The app utilizes many different elements of React such as hooks, state, and conditional rendering.',
            liveLink: 'https://hangman-react-app.herokuapp.com/',
            githubLink: 'https://github.com/MarkMulligan97/react-hangman-app'
        },
        {
            title: 'Percussion Scale Website',
            overview: 'This is a custom program I built for my percussion students. Because of Covid, many of my students were at home. A lot of them did not have access to mallet percussion instruments, so I built this website to help them practice their scales.',
            liveLink: 'https://markmulligan97.github.io/percussionScaleWebsite',
            githubLink: 'https://github.com/MarkMulligan97/percussionScaleWebsite'
        },
        {
            title: 'Corana Survival Guide',
            overview: 'This web application was part of a group project that I did at the SMU coding bootcamp.  The application asks the user a series of questions.  Then, based on the results, the program uses two APIs to generate a random movie and recipe for the user.  The concept was to design a program to help with the monotony of quarantine and being stuck inside.',
            liveLink: 'https://mpapamichalis.github.io/Corona-Survival',
            githubLink: 'https://github.com/mpapamichalis/Corona-Survival'
        },

    ]

    let currentProject = 0;

    $('.carousel-control-prev').click(function () {
        currentProject = $('.carousel-item.active').attr('data-project-num');
        if (currentProject != 0) currentProject--;
        else currentProject = 3;
        setTimeout(function () {
            udpateProjectInfo(projectInfo);
        }, 460)
    })

    $('.carousel-control-next').click(function () {
        currentProject = $('.carousel-item.active').attr('data-project-num');
        if (currentProject != 3) currentProject++;
        else currentProject = 0;
        setTimeout(function () {
            udpateProjectInfo(projectInfo);
        }, 460)
    })

    function udpateProjectInfo(object) {
        $('.project-title').text(object[currentProject].title);
        $('.overview-text').text(object[currentProject].overview);
        $('.live-link').attr('href', object[currentProject].liveLink);
        $('.github-link').attr('href', object[currentProject].githubLink);
    }
}