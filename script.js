const apiKey = 'shVzMzUpK3VAtRIltCGAYhTlEuTd81fF';
let gifs = document.getElementById('gifs');
let btn_adelante = document.getElementById('flecha-Derecha');
let btn_atras = document.getElementById('flecha-Izquierda');
let btn_modo_nocturno = document.getElementById('modoNocturno');
let modoNocturnoH5 = document.getElementById('modo-nocturno')
let body = document.getElementsByTagName('body')
let logo = document.getElementById('logo')
let titulo = document.getElementById('titulo')
let iconsearch = document.getElementById('iconSearch')
let trending = document.getElementById('trendingT');
let trendingp = document.getElementById('trendingp')
let trendingGif = document.getElementById('trendinggif')
let lista = document.querySelectorAll("li");
let input = document.getElementById('search')
let gifh2 = document.getElementById('gifh2')
let gifp = document.getElementById('gifp')
let compartir = document.getElementById('compartir');
let copyright = document.getElementById('copyright');
let elementoslista = document.querySelectorAll('.menu');
let favoritos = [] //array de favoritos



let dark = false;







// aparicion de los gifs
async function Trendings() {
    let url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey;
    let response = await fetch(url);
    let json = await response.json();
    let gifs = json.data;
    return gifs;
}

let gifsfav = []
Trendings()
    .then(imagen => {
        console.log(imagen);
        for (img of imagen) {
            let gif = document.createElement('div');
            gif.setAttribute('id', gif)
            gif.classList.add('product')
            gifs.appendChild(gif);
            let imggif = document.createElement('img');
            let urlGif = img.images.original.url
            imggif.setAttribute('data', img )
            imggif.setAttribute('src', urlGif)
            imggif.classList.add('gif')
            gif.appendChild(imggif);
            let corazon = document.createElement('img')
            let descarga = document.createElement('img')
            let max = document.createElement('img')

            //mouseover 
            // carrusel de gifs
            gif.addEventListener('mouseover', () => {
                gif.style.backgroundColor = '#572EE5'
                imggif.style.opacity = '0.5'
                gif.appendChild(corazon);
                gif.appendChild(descarga)
                gif.appendChild(max)
                descarga.style.display= 'block'
                descarga.classList.add('iconDownload')
                corazon.style.display = 'block'
                corazon.classList.add('iconfav')
                max.style.display = 'block'
                max.classList.add('iconMax')
            }, false)

            max.addEventListener('mouseover', function() {
                max.classList.toggle('iconMax-hover');
                max.classList.toggle('iconMax');
            })
            
            max.addEventListener('mouseout', function() {
                max.classList.toggle('iconMax');
                max.classList.toggle('iconMax-hover');
            })

            max.addEventListener('click', function(){
                console.log(img)
            })

            descarga.addEventListener('mouseover', function() {
                descarga.classList.toggle('iconDownload-hover');
                descarga.classList.toggle('iconDownload');
            })
            
            descarga.addEventListener('mouseout', function() {
                descarga.classList.toggle('iconDownload');
                descarga.classList.toggle('iconDownload-hover');
            })

            descarga.addEventListener('click', () =>{
                return descargarMiGifo(imggif)
            }, false)

            corazon.addEventListener('mouseover', function() {
                corazon.classList.toggle('iconfav-hover');
                corazon.classList.toggle('iconfav');
            })


            corazon.addEventListener('mouseout', function() {
                corazon.classList.toggle('iconfav');
                corazon.classList.toggle('iconfav-hover');
            })

    
            corazon.addEventListener('click', function favgifs(event) {
                event.target.classList.toggle('iconfavActive');
                event.target.classList.toggle('iconfav');
                let urlGifFav = imggif.getAttribute('src')
                gifsfav.push(urlGifFav)
                console.log(gifsfav)
                //sessionStorage.setItem('gif', imggif.getAttribute('src'))
                /*
                if(corazon.classList == 'iconfavActive'){
                    favoritos.push(imggif)
                    console.log(favoritos)
                }*/
                sessionStorage.setItem('gifsFav', gifsfav)
            })



            imggif.addEventListener('mouseout', () => {
                gif.style.backgroundColor = 'transparent'
                imggif.style.opacity = '1'
                corazon.style.display = 'none'
                descarga.style.display='none'
                max.style.display='none'
            })
        }
    });



(function () {
    CarruselTrending();
})();

async function descargarMiGifo(imggif) {

    let a = document.createElement('a');
    let response = await fetch(imggif.src);
    let file = await response.blob();
    a.download = 'MiNuevoGif.gif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
};





function CarruselTrending() {
    let productList = document.getElementById('gifs');
    let productListSteps = 0;
    let products = document.getElementsByClassName('product');
    let productAmount = products.length;
    let productAmountVisible = 3;


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


lista[0].onclick = () => {
    dark = !dark
    modoNocturno()
}

function modoNocturno() {

    if (dark == true) {
        body[0].style.backgroundColor = '#37383C'
        elementoslista.forEach(elementos => elementos.style.color = 'white');
        modoNocturnoH5.innerHTML = 'MODO DIURNO';
        lista.forEach(elementos => elementos.style.paddingLeft = '1.5vw');
        logo.setAttribute('src', 'imagenes/Logo-modo-noc.svg');
        titulo.style.color = 'white';
        input.style.backgroundColor = '#37383C';
        input.style.backgroundImage = 'url( ../imagenes/icon-search-modo-noct.svg)';
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
    input.style.backgroundImage = 'url( ../imagenes/icon-search.svg)'
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
let search = document.getElementById('search');
async function searchFunction(offset) {
    nombreBuscado.innerHTML = search.value

    console.log(search.value)
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search.value + '&limit=12' + '&offset=' + offset;
    let response = await fetch(url);
    let json = await response.json();
    let gifs = json.data;
    return gifs;
}

let btnVerMas = document.getElementById('btnVermas')


search.addEventListener('keydown', event => {
    if (event.keyCode == 13) {
        lineaGris.style.display = 'inline-block'
        btnVerMas.style.display = 'flex'
        searchFunction(offset)
            .then(imagen => {
                console.log(imagen);
                let cuadros = document.getElementById('cuadros')
                let gif;
                cuadros.innerHTML = ''
                console.log(cuadros.childNodes)

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
})

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

const divlist = document.createElement('div')

const crearSugerencias = (encontrados, papa) => {
    //crear la lista
    divlist.setAttribute('id', 'lista-autocompletar')
    divlist.setAttribute('class', 'lista-autocompletar-items')
    console.log(papa);
    papa.appendChild(divlist)

    if (!encontrados) return false;

    divlist.innerHTML = ''
    encontrados.forEach(item => {
        let elementoslista = document.createElement('div')
        elementoslista.innerHTML = `<strong>${item.name}</strong>`
        elementoslista.addEventListener('click', function () {
            console.log(elementoslista)
            search.value = this.innerText
            lineaGris.style.display = 'inline-block'
            btnVerMas.style.display = 'flex'
            searchFunction(offset)
                .then(imagen => {
                    console.log(imagen);
                    let cuadros = document.getElementById('cuadros')
                    let gif;
                    cuadros.innerHTML = ''
                    console.log(cuadros.childNodes)

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
        })
        divlist.appendChild(elementoslista)
    })
}

const buscarAuto = async (event) => {
    const searchValue = event.target.value
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${searchValue}&limit=3`;

    let primero = await fetch(url);
    let segundo = await primero.json();
    const encontrados = segundo.data;
    if (!searchValue) return false;

    crearSugerencias(encontrados, event.target.parentNode);
}
search.addEventListener('input', buscarAuto)


//responsive

let burguer = document.getElementById('burguer');

let btn_crear = document.getElementById('boton_crear');

var mediaqueryList = window.matchMedia("(max-width: 500px)");
let ul = document.getElementById('lista');

let li = document.querySelectorAll('li');

burguer.addEventListener('click', () => {
    ul.classList.toggle('menu-desplegado')
    elementoslista.forEach(elements => elements.classList.toggle('items-menu'))
    elementoslista.forEach(elementos => elementos.style.color = 'white');
})

if (mediaqueryList.matches) {
    logo.setAttribute('src', 'imagenes/logo-mobile.svg')
}