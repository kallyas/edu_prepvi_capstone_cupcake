window.onload = function () {


  // getMovies(urlPopular, 'newMovies')

  // getMovies(urlLatest, 'latestMovies')

  getMovies()

  displayMovies('please', 'popularMovies')

  displayMovies('please2', 'tvShows')

  displayMovies('please3', 'latestMovies')

  ready()
}

// SET USERNAME OF LOGGED IN USER
const user = JSON.parse(localStorage.getItem('isLoggedIn'))

const loggedIn = document.getElementsByClassName('user-settings__link user-settings__name')
loggedIn.textContent = user

// USER SETTINGS TOGGLE
const settingsToggle = document.querySelector('.user-settings-toggle');
const settingsLinks = document.querySelectorAll('.user-settings__link');

settingsToggle.addEventListener('click', () => {
  document.body.classList.toggle('user-settings-open')
});

settingsLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('user-settings-open')
  })
});




// CART

// set the price for the movies
const price = 5000

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('cart__remove-item')
  for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart__quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('item-cart__button')
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('movie-card__title')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('movie-card__image')[0].src
  addItemToCart(title)
  updateCartTotal()
}

function addItemToCart(title) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item__title')

  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }

  var cartRowContents = `
      <div class="cart__item">
        <p>${title}</p>
      </div>
      <div class="cart__price">
        <p>UGX ${price}</p>
      </div>
      <div class="cart__quantity">
        <input class="cart__quantity-input" type="number" value="1">
      </div>
      <div>
        <button class="cart__remove-item">Remove</button>
      </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('cart__remove-item')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart__quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0

  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart__price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart__quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('UGX', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart__total-price')[0].innerText = 'UGX' + total
}




// FETCHING MOVIE DATA FILL THE BOXES
const card = document.getElementsByClassName("movie-card__image-wrapper")
const image = document.getElementsByClassName('movie-card__image')
const title = document.getElementsByClassName('movie-card__title')
const date = document.getElementsByClassName('movie-card__date')



// fetch movie data and set it to the local storage
function getMovies () {

  // set an object for movie URLs
  const urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=ebb6fea526ae6fedd22bbfce0ae8199a&language=en-US&page=1';
  const urlLatest = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ebb6fea526ae6fedd22bbfce0ae8199a&language=en-US&page=1';
  const urlTvShows = 'https://api.themoviedb.org/3/movie/upcoming?api_key=ebb6fea526ae6fedd22bbfce0ae8199a&language=en-US&page=1';

  Promise.all([
    fetch(urlPopular),
    fetch(urlLatest),
    fetch(urlTvShows)
  ]).then(responses => {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(response => response.json()))
  }).then(data => {
    // save the data to local storage

    let counter = 0

    data.forEach(item => {
      // console.log(item.results)

      const moviesList = item.results.map(movie => {
        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          rating: movie.vote_average
        }
      })

      const movieObjNames = [
        'popularMovies',
        'latestMovies',
        'tvShows'
      ]

      const movieObjName = movieObjNames[counter]

      localStorage.setItem(movieObjName, JSON.stringify(moviesList))

      counter ++

      // console.log(JSON.parse(localStorage.getItem(movieObjName)))
    })
  })
}


// Display the movies
function displayMovies(wrapper, movieObjName) {
  // get the movie object
  const movieObj = JSON.parse(localStorage.getItem(movieObjName))

  movieObj.map(movie => {
    // grab container
    const container = document.getElementById(wrapper)

    // create movie card
    const movieCard = document.createElement('div')
    movieCard.setAttribute('class', 'movie-section__movie-card')

    // create image wrapper
    const imageWrapper = document.createElement('div')
    imageWrapper.setAttribute('class', 'movie-card__image')

    // create image
    const image = document.createElement('img')
    image.setAttribute('class', 'movie-card__image')
    image.src = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`

    // create title container
    const titleContainer = document.createElement('div')
    titleContainer.setAttribute('class', 'movie-card__title-container')

    // create title
    const title = document.createElement('h4')
    title.setAttribute('class', 'movie-card__title')
    title.innerText = movie.title

    // create date
    const date = document.createElement('p')
    date.setAttribute('class', 'movie-card__date')
    date.innerText = movie.release_date

    // create cart button
    const cartButton = document.createElement('button')
    cartButton.setAttribute('class', 'item-cart__button')
    // cartButton.setAttribute('onclick', 'addToCartClicked()')
    cartButton.innerText = "Add to Cart"

    // append image to image wrapper
    imageWrapper.appendChild(image)

    // append title contents
    titleContainer.appendChild(title)
    titleContainer.appendChild(date)
    titleContainer.appendChild(cartButton)

    // append elements to movie card
    movieCard.appendChild(imageWrapper)
    movieCard.appendChild(titleContainer)
    console.log(movieCard)

    // add movie card to the container
    container.appendChild(movieCard)
  })
}

// LOG OUT

function logout() {
  alert('Logging Out')

  window.location = '../index.html'
}

// grab the logout anchor
const logoutLink = document.getElementById('logout')
logoutLink.addEventListener('click', (event) => {
  logout()
})

// Display the movies
// displayMovies()



// SEARCH MOVIES
// function search() {
//   // Get the search query
//   const searchQuery = document.getElementById('searchQuery').value

//   // Get all the movie objects
//   const popularMovies = JSON.parse(localStorage.getItem('popularMovies'))
//   const latestMovies = JSON.parse(localStorage.getItem('latestMovies'))
//   const tvShows = JSON.parse(localStorage.getItem('tvShows'))

  

//   // search
//   searchFunction(searchQuery, popularMovies)
//   return
// }


// function searchFunction(searchQuery, movieObj) {
//   for (let i = 0; i < movieObj.length; i++) {
//     if (movieObj[i].name == searchQuery) {
//       console.log(movieObj[i])
//       return movieObj[i]
//     }
//   }
// }

// const searchButton = document.getElementById('searchButton')
// searchButton.addEventListener('click', (event) => {
//   event.preventDefault()

//   console.log(event)

//   search()


// })