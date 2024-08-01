document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://sahoryceciliano.github.io/prueba5/imagenes.json';
    const gallery = document.getElementById('gallery');

    function loadImages() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la carga del JSON');
                }
                return response.json();
            })
            .then(data => {
                const images = data.imagenes;
                let htmlContent = '';

                images.forEach(image => {
                    htmlContent += `
                        <div class="col-6 col-md-4 col-lg-3 mb-4">
                            <img src="${image.src}" alt="${image.alt}" class="gallery-img" onclick="openLightbox('${image.src}')">
                        </div>
                    `;
                });

                gallery.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                gallery.innerHTML = '<p>Error al cargar las imágenes. Por favor, inténtalo de nuevo más tarde.</p>';
            });
    }

    window.openLightbox = function(src) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightbox.style.display = 'block';
        lightboxImg.src = src;
    }

    const closeBtn = document.getElementById('close');
    closeBtn.onclick = function() {
        document.getElementById('lightbox').style.display = 'none';
    }

    loadImages();
});

document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const images = document.querySelectorAll('.galeria img, .galeria1 img');

    images.forEach(img => {
        img.addEventListener('click', function () {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
        });
    });

    lightbox.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const birthdateInput = document.getElementById('birthdate');
    const ageInput = document.getElementById('age');

    birthdateInput.addEventListener('change', () => {
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDifference = today.getMonth() - birthdate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        ageInput.value = age;
    });

    form.addEventListener('submit', (event) => {
        if (!birthdateInput.value) {
            alert('Por favor, ingrese su fecha de nacimiento.');
            event.preventDefault();
        }
    });
});