
//Code Link:
// Live Link:

//Issues NOte
//Five (5) Main issues resolved


/*
Extra Coding Done By ME
I have generated API Key (optional)
1. If no result Found then message will Appear | Code in line number 67
2. Added Spinner while loading trough spinnerToggle() Function
3. Error message show for empty search Line no 175 
4. Added some changes in index.html (error and spinner)  and made some css styling end of style.css
5.

*/ 


const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
// https://pixabay.com/api/?key=15674931-a9d714b6e9d654524df198e00&q=nature&image_type=photo&pretty=true


//Old API Key provided by Programming Hero
//const KEY = '15674931-a9d714b6e9d654524df198e00&q';

//New API Key By me
const KEY = '20271808-7797e67e6ca444d00127fd566&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  //console.log(images);
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

  //Spinner close
  spinnerToggle();
}

const getImages = (query) => {
  spinnerToggle();
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data =>{
      //If Found any Image | Validation
      if(data.hits.length>0){
        clearError();
        showImages(data.hits)
      }else{
        spinnerToggle();
        showError('No Image Found!');
      }
    })//hitS will be hits || Debug Issue One resolved
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;

  //element.classList.add('added');
  //
  element.classList.toggle('added');
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    //alert('Hey, Already added !')
    //Removing existing Item from Array
    sliders.splice(sliders.indexOf(img), 1);
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  //Spinner start
  spinnerToggle();

  document.querySelector('.main').style.display = 'block';
  const duration = document.getElementById('duration').value || 1000; //Issue Two debug result - duration was doration in html | Correction done in html
  
  //Validation for Negative value and duration restriction applied  
  if(duration>=1000){
    clearError();
    // hide image aria
    imagesArea.style.display = 'none';
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
    //Spinner End
    spinnerToggle();
  
  }else{
    showError('Slider Duration Must be at least 1000');
  }
}


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  //Search Validation -Custom
  if(search.value.length>0){
    clearError();
    getImages(search.value)
    sliders.length = 0;
  }else{
    showError('Please write something in search box!');
  }
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})


// Custom Function by Rajibul Hasan


// blank inner html
const clearError= () =>{
  const errorMessage=document.getElementById('error-message');
  errorMessage.innerHTML='';
}

//show error message 
const showError= (message) =>{
  const errorMessage=document.getElementById('error-message');
  errorMessage.style.display='block';
  errorMessage.innerHTML=`<p class="alert alert-danger">${message}</p>`;
  console.log('Slider Duration Must be at least 1000');
}


//spinner
const spinnerToggle=()=>{
  const spinner=document.getElementById('spinner');
  spinner.classList.toggle('d-none');
}


//search box On Submit
const searchId=document.getElementById('search');
searchId.addEventListener('keypress',function(event){
  //console.log(event.key);
  if(event.key=='Enter'){
    document.getElementById('search-btn').click();
  }
});

