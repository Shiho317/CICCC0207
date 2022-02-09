const itemsWrap = document.querySelector('.items');

//get data from api
const getData = (method, url, data) => {
  const datas = fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(results => {
    return results.json()
  })
  return datas
}

//insert items to html
async function getItems(){
  try {
    const items = await getData(
      "GET",
      "https://fakestoreapi.com/products"
    )

    for(const item of items){
      const itemImg = document.createElement('img');
      itemImg.setAttribute('src', item.image);

      const itemTitle = document.createElement('p');
      itemTitle.textContent = item.title;

      const itemPrice = document.createElement('h3');
      itemPrice.textContent = `C$${(item.price).toFixed(2)}`;

      const itemContainer = document.createElement('div');
      itemContainer.id = item.id;
      itemsWrap.appendChild(itemContainer);
      itemContainer.classList.add('item-container');

      itemContainer.appendChild(itemImg);
      itemContainer.appendChild(itemTitle);
      itemContainer.appendChild(itemPrice);

      const buyButton = document.createElement('button');
      buyButton.id = item.id;
      buyButton.textContent = 'Buy Now';
      buyButton.classList.add('buyButton');
      buyButton.addEventListener('click', () => {
        addToCart(item.id)
        console.log(item.id)
      })

      itemContainer.appendChild(buyButton);

    }
  } catch (error) {
    console.log(error)
  }
}

getItems()


//get cart items
const cartWrap = document.querySelector('.cart');
const cartTitle = document.querySelector('.cart h1');
let cartItems = [];
const len = cartItems.length;
const noItem = document.querySelector('.no-item');
let prices = [];
let calcPrices = [];

async function addToCart(id){
  
    const targetItem = await getData(
    "GET",
    `https://fakestoreapi.com/products/${id}`
  )

  cartItems.push(targetItem);

    prices.push(targetItem.price);

      
    //create elements
    const cartItemWrap = document.createElement('div');
    cartItemWrap.classList.add('cart-item-wrap');
    cartItemWrap.id = targetItem.id;
    cartWrap.appendChild(cartItemWrap);

    const totalWrap = document.querySelector('.total-wrap');

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('item-details');
    cartItemWrap.appendChild(itemDetails);

    const itemImg = document.createElement('img');
    itemImg.setAttribute('src', targetItem.image);
    cartItemWrap.appendChild(itemImg);

    const trashWrap = document.createElement('i');
    trashWrap.classList.add('fas');
    trashWrap.classList.add('fa-trash-alt');
    trashWrap.id = targetItem.id;
    cartItemWrap.appendChild(trashWrap);

    const itemTitle = document.createElement('h3');
    itemTitle.textContent = targetItem.title;
    itemDetails.appendChild(itemTitle);

    const itemPrice = document.createElement('h4');
    itemPrice.textContent = `C$ ${targetItem.price}`;
    itemDetails.appendChild(itemPrice);

    const amountWrap = document.createElement('select');
    amountWrap.classList.add('amount-wrap');
    itemDetails.appendChild(amountWrap);

    const subtotal = document.createElement('h3');
    subtotal.classList.add('sub-total');
    subtotal.textContent = `Subtotal: C$ ${targetItem.price}`
    itemDetails.appendChild(subtotal);

    const amount1 = document.createElement('option');
    amountWrap.appendChild(amount1);
    amount1.setAttribute('value', '1');
    amount1.textContent = 1;

    const amount2 = document.createElement('option');
    amountWrap.appendChild(amount2);
    amount2.setAttribute('value', '2');
    amount2.textContent = 2;

    const amount3 = document.createElement('option');
    amountWrap.appendChild(amount3);
    amount3.setAttribute('value', '3');
    amount3.textContent = 3;

    const amount4 = document.createElement('option');
    amountWrap.appendChild(amount4);
    amount4.setAttribute('value', '4');
    amount4.textContent = 4;

    const amount5 = document.createElement('option');
    amountWrap.appendChild(amount5);
    amount5.setAttribute('value', '5');
    amount5.textContent = 5;



    //calc price in cart
    const calcPrice = () => {
      const total = Number(amountWrap.value) * Number(targetItem.price);
      console.log(amountWrap.value)
      subtotal.textContent = `Subtotal: C$ ${total}`;
      const tt = ((Number(totalWrap.textContent) - targetItem.price * targetItem.amount) + total).toFixed(2);
      totalWrap.textContent = tt;

      targetItem.amount = amountWrap.value;
      console.log(targetItem)
    }

    console.log(subtotal.textContent)
    amountWrap.addEventListener('change', calcPrice)

    const initTotal = prices.reduce((acc, num) => {
      return acc + num
    })
    
    totalWrap.textContent = initTotal;
    targetItem.amount = 1;
    
    const btns = document.querySelectorAll('.buyButton');
    const unVaildBtn = btns[targetItem.id - 1]
    unVaildBtn.setAttribute('disabled', true)
    unVaildBtn.style.backgroundColor = 'grey';
    unVaildBtn.textContent = 'In your Cart';
    noItem.style.display = 'none';
    const totalSec = document.querySelector('.total-sec');
    totalSec.style.display = 'unset';

    //cart button num
    const cartBadge = document.querySelector('.fa-shopping-cart span')
    cartBadge.textContent = cartItems.length;
    console.log(cartItems)

    //delete item
    const deleteBtns = document.querySelectorAll('.fa-trash-alt');

    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener('click', () => {
        cartWrap.removeChild(deleteBtn.parentElement);
        unVaildBtn.textContent = 'Buy Now';
        unVaildBtn.disabled = false;
        unVaildBtn.style.backgroundColor = '#add8e6';
        const index = cartItems.indexOf(targetItem);
        cartItems.splice(index, 1);
        cartBadge.textContent = cartItems.length;
        totalWrap.textContent = (Number(totalWrap.textContent) - targetItem.price * targetItem.amount).toFixed(2);
        targetItem.amount = 0;
        const ii = prices.findIndex(i => i === targetItem.price)
        prices.splice(ii, 1);
      });
    });

}

//cart modal

const closeBtn = document.querySelector('.close-btn');
const openBtn = document.querySelector('.fa-shopping-cart');
const overlay = document.querySelector('#overlay')

const openCart = () => {
  overlay.style.top = '0';
}

openBtn.addEventListener('click', openCart);

const closeCart = () => {
  overlay.style.top = '-100%';
}

closeBtn.addEventListener('click', closeCart)


