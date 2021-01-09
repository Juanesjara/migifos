let btnComenzar = document.getElementById('comenzar')
let btnGrabar = document.getElementById('grabar')
let btnFinalizar = document.getElementById('finalizar')
let video = document.getElementById('video')
let Newstream;
let titulo = document.getElementById('titulo')
let titulo2 = document.getElementById('titulo2')
let subtitulo = document.getElementById('subtitulo')
let subtitulo2 = document.getElementById('subtitulo2')
let numero1 = document.getElementById('1')
let numero2 = document.getElementById('2')
let numero3 = document.getElementById('3')
let padreTitulo = document.getElementById('padre-titulo')
let padreSubtitulo = document.getElementById('padre-subtitulo')
let contador = document.getElementById('reloj')
btnComenzar.addEventListener('click', getStreamAndRecord)
let recorder;
let reloj;
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 2080 }
         }
    })
    
    .then(function (stream) {
        video.src = video.srcObject = null;
        Newstream = stream
        console.log(stream)
        video.srcObject = Newstream;
        video.play()  
        console.log(Newstream)
        console.log('ya paso por aca')
        mostrarCamara()
        
        recorder = RecordRTC(stream, {
            type: 'video',
        })
    })
    .catch( 
        console.log('no tengo permisos'),//borrar este console.log
        pedircamara()
)
}

btnFinalizar.addEventListener('click', pararGrabacion)

function pararGrabacion(){
    let srcVideo;
    recorder.stopRecording(function(){
        srcVideo =  recorder.getBlob();
        video.src = video.srcObject = null;
        console.log(srcVideo);
        video.src = URL.createObjectURL(srcVideo);
        video.load()
        video.play()
        video.loop = true
    });
    window.clearInterval(reloj);
    contador.innerHTML='Repetir captura'
}

contador.addEventListener('click', refrescarPagina)

function refrescarPagina(){
    window.location.assign('creargifo1.html')
}
    

btnGrabar.addEventListener('click', iniciarGrabacion)

function iniciarGrabacion(){
    btnGrabar.classList.add('display-none')  
    recorder.startRecording();
    btnFinalizar.classList.remove('display-none')
    let n = 0
    reloj = window.setInterval(function(){
        contador.innerHTML = n;
        n++;
      },1000);

}
  
function mostrarCamara(){
    
    video.classList.remove('display-none')
    padreTitulo.style.display = 'none'
    padreSubtitulo.classList.add('display-none')
    numero1.classList.remove('numeroAzul')
    numero2.classList.add('numeroAzul')
    btnGrabar.classList.remove('display-none')
    btnComenzar.classList.add('display-none')
    btnFinalizar.classList.add('display-none')
}

function pedircamara(){
    titulo.innerHTML='¿Nos das acceso'
    titulo2.innerText = 'a tu camara?'
    subtitulo.innerText = 'El acceso a tu camara será válido sólo'
    subtitulo2.innerText = 'por el tiempo en el que estés creando el GIFO.'
    btnComenzar.style.display = 'none'
    numero1.classList.add('numeroAzul')
}

function verificarCamara(){
    getStreamAndRecord()
    if(video.srcObject == Newstream){
        console.log('si hay permiso')
        
    }else{
        console.log('no hay permiso')
        
    }
}
