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
            imggif.setAttribute('data', img.title) // data titulo
            imggif.setAttribute('data2', img.username)
            imggif.setAttribute('data3', img.id) // data username
            imggif.setAttribute('src', urlGif)
            imggif.classList.add('giftrending')
            gif.appendChild(imggif);
            let corazon = document.createElement('img')
            let descarga = document.createElement('img')
            let max = document.createElement('img')
            let user = document.createElement('p')
            let name = document.createElement('h3')
            let cajaUserName = document.createElement('div')
            user.innerHTML = imggif.getAttribute('data2')
            name.innerHTML = imggif.getAttribute('data')
            cajaUserName.appendChild(user)
            cajaUserName.appendChild(name)
            gif.appendChild(cajaUserName)
            let padreinconos = document.createElement('div')
            gif.appendChild(padreinconos)
            padreinconos.classList.add('padreIconos')

            //mouseover de los gifs

            gif.addEventListener('mouseover', () => {
                gif.style.backgroundColor = '#572EE5'
                imggif.style.opacity = '0.5'
                padreinconos.appendChild(corazon);
                padreinconos.appendChild(descarga)
                padreinconos.appendChild(max)
                cajaUserName.classList.add('padreUserName')
                descarga.style.display = 'block'
                descarga.classList.add('iconDownload')
                corazon.style.display = 'block'
                corazon.classList.add('iconfav')
                max.style.display = 'block'
                max.classList.add('iconMax')

            }, false)

            max.addEventListener('mouseover', function () {
                max.classList.toggle('iconMax-hover');
                max.classList.toggle('iconMax');
            })

            max.addEventListener('mouseout', function () {
                max.classList.toggle('iconMax');
                max.classList.toggle('iconMax-hover');
            })

            max.addEventListener('click', function () {
                console.log(imggif)
                let srcdelgif = imggif.src
                let userdelgif = imggif.getAttribute('data2')
                let namedelgif = imggif.getAttribute('data')
                ventana(srcdelgif, userdelgif, namedelgif)
            })


            descarga.addEventListener('mouseover', function () {
                descarga.classList.toggle('iconDownload-hover');
                descarga.classList.toggle('iconDownload');
            })
            descarga.addEventListener('mouseout', function () {
                descarga.classList.toggle('iconDownload');
                descarga.classList.toggle('iconDownload-hover');
            })
            descarga.addEventListener('click', () => {
                return descargarMiGifo(imggif)
            }, false)

            corazon.addEventListener('mouseover', function () {
                corazon.classList.toggle('iconfav-hover');
                corazon.classList.toggle('iconfav');
            })
            corazon.addEventListener('mouseout', function () {
                corazon.classList.toggle('iconfav');
                corazon.classList.toggle('iconfav-hover');
            })
            corazon.addEventListener('click', function favgifs(event) {
                event.target.classList.toggle('iconfavActive');
                event.target.classList.toggle('iconfav');
                //let urlGifFav = imggif.getAttribute('src')
                let idGifFav = imggif.getAttribute('data3')
                gifsfav.push(idGifFav)
                console.log(gifsfav)
                sessionStorage.setItem('gifsFav', gifsfav)
            })
            imggif.addEventListener('mouseout', () => {
                gif.style.backgroundColor = 'transparent'
                imggif.style.opacity = '1'
                corazon.style.display = 'none'
                descarga.style.display = 'none'
                max.style.display = 'none'
                cajaUserName.classList.remove('padreUserName')
            })

            var mediaqueryList = window.matchMedia("(min-width: 500px)");
            if(mediaqueryList.matches) {
               
                imggif.addEventListener('click', function () {
                    console.log(imggif)
                    let srcdelgif = imggif.src
                    let userdelgif = imggif.getAttribute('data2')
                    let namedelgif = imggif.getAttribute('data')
                    ventana(srcdelgif, userdelgif, namedelgif)
                })
              }

        }

    });



function ventana(imggif, user, name) {
    let gifmaxhtml = document.getElementById('gifMax')
    gifmaxhtml.classList.add('gifmax')
    gifmaxhtml.classList.remove('none')
    let body = document.querySelectorAll('body')[0]
    body.classList.add('overflow')
    let cuadrogif = document.getElementById('gif-en-max')
    cuadrogif.setAttribute('src', imggif)
    let userhtml = document.getElementById('User')
    userhtml.innerHTML = user
    let namehtml = document.getElementById('titulo-en-max')
    namehtml.innerHTML = name
}



(function () {
    CarruselTrending();
})();

//funcion de descarga
async function descargarMiGifo(imggif) {

    let a = document.createElement('a');
    let response = await fetch(imggif.src);
    let file = await response.blob();
    a.download = imggif.getAttribute('data');
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
};
// carrusel de gifs
function CarruselTrending() {
    let productList = document.getElementById('gifs');
    let productListSteps = 0;
    let products = document.getElementsByClassName('product');
    let productAmount = products.length;
    let productAmountVisible = 3;
    let pagex = 0;

    btn_adelante.onclick = function () {
        if (productListSteps > productAmount - productAmountVisible) {
            productListSteps++;
            moveProductList(-25.8 * 3);
        }
    }

    btn_atras.onclick = function () {
        if (productListSteps > 0) {
            productListSteps--;
            moveProductList(-25.8 * 3);
        }
    }

    function moveProductList(valorvw) {
        console.log(valorvw * productListSteps)
        productList.style.transform = `translateX(${valorvw* productListSteps}vw)`;
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
    window.location.href = "index.html"
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

if (search.value === '') {
    // cerrarLista();
}
// ------------------------busqueda de gifs con enter

search.addEventListener('keydown', event => {
    if (event.keyCode == 13) {
        lineaGris.style.display = 'inline-block'
        btnVerMas.style.display = 'flex'
        cerrarLista()
        searchFunction(offset)
            .then(imagen => {
                console.log(imagen);
                let cuadros = document.getElementById('cuadros')
                let gif;
                cuadros.innerHTML = ''
                console.log(cuadros.childNodes)

                for (img of imagen) {
                    gif = document.createElement('div');
                    gif.setAttribute('class', 'cuadro')
                    cuadros.appendChild(gif)
                    cuadros.style.paddingBottom = '15vh '
                    let imggif = document.createElement('img');
                    imggif.setAttribute('src', img.images.original.url)
                    gif.appendChild(imggif);
                    imggif.style.paddingBottom = '2vh'
                    imggif.setAttribute('data', img.title) // data titulo
                    imggif.setAttribute('data2', img.username) // data username
                    imggif.setAttribute('data3', img.id) // data username
                   
                    imggif.classList.add('gif')
                    gif.appendChild(imggif);
                    let corazon = document.createElement('img')
                    let descarga = document.createElement('img')
                    let max = document.createElement('img')
                    let user = document.createElement('p')
                    let name = document.createElement('h3')
                    let cajaUserName = document.createElement('div')
                    user.innerHTML = imggif.getAttribute('data2')
                    name.innerHTML = imggif.getAttribute('data')
                    cajaUserName.appendChild(user)
                    cajaUserName.appendChild(name)
                    cajaUserName.classList.add('display-none')
                    gif.appendChild(cajaUserName)
                    let padreinconos = document.createElement('div')
                    gif.appendChild(padreinconos)
                    padreinconos.classList.add('padreIconos')
                    padreinconos.classList.add('padding-left')

                    //mouseover de los gifs

                    gif.addEventListener('mouseover', () => {
                        gif.style.backgroundColor = '#572EE5'

                        imggif.style.opacity = '0.5'
                        padreinconos.appendChild(corazon);
                        padreinconos.appendChild(descarga)
                        padreinconos.appendChild(max)
                        cajaUserName.classList.add('padreUserNameb')
                        cajaUserName.classList.remove('display-none')
                        descarga.style.display = 'block'
                        descarga.classList.add('iconDownload')
                        corazon.style.display = 'block'
                        corazon.classList.add('iconfav')
                        max.style.display = 'block'
                        max.classList.add('iconMax')

                    }, false)

                    max.addEventListener('mouseover', function () {
                        max.classList.toggle('iconMax-hover');
                        max.classList.toggle('iconMax');
                    })

                    max.addEventListener('mouseout', function () {
                        max.classList.toggle('iconMax');
                        max.classList.toggle('iconMax-hover');
                    })

                    max.addEventListener('click', function () {
                        console.log(imggif)
                        let srcdelgif = imggif.src
                        let userdelgif = imggif.getAttribute('data2')
                        let namedelgif = imggif.getAttribute('data')
                        ventana(srcdelgif, userdelgif, namedelgif)
                    })


                    descarga.addEventListener('mouseover', function () {
                        descarga.classList.toggle('iconDownload-hover');
                        descarga.classList.toggle('iconDownload');
                    })
                    descarga.addEventListener('mouseout', function () {
                        descarga.classList.toggle('iconDownload');
                        descarga.classList.toggle('iconDownload-hover');
                    })
                    descarga.addEventListener('click', () => {
                        return descargarMiGifo(imggif)
                    }, false)

                    corazon.addEventListener('mouseover', function () {
                        corazon.classList.toggle('iconfav-hover');
                        corazon.classList.toggle('iconfav');
                    })
                    corazon.addEventListener('mouseout', function () {
                        corazon.classList.toggle('iconfav');
                        corazon.classList.toggle('iconfav-hover');
                    })
                    corazon.addEventListener('click', function favgifs(event) {
                        event.target.classList.toggle('iconfavActive');
                        event.target.classList.toggle('iconfav');
                        //let urlGifFav = imggif.getAttribute('src')
                        let idGifFav = imggif.getAttribute('data3')
                        gifsfav.push(idGifFav)
                        console.log(gifsfav)
                        sessionStorage.setItem('gifsFav', gifsfav)
                    })

                    imggif.addEventListener('mouseout', () => {
                        gif.style.backgroundColor = 'transparent'
                        imggif.style.opacity = '1'
                        corazon.style.display = 'none'
                        descarga.style.display = 'none'
                        max.style.display = 'none'
                        cajaUserName.classList.remove('padreUserNameb')
                        cajaUserName.classList.add('display-none')
                    })

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
    divlist.setAttribute('class', 'lista-autocompletar-items')

    papa.appendChild(divlist)

    if (!encontrados){
        return false
        cerrarLista()
    };

    divlist.innerHTML = ''
    encontrados.forEach(item => {
        let elementoslista = document.createElement('div')
        elementoslista.innerHTML = `<strong>${item.name}</strong>`
        elementoslista.addEventListener('click', function () {
            cerrarLista()

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



function cerrarLista() {
    const items = document.querySelectorAll('.lista-autocompletar-items')
    console.log(items.length)
    divlist.classList.remove('lista-autocompletar-items')
    items[0].innerHTML = ''
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