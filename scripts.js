const basePath = window.location.pathname.includes('/projets/') ? '../Images/logo/' : 'Images/logo/';

const images = [
  basePath + 'NOAR1.png',
  basePath + 'NOAR2.png',
  basePath + 'NOAR3.png'
];


// Fonction pour choisir une image aléatoire différente de la précédente
function selectRandomImage() {
  const lastImage = localStorage.getItem('lastImage');
  let selectedImage;
  do {
    const randomIndex = Math.floor(Math.random() * images.length);
    selectedImage = images[randomIndex];
  } while (selectedImage === lastImage);

  document.getElementById('random-image').src = selectedImage;
  localStorage.setItem('lastImage', selectedImage);
}

// Fonction pour le scroll en douceur
function smoothScrollToTop() {
  const scrollDuration = 300;
  const scrollStep = -window.scrollY / (scrollDuration / 15);
  function scroll() {
    if (window.scrollY > 0) {
      window.scrollBy(0, scrollStep);
      requestAnimationFrame(scroll);
    }
  }
  requestAnimationFrame(scroll);
}

// Fonction pour gérer le survol des images et changer en GIF ou autre image
function attachHoverEffect(imgElement, hoverSrc) {
  imgElement.dataset.originalSrc = imgElement.src; // Sauvegarde l'image originale

  imgElement.addEventListener("mouseenter", function () {
    // Ajout d'un timestamp pour forcer le rechargement du GIF depuis le début
    imgElement.src = hoverSrc + "?t=" + new Date().getTime();  // Change l'image en GIF et ajoute un timestamp unique
  });

  imgElement.addEventListener("mouseleave", function () {
    imgElement.src = imgElement.dataset.originalSrc;  // Remet l'image originale
  });
}


document.addEventListener("DOMContentLoaded", function () {
  // Sélection de l'image aléatoire pour le logo
  selectRandomImage();

  // Scroll vers le haut
  document.getElementById('scroll-to-top').addEventListener('click', function (e) {
    e.preventDefault();
    smoothScrollToTop();
  });

  // Gestion des images de projet avec les survols
  const projectImages = [
    { selector: 'img[src="Images/Milieu/couv.jpg"]', hoverSrc: "Images/Milieu/2emecouv.jpg" },  // Projet 2
    { selector: 'img[src="Images/Fantasmagorie/couv.jpg"]', hoverSrc: "Vidéos/couv.gif" },      // Projet 3
    { selector: 'img[src="Images/Epuisement/front.jpg"]', hoverSrc: "Vidéos/front.gif" },       // Projet 4
    { selector: 'img[src="Images/Eau/carte postale.jpg"]', hoverSrc: "Vidéos/eau.gif" },        // Projet 5
    { selector: 'img[src="Images/Sample/couv.jpg"]', hoverSrc: "Vidéos/Anim-sample.gif" }       // Projet 6
  ];

  // Appliquer l'effet de survol sur chaque projet
  projectImages.forEach(function (project) {
    const imgElement = document.querySelector(project.selector);
    if (imgElement) {
      attachHoverEffect(imgElement, project.hoverSrc);
    }
  });
});
