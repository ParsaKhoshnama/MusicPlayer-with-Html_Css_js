let songsIndex=0
let audio=document.querySelector('audio')
let progress=document.querySelector('#progress')
let solidCircle=document.querySelector('.solidCircle')
let currentTimeElement=document.querySelector('#current-time')
let duration=document.querySelector('#duration')



let songs=[
    {
        path:'./media/Jack_Wall_-Adrenaline_ft_Jimmy_Hinson_Gratomic.com.mp3',
        displayName:'Html Padcast',
        artist:'Ozbi',
        cover:"https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
    },
    {
        path:'./media/Jack_Wall-War_Machine_ft_Sergio_Jimenez_Lacima_Gratomic.com.mp3',
        displayName:'Developing',
        artist:'Flora Cash',
        cover:'./images/peakpx.jpg'
    },
    {
        path:'./media/Jack_Wall-Heros_Theme__Gratomic.com.mp3',
        displayName:'Earn',
        artist:'Linkin Park',
        cover:"https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg"
    }
]



let playFlag=true
let backWard=document.querySelector('.fa-backward')
let play=document.querySelector('.main-button')
let forward=document.querySelector('.fa-forward')
let backGroundImage=document.querySelector('.bg-container img')
let imgContainer=document.querySelector('.img-container img')
let title=document.querySelector('#title')
let artist=document.querySelector('#artist')
backWard.addEventListener('click',backWardOnClick)
play.addEventListener('click',playOnClick)
forward.addEventListener('click',forwardOnClick)





let counter=0
let progressBarCounter=0
let progressBarFlag=true
let totalTime=Math.ceil(audio.duration)





function backWardOnClick(event){
    songsIndex--
    if(songsIndex<0)
        songsIndex=songs.length - 1
    showInformation()
}

function playOnClick(event){
  
   currentTime()
   currentProgress()

    
}

function forwardOnClick(event){
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
    title.innerHTML=songs[songsIndex].displayName
    artist.innerHTML=songs[songsIndex].artist

}

function currentTime(){
    if(playFlag)
    {
        playFlag=false
        let minutes=0
        let seconds=0
        audio.play()

        let timer=setInterval(function(){
            if(playFlag)
            {
                progressBarFlag=true
                clearInterval(timer)
                return
            }
           counter++
           if(counter>totalTime)
                clearInterval(timer)
            else{
             //   progress.style.width=((counter/totalTime)*360)+'px'
             //   solidCircle.style.transform='translateX('+((counter/totalTime)*360)+'px)'
                minutes=Math.floor(counter/ 60)
                seconds=counter % 60
                
                if(minutes<10 && seconds>=10)
                    currentTimeElement.innerHTML='0'+minutes +':'+seconds
                else if(minutes>=10 && seconds<10)
                currentTimeElement.innerHTML=minutes +':0'+seconds
                else if(minutes<10 && seconds<10)
                currentTimeElement.innerHTML='0'+minutes +':0'+seconds
                else
                currentTimeElement.innerHTML=minutes +':'+seconds
            }
        },1000)

         
    }
    else{
        audio.pause()
        playFlag=true
    }
    play.classList.toggle('fa-play')
    play.classList.toggle('fa-pause')
}

function currentProgress(){
    if(progressBarFlag){
        progressBarFlag=false
        let timer=setInterval(function(){
            if(progressBarFlag){
                clearInterval(timer)
                return
            }
            progressBarCounter +=0.3
            if(Math.floor(progressBarCounter)>totalTime)
                clearInterval(timer)
            else{
                   progress.style.width=((progressBarCounter/totalTime)*360)+'px'
                   solidCircle.style.transform='translateX('+((progressBarCounter/totalTime)*360)+'px)'
            }
        },300)
    }
}

