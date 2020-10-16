const apiKey = 'shVzMzUpK3VAtRIltCGAYhTlEuTd81fF';
let gifs = document.getElementById('gifs');
let btn_adelante = document.getElementById('flecha-Derecha');
let btn_atras = document.getElementById('flecha-Izquierda');
let btn_modo_nocturno = document.getElementById('modoNocturno');
let modoNocturnoH5 = document.getElementById('modo-nocturno')
let body = document.getElementsByTagName('body')
let logo = document.getElementById('logo')
let titulo = document.getElementById('titulo')
let input = document.getElementById('search')
let trending = document.getElementById('trendingT');
let trendingp = document.getElementById('trendingp')
let trendingGif = document.getElementById('trendinggif')
let lista = document.querySelectorAll("li");
let iconsearch = document.getElementById('iconSearch')
let gifh2 = document.getElementById('gifh2')
let gifp = document.getElementById('gifp')
let compartir = document.getElementById('compartir');
let copyright = document.getElementById('copyright');
let elementoslista = document.querySelectorAll('.menu');
// aparicion de los gifs
async function Trendings() {
    let url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey;
    let response = await fetch(url);
    let json = await response.json();
    let gifs = json.data;
    return gifs;
}



Trendings()
    .then(imagen => {
        console.log(imagen);
        for (img of imagen) {
            let gif = document.createElement('div');
            gif.setAttribute('id', gif)
            gif.classList.add('product')
            gifs.appendChild(gif);
            let imggif = document.createElement('img');
            imggif.setAttribute('src', img.images.original.url)
            imggif.style.width = '25vw';
            imggif.style.height = '35vh';
            gif.appendChild(imggif);
            let corazon = document.createElement('img')

            //mouseover 
            // carrusel de gifs
            gif.addEventListener('mouseover', () => {

                gif.style.backgroundColor = '#572EE5'
                imggif.style.opacity = '0.5'
                gif.appendChild(corazon);
                corazon.classList.add('corazon')
                corazon.style.display = 'block'
                corazon.classList.add('iconfav')
            }, false)

            corazon.addEventListener('mouseover', function hoverfav() {
                corazon.classList.toggle('iconfav-hover');
                corazon.classList.toggle('iconfav');
            })

            corazon.addEventListener('mouseout', function unhoverfav() {
                corazon.classList.toggle('iconfav');
                corazon.classList.toggle('iconfav-hover');
            })

            corazon.addEventListener('click', function favgifs(event) {
                event.target.classList.toggle('iconfavActive');
                event.target.classList.toggle('iconfav');
            })

            /*function enviarFavStorage(corazon){
                if(corazon.classList === 'iconfavactive'){
                    sessionStorage.setItem
                }
            }*/ 

            imggif.addEventListener('mouseout', () => {
                gif.style.backgroundColor = 'transparent'
                imggif.style.opacity = '1'
                corazon.style.display = 'none'
            })
        }
    });



(function () {
    CarruselTrending();
})();



function CarruselTrending() {
    let productList = document.getElementById('gifs');
    let productListSteps = 0;
    let products = document.getElementsByClassName('product');
    let productAmount = products.length;
    let productAmountVisible = 3;
    console.log(btn_adelante)

    btn_adelante.onclick = function () {
        if (productListSteps > productAmount - productAmountVisible) {
            productListSteps++;
            moveProductList();
        }
    }

    btn_atras.onclick = function () {
        if (productListSteps > 0) {
            productListSteps--;
            moveProductList();
        }
    }

    function moveProductList() {
        productList.style.transform = `translateX(${(-25.8*3)* productListSteps}vw)`;
    }
}

//flechas carrusel
let flechaD = document.getElementById('flecha-D')
let flechaI = document.getElementById('flecha-I')

btn_adelante.addEventListener('mouseover', () => {
    flechaD.setAttribute('src', 'imagenes/button-slider-right-hover.svg')
});

btn_adelante.addEventListener('mouseout', () => {
    flechaD.setAttribute('src', 'imagenes/button-slider-right.svg')
});

btn_atras.addEventListener('mouseover', () => {
    flechaI.setAttribute('src', 'imagenes/button-slider-left-hover.svg')
});

btn_atras.addEventListener('mouseout', () => {
    flechaI.setAttribute('src', 'imagenes/button-slider-left.svg')
});


// modo nocturno

let dark = false;

lista[0].onclick = () => {
    dark = !dark
    modoNocturno()
}

console.log(elementoslista)

function modoNocturno() {

    if (dark == true) {
        body[0].style.backgroundColor = '#37383C'
        elementoslista.forEach(elementos => elementos.style.color = 'white');
        modoNocturnoH5.innerHTML = 'MODO DIURNO';
        lista.forEach(elementos => elementos.style.paddingLeft = '1.5vw');
        logo.setAttribute('src', 'imagenes/Logo-modo-noc.svg');
        titulo.style.color = 'white';
        input.style.backgroundColor = '#37383C';
        iconsearch.setAttribute('src', 'imagenes/icon-search-modo-noct.svg');
        input.style.color = 'white';
        input.style.borderColor = 'white';
        trendingp.style.color = 'white';
        trending.style.color = 'white';
        trendingGif.style.background = '#222326';
        gifh2.style.color = 'white'
        gifp.style.color = 'white'
        compartir.style.color = 'white'
        copyright.style.color = ' white'
        flechaD.setAttribute('src', 'imagenes/button-slider-right-md-noct.svg')
        flechaI.setAttribute('src', 'imagenes/button-slider-left-md-noct.svg')
        btn_adelante.addEventListener('mouseout', () => {
            flechaD.setAttribute('src', 'imagenes/button-slider-right-md-noct.svg')
        });
        btn_atras.addEventListener('mouseout', () => {
            flechaI.setAttribute('src', 'imagenes/button-slider-left-md-noct.svg')
        });
        return
    }

    body[0].style.backgroundColor = 'white'
    elementoslista.forEach(elementos => elementos.style.color = '#572EE5')
    modoNocturnoH5.innerHTML = 'MODO NOCTURNO';
    lista.forEach(elementos => elementos.style.paddingLeft = '0vw');
    logo.setAttribute('src', 'imagenes/Logo-desktop.svg');
    titulo.style.color = '#572EE5';
    input.style.backgroundColor = 'white';
    iconsearch.setAttribute('src', 'imagenes/icon-search.svg');
    input.style.color = 'black';
    trendingp.style.color = '#572EE5';
    trending.style.color = '#572EE5';
    trendingGif.style.background = '#F3F5F8';
    gifh2.style.color = '#572EE5'
    gifp.style.color = 'black'
    compartir.style.color = 'black'
    copyright.style.color = 'black'
    flechaD.setAttribute('src', 'imagenes/button-slider-right.svg')
    flechaI.setAttribute('src', 'imagenes/button-slider-left.svg')
    btn_adelante.addEventListener('mouseout', () => {
        flechaD.setAttribute('src', 'imagenes/button-slider-right.svg')
    });
    btn_atras.addEventListener('mouseout', () => {
        flechaI.setAttribute('src', 'imagenes/button-slider-left.svg')
    });

}

// busquedad de gifs


let offset = 12;

let lineaGris = document.getElementById('lineaGris');
let icon_search = document.getElementById('iconSearch');
let nombreBuscado = document.getElementById('nombreBuscado');
async function searchFunction(offset) {
    let search = document.getElementById('search').value;
    nombreBuscado.innerHTML = search
    console.log(search)
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search + '&limit=12' + '&offset=' + offset;
    let response = await fetch(url);
    let json = await response.json();
    let gifs = json.data;
    return gifs;
}

let btnVerMas = document.getElementById('btnVermas')


icon_search.onclick = () => {
    lineaGris.style.display = 'inline-block'
    btnVerMas.style.display = 'flex'
    searchFunction(offset)
        .then(imagen => {
            console.log(imagen);
            let cuadros = document.getElementById('cuadros')
            let gif;
            for (img of imagen) {
                gif = document.createElement('figure');
                gif.setAttribute('class', 'cuadro')
                cuadros.appendChild(gif)
                cuadros.style.paddingBottom = '15vh '
                let imggif = document.createElement('img');
                imggif.setAttribute('src', img.images.original.url)
                gif.appendChild(imggif);
                imggif.style.height = '20vh';
                imggif.style.width = '20vw'
            }
        })
}


btnVerMas.onclick = () => {
    offset = offset + 12;
    console.log(offset);
    searchFunction(offset)
        .then(imagen => {
            console.log(imagen);
            let cuadros = document.getElementById('cuadros')
            let gif;
            for (img of imagen) {
                gif = document.createElement('div');
                gif.setAttribute('class', 'cuadro')
                cuadros.appendChild(gif)
                cuadros.style.paddingBottom = '15vh '
                let imggif = document.createElement('img');
                imggif.setAttribute('src', img.images.original.url)
                gif.appendChild(imggif);
                imggif.style.height = '20vh';
                imggif.style.width = '20vw'
            }
        })
}

search.addEventListener('focus', function cuadroSugerencias(){
    
})


async function busquedad() {
    let url = `api.giphy.com/v1/tags?api_key=${apiKey}&q=${search.value}&limit=3`;
    let primero = await fetch(url);
    let segundo = await primero.json();
    let sugerencias = segundo.data

}