const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const lightboxContainer = document.getElementsByClassName('js-lightbox')[0];
const lightBoxImage  = document.getElementsByClassName('lightbox__image')[0];
const lightBoxOverlay = document.getElementsByClassName('lightbox__overlay')[0];
const galleryContainer = document.getElementById('gallery');  

function closeLightBox() {
  lightBoxImage.setAttribute('src', null);
  lightboxContainer.classList.remove('is-open');
}

function handleImageClick(event) {
  const galleryImage = event.target.closest('.gallery__image')
  if (galleryImage) { 
    event.preventDefault(); 
    const dataSource = galleryImage.getAttribute('data-source');

    lightBoxImage.setAttribute('src', dataSource);
    lightboxContainer.classList.add('is-open');
  }
}

function handleLightBoxClose(event) {
  const closeTrigger = event.target.closest('.lightbox__button') || event.target.closest('.lightbox__overlay');
  if (closeTrigger) {
    event.preventDefault();
    closeLightBox();
  }
}

function handleKeyUp(event) {
  if (event.keyCode === 27) {
    // Esc key
    return closeLightBox();
  }

  if ([39, 37].includes(event.keyCode)) {
    const currentSrc = lightBoxImage.getAttribute('src');
    if (currentSrc) {
      const currentIndex = galleryItems.findIndex((item) => item.original === currentSrc);
      let nextIndex = null;
      if (currentIndex !== -1) {
        // Right key
        if (event.keyCode === 39) nextIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
        // Left key
        if (event.keyCode === 37) nextIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
        
        if (nextIndex !== null) return lightBoxImage.setAttribute('src', galleryItems[nextIndex].original);  
      }
    }
  }
}

for (let i = 0; i < galleryItems.length; i++) {
  document.getElementById('gallery').innerHTML += "<li class='gallery__item'><a class='gallery__link' href='" + galleryItems[i].original + "'><img class='gallery__image' src='" + galleryItems[i].preview + "' data-source='" + galleryItems[i].original + "' alt='" + galleryItems[i].description + "' /></a></li>"
}

galleryContainer.addEventListener("click", handleImageClick);
document.addEventListener("click", handleLightBoxClose);
document.addEventListener('keyup', handleKeyUp)
