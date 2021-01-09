let video = document.getElementById('video')
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })

        .then(function (stream) {
            console.log(stream)
            video.srcObject = stream;
            video.play()  
        })
        
        
}

getStreamAndRecord()

async function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    })
    
    .then(function (stream) {
        Newstream = stream
        console.log(stream)
        video.srcObject = Newstream;
        video.play()  
        console.log(Newstream)
        console.log('ya paso por aca')
    }),(error)=>{
        console.log('no tengo permisos'),
        pedircamara()
    }
}

.catch(
    console.log('no tengo permisos'),
    pedircamara()
)