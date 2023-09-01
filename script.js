
/*Global Variables*/
let songsIndex=0
let playFlag=true
let counter=0
let progressBarCounter=0
let progressBarFlag=true

let isPlaying=false

let totalTime
let timer
let progressTimer


/*Global Variables*/
let audio=document.querySelector('audio')
let progressContainer=document.querySelector('.progress-container')
let progress=document.querySelector('#progress')
let solidCircle=document.querySelector('.solidCircle')
let currentTimeElement=document.querySelector('#current-time')
let duration=document.querySelector('#duration')



let songs=[
    {
        path:'./media/Jack-Wll-Adrenalin.mp3',
        displayName:'Html Padcast',
        artist:'Ozbi',
        cover:"https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
    },
    {
        path:'./media/Jack_Wall-War machine.mp3',
        displayName:'Developing',
        artist:'Flora Cash',
        cover:'./images/peakpx.jpg'
    },
    {
        path:'./media/Jack-Wall-Heros_Theme.mp3',
        displayName:'Earn',
        artist:'Linkin Park',
        cover:"https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg"
    }
]



let backWard=document.querySelector('.fa-backward')
let play=document.querySelector('.main-button')
let forward=document.querySelector('.fa-forward')
let backGroundImage=document.querySelector('.bg-container img')
let imgContainer=document.querySelector('.img-container img')
let title=document.querySelector('#title')
let artist=document.querySelector('#artist')
backWard.addEventListener('click',backWardOnClick)
//play.addEventListener('click',playOnClick)
forward.addEventListener('click',forwardOnClick)

//progressContainer.addEventListener('click',progressBarOnClick)


setTimeout(function(){
    totalTime=Math.ceil(audio.duration)
    play.addEventListener('click',playOnClick)
    progressContainer.addEventListener('click',progressBarOnClick)
},1000)




function backWardOnClick(event){
    songsIndex--
    if(songsIndex<0)
        songsIndex=songs.length - 1
    showInformation()
}

function playOnClick(event){
  
   playFunction()
   play.classList.toggle('fa-play')
    play.classList.toggle('fa-pause')
    
}
function playFunction(){
    if(!isPlaying){
        audio.play()
        isPlaying=true
    }
    currentTime()
   currentProgress()
}

function forwardOnClick(event=0){
    songsIndex++
    if(songsIndex>(songs.length - 1))
        songsIndex=0
    showInformation()
}

function showInformation(){
    currentTimeElement.innerHTML='00:00'
    play.classList.add('fa-play')
    play.classList.remove('fa-pause')
    audio.setAttribute('src',songs[songsIndex].path)
    imgContainer.classList.remove('active')
    imgContainer.setAttribute('src',songs[songsIndex].cover)
   /* imgContainer.classList.add('active')*/
    backGroundImage.setAttribute('src',songs[songsIndex].cover)
    setTimeout(function(){
        imgContainer.classList.add('active')
         totalTime=Math.ceil(audio.duration)
        let minutes=Math.floor(audio.duration / 60)
        let seconds=totalTime - (minutes * 60)
         duration.innerHTML= minutes + ':'+ seconds
        progress.style.transition='none'
        solidCircle.style.transition='none'
        progress.style.width='0px'
        solidCircle.style.transform='translateX(0px)'
        progress.style.transition='width 0.1s linear'
        solidCircle.style.transition='transform 0.1s linear'
       
    },500)
    counter=0
    progressBarCounter=0
    playFlag=true
    progressBarFlag=true
    title.innerHTML=songs[songsIndex].displayName
    artist.innerHTML=songs[songsIndex].artist

}

function currentTime(){

    if(playFlag)
    {
        playFlag=false
        audio.play()

                timer=setInterval(function(){
            if(playFlag)
            {
                progressBarFlag=true
                clearInterval(timer)
                return
            }
           counter +=0.25
           if(counter>totalTime)
           {
                clearInterval(timer)
                clculateTime(totalTime)
                setTimeout(function(){showInformation()},300)
                //showInformation()
                
           }
            else{
             //   progress.style.width=((counter/totalTime)*360)+'px'
             //   solidCircle.style.transform='translateX('+((counter/totalTime)*360)+'px)'
                clculateTime(counter)
            }
        },250)

         
    }
    else{
        audio.pause()
        playFlag=true
    }
  //  play.classList.toggle('fa-play')
   // play.classList.toggle('fa-pause')
}

function clculateTime(totalSeconds){
    totalSeconds=Math.floor(totalSeconds)
   let minutes=Math.floor(totalSeconds/ 60)
   let seconds=totalSeconds % 60
                
        if(seconds>=10)
            currentTimeElement.innerHTML=minutes +':'+seconds
        else if(seconds<10)
            currentTimeElement.innerHTML=minutes +':0'+seconds
        else
            currentTimeElement.innerHTML=minutes +':'+seconds
}

function currentProgress(){
    if(progressBarFlag){
        progressBarFlag=false
         progressTimer=setInterval(function(){
            if(progressBarFlag){
                clearInterval(progressTimer)
                return
            }
            progressBarCounter +=0.25
            if(Math.floor(progressBarCounter)>totalTime)
                clearInterval(progressTimer)
            else{
                   progress.style.width=((progressBarCounter/totalTime)*360)+'px'
                   solidCircle.style.transform='translateX('+((progressBarCounter/totalTime)*360)+'px)'
            }
        },250)
    }
}



function progressBarOnClick(event){
    let width=event.pageX-progressContainer.offsetLeft
    progress.style.transition='none'
    solidCircle.style.transition='none'
    progress.style.width=width + 'px'
    solidCircle.style.transform='translateX('+(event.pageX-solidCircle.offsetLeft - 2) + 'px)'
  //  clearInterval(timer)
  //  clearInterval(progressTimer)
    progress.style.transition='width 0.1s linear'
    solidCircle.style.transition='transform 0.1s linear'
    
    playFlag=true
    progressBarFlag=true
   // audio.pause()
    counter=Math.floor((width/360)*totalTime)
    progressBarCounter=Math.floor((width/360)*totalTime)
    clculateTime(counter)
    if(play.classList.contains('fa-play'))
        play.removeEventListener('click',playOnClick)
    setTimeout(function(){
        audio.currentTime=counter
        if(play.classList.contains('fa-pause'))
        {
        playFunction()
        }
       else
         play.addEventListener('click',playOnClick)
    },250)
}
