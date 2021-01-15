let cuadros = document.getElementById('cuadros')
let noGifs = document.getElementById('favSinContenido')
let storage = sessionStorage.getItem('gifsFav')
let src = storage.split(',', 100)
console.log(src)

if(src.length > 0){
    noGifs.classList.add('display-none')
}


function agregarfav(){
    src.forEach(url => {
        let cuadro = document.createElement('img')
        cuadro.setAttribute('src', url)
        cuadro.classList.add('cuadro')
        cuadros.appendChild(cuadro)

    })
    
}


agregarfav();