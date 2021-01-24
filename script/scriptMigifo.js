const apiKey = 'shVzMzUpK3VAtRIltCGAYhTlEuTd81fF';
let btn_adelante = document.getElementById('flecha-Derecha');
let btn_atras = document.getElementById('flecha-Izquierda');

let cuadros = document.getElementById('cuadros')
let noGifs = document.getElementById('gifoSinContenido')
let storage = sessionStorage.getItem('MisGifos')
let src = []; 

(() =>{
    if(storage === null){
        return;
    }else{
        src = storage.split(',', 100)
    }
})()
 
if(src.length > 0){
    noGifs.classList.add('display-none')
}

function agregargifo(){
    src.forEach(url => {
        let cuadro = document.createElement('img')
        cuadro.setAttribute('src', url)
        cuadro.classList.add('cuadro')
        cuadros.appendChild(cuadro)
    }) 
}
agregargifo();



//trending
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
            imggif.setAttribute('data2', img.username) // data username
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
                let urlGifFav = imggif.getAttribute('src')
                gifsfav.push(urlGifFav)
                console.log(gifsfav)
                sessionStorage.setItem('gifsFav', gifsfav)
                window.location.href = "favoritos.html"
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