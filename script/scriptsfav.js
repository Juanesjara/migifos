let cuadros = document.getElementById('cuadros')
let noGifs = document.getElementById('favSinContenido')
let storage = JSON.parse(localStorage.getItem('gifsFav'))
let src = []; 
// variables del trending
const apiKey = 'shVzMzUpK3VAtRIltCGAYhTlEuTd81fF';
let btn_adelante = document.getElementById('flecha-Derecha');
let btn_atras = document.getElementById('flecha-Izquierda');
/*(() =>{
    if(storage === null){
        return;
    }else{
        src = storage.split(',', 100)
    }
})()*/
let numeros = [0,1]
let numero = 10
for(let i=2;i<numero;i++){
    numeros[i] = numeros[i-2] + numeros[i-1]
}
console.log(numeros)
 
if(storage.length > 0){
    noGifs.classList.add('display-none')
}

function agregarfav(){
    storage.forEach((element) => {
        fetch(`https://api.giphy.com/v1/gifs/${element}?api_key=${apiKey}`)
        .then((response) =>{
            return response.json();
        })
        .then((item)=>{
            console.log(item)
            let gif = document.createElement('div')
            let srcgif = item.data.images.original.url
            let cuadro = document.createElement('img');
            let corazon = document.createElement('img');
            let padreinconos = document.createElement('div')
            let descarga = document.createElement('img')
            let max = document.createElement('img')
            
            gif.classList.add('giffav')
            cuadro.setAttribute('src', srcgif);
            cuadro.classList.add('cuadro');
            cuadro.setAttribute('data', item.data.title)
            cuadro.setAttribute('data2', item.data.username)
            cuadro.setAttribute('data3', item.data.id)
            gif.appendChild(cuadro);
            cuadros.appendChild(gif)
            console.log(item);
            let user = document.createElement('p')
            let name = document.createElement('h3')
            user.innerHTML = cuadro.getAttribute('data2')
            name.innerHTML = cuadro.getAttribute('data')
            let cajaUserName = document.createElement('div')
            cajaUserName.appendChild(user)
            cajaUserName.appendChild(name)
            gif.appendChild(padreinconos)
            gif.appendChild(cajaUserName)
            cajaUserName.style.display = 'none'
            padreinconos.classList.add('padreIconosfav')

             function mouseovergif() {
                gif.style.backgroundColor = '#572EE5'
                cuadro.style.opacity = '0.5'
                padreinconos.appendChild(corazon);
                padreinconos.appendChild(descarga)
                padreinconos.appendChild(max)
                cajaUserName.classList.add('padreUserName')
                descarga.style.display = 'block'
                descarga.classList.add('iconDownload')
                corazon.style.display = 'block'
                corazon.classList.add('iconfavActive')
                max.style.display = 'block'
                max.classList.add('iconMax')
            }


            gif.addEventListener('mouseover', mouseovergif, false)
            gif.addEventListener('mouseout', () => {
                gif.style.backgroundColor = 'transparent'
                cuadro.style.opacity = '1'
                corazon.style.display = 'none'
                descarga.style.display = 'none'
                  max.style.display = 'none'
                cajaUserName.classList.remove('padreUserName')
                cajaUserName.style.display = 'none'
            },false)

            max.addEventListener('mouseover', function () {
                max.classList.toggle('iconMax-hover');
                max.classList.toggle('iconMax');
            })

            max.addEventListener('mouseout', function () {
                max.classList.toggle('iconMax');
                max.classList.toggle('iconMax-hover');
            })

            max.addEventListener('click', function () {
                console.log(cuadro)
                let srcdelgif = cuadro.src
                let userdelgif = cuadro.getAttribute('data2')
                let namedelgif = cuadro.getAttribute('data')
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
                return descargarMiGifo(cuadro);
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
                let urlMiGifo = cuadro.getAttribute('data3')
                console.log(urlMiGifo)
                let i = storage.indexOf(urlMiGifo)
                console.log(i)
                storage.splice( i, 1 );
                localStorage.setItem('gifsFav', JSON.stringify(storage));
                window.location.href = "./favoritos.html"
            })
            var mediaqueryList = window.matchMedia("(max-width: 500px)");
            if (mediaqueryList.matches) {
                gif.removeEventListener('click', mouseovergif)
                gif.addEventListener('click', () => {
                    console.log(cuadro)
                    let srcdelgif = cuadro.src
                    let userdelgif = cuadro.getAttribute('data2')
                    let namedelgif = cuadro.getAttribute('data')
                    let idDelGif = cuadro.getAttribute('data3')
                    ventana(srcdelgif, userdelgif, namedelgif, idDelGif)
                }, false)
            }
          
              
        })
    }) 
}
agregarfav();

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


// trendings function




function subirgifofav(event, imggif) {
    event.target.classList.toggle('iconfavActive');
    event.target.classList.toggle('iconfav');
    let idGifFav = imggif.getAttribute('data3')
    storage.push(idGifFav)
    console.log(storage)
    localStorage.setItem('gifsFav', JSON.stringify(storage))
    window.location.href = "./favoritos.html"
}


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
            let urlGif = img.images.original.url
            imggif.setAttribute('data', img.title) // data titulo
            imggif.setAttribute('data2', img.username) // data username
            imggif.setAttribute('data3', img.id) // id
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

            function mouseovergif() {
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
            }


            gif.addEventListener('mouseover', mouseovergif, false)

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
                this.event = event
                subirgifofav(event, imggif)
            })
            imggif.addEventListener('mouseout', () => {
                gif.style.backgroundColor = 'transparent'
                imggif.style.opacity = '1'
                corazon.style.display = 'none'
                descarga.style.display = 'none'
                max.style.display = 'none'
                cajaUserName.classList.remove('padreUserName')
            })

            let mediaqueryList = window.matchMedia("(max-width: 500px)");
            if(mediaqueryList.matches) {
               
                gif.removeEventListener('click', mouseovergif)
                gif.addEventListener('click', () => {
                    console.log(imggif)
                    let srcdelgif = imggif.src
                    let userdelgif = imggif.getAttribute('data2')
                    let namedelgif = imggif.getAttribute('data')
                    let idDelGif = imggif.getAttribute('data3')
                    ventana(srcdelgif, userdelgif, namedelgif, idDelGif)
                }, false)
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

  

    let burguer = document.getElementById('burguer');

let btn_crear = document.getElementById('boton_crear');

let mediaqueryList = window.matchMedia("(max-width: 500px)");
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