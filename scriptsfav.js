let cuadros = document.getElementById('cuadros')

function agregarfav(){
    let src = sessionStorage.getItem('gif')
    let cuadro = document.createElement('div')
     cuadro.setAttribute('src', src)
     cuadro.classList.add('cuadro')
     cuadros.appendChild(cuadro)
}

agregarfav();