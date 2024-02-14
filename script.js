console.log("Welcome");

// Intialize the Variables
let Index = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mannat", filePath: "songs/1.mp3", coverPath:"covers/mannat.jpg"},
    {songName: "Darasal", filePath: "songs/2.mp3", coverPath:"covers/darasal.jpeg"},
    {songName: "Phir kabhi", filePath: "songs/3.mp3", coverPath:"covers/phir kabhi.jpg"},
    {songName: "Do Din", filePath: "songs/4.mp3", coverPath:"covers/do din.jpeg"},
    {songName: "With You", filePath: "songs/5.mp3", coverPath:"covers/with you.jpeg"},
    {songName: "Tumse hi Tumse", filePath: "songs/6.mp3", coverPath:"covers/tumse hi tumse.jpeg"},
    {songName: "Don't let it break your heart", filePath: "songs/7.mp3", coverPath:"covers/don't.jpeg"},
    {songName: "Tera Hua", filePath: "songs/8.mp3", coverPath:"covers/tera hua.jpeg"},
    {songName: "Saudebazi", filePath: "songs/9.mp3", coverPath:"covers/saudebazi.jpeg"},
    {songName: "Mahiye Jinna Sohna", filePath: "songs/10.mp3", coverPath:"covers/mahiye jinha sona.jpeg"},
    {songName: "Sunflower", filePath: "songs/11.mp3", coverPath:"covers/Sunflower.jpeg"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
})

//audioElement.play;

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{

    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        Index = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${Index+1}.mp3`;
        masterSongName.innerText = songs[Index].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
        
})

document.getElementById('next').addEventListener('click', ()=>{
    if(Index>=10){
        Index = 0
    }
    else{
        Index +=1;
    }
    audioElement.src = `songs/${Index+1}.mp3`;
    masterSongName.innerText = songs[Index].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(Index<=0){
        Index = 0
    }
    else{
        Index -=1;
    }
    audioElement.src = `songs/${Index+1}.mp3`;
    masterSongName.innerText = songs[Index].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

// Function to update the container background
const updateContainerBackground = () => {
    const container = document.querySelector('.container');
    const currentSongIndex = Index;
    
    if (currentSongIndex >= 0 && currentSongIndex < songs.length) {
        container.style.backgroundImage = `url('${songs[currentSongIndex].coverPath}')`;
    } else {
        container.style.backgroundImage = `url('bg1.jpg')`; // Default background image
    }
};
// Add click event listeners to play each track
songItems.forEach((element, i) => {
    element.getElementsByClassName("songItemPlay")[0].addEventListener('click', () => {
        makeAllPlays();
        Index = i; // Update the Index to the clicked track
        updateContainerBackground(); // Update the background
        playTrack(i);
    });
});

// Update track card and container background when the page loads (for the initial track)
updateTrackCard(Index);
updateContainerBackground();

// Function to update the cover image for previous and next track
const updateCoverImagePN = (index) => {
    const coverImage = document.querySelector('.container');
    if (index >= 0 && index < songs.length) {
        coverImage.style.backgroundImage = `url(${songs[index].coverPath})`;
    }
};

// Function to handle next track button click
const playNextTrack = () => {
    if (Index < songs.length - 1) {
        Index++;
        audioElement.src = songs[Index].filePath;
        masterSongName.innerText = songs[Index].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        makeAllPlays();
        document.getElementById(Index).classList.remove('fa-play-circle');
        document.getElementById(Index).classList.add('fa-pause-circle');
        updateCoverImagePN(Index);
    }
};

// Function to handle previous track button click
const playPreviousTrack = () => {
    if (Index > 0) {
        Index--;
        audioElement.src = songs[Index].filePath;
        masterSongName.innerText = songs[Index].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        makeAllPlays();
        document.getElementById(Index).classList.remove('fa-play-circle');
        document.getElementById(Index).classList.add('fa-pause-circle');
        updateCoverImagePN(Index);
    }
};

// Add event listeners for next and previous buttons
document.getElementById('next').addEventListener('click', playNextTrack);
document.getElementById('previous').addEventListener('click', playPreviousTrack);

// Initial cover image update
updateCoverImagePN(Index);
