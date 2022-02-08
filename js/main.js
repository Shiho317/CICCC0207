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
const totalWrap = document.querySelector('.total-wrap');


async function addToCart(id){
  
    const targetItem = await getData(
    "GET",
    `https://fakestoreapi.com/products/${id}`
  )

  let amountNum = 0;

  const itemDetails = document.createElement('div');
  itemDetails.classList.add('item-details')
  cartItems.push(targetItem);
  
  // for(const cartItem of cartItems){
  //   cartItem.amount = amountNum;

  //   let total = cartItem.price;
  //   const itemTotal = cartItem.price * cartItem.amount
  //   total += itemTotal;
  //   const totalPrice = document.createElement('h3');
  //   totalPrice.textContent = `Total: C$${total}`
  //   totalWrap.appendChild(totalPrice)
  //   console.log(total)
    
  // }

    const cartItemWrap = document.createElement('div');
    cartItemWrap.classList.add('cart-item-wrap')
    const itemTitle = document.createElement('h3');
    itemTitle.textContent = targetItem.title;
    const itemPrice = document.createElement('h4');
    itemPrice.textContent = `C$ ${targetItem.price}`;
    const amount = document.createElement('p');
    amount.classList.add('amount');
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.classList.add('plus-btn')
    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.classList.add('minus-btn');

    cartWrap.appendChild(cartItemWrap);
    itemDetails.appendChild(itemTitle);
    itemDetails.appendChild(itemPrice);
    const amountWrap = document.createElement('div');
    amountWrap.classList.add('amount-wrap');
    itemDetails.appendChild(amountWrap);
    amount.textContent = amountNum;
    amountWrap.appendChild(minusBtn);
    amountWrap.appendChild(amount);
    amountWrap.appendChild(plusBtn);
    cartItemWrap.appendChild(itemDetails);
    const itemImg = document.createElement('img');
    itemImg.setAttribute('src', targetItem.image);
    cartItemWrap.appendChild(itemImg);

    const btns = document.querySelectorAll('.buyButton');
    const unVaildBtn = btns[targetItem.id - 1]
    unVaildBtn.setAttribute('disabled', true)
    unVaildBtn.style.backgroundColor = 'grey';
    unVaildBtn.textContent = 'In your Cart';
    noItem.style.display = 'none';

    //cart button num
    const cartBadge = document.querySelector('.fa-shopping-cart span')
    cartBadge.textContent = cartItems.length

    //increase decrease amount

  plusBtn.addEventListener('click', () => {
    if(Number(amount.textContent) < 10)
    amount.textContent = Number(amount.textContent) + 1;
    targetItem.amount = Number(amount.textContent)
    console.log(targetItem.amount)
  })

  minusBtn.addEventListener('click', () => {
    if(Number(amount.textContent) > 0){
      amount.textContent = Number(amount.textContent) - 1;
      targetItem.amount = Number(amount.textContent)
      console.log(targetItem.amount)
    }
  })

}

//cart modal

const closeBtn = document.querySelector('.close-btn');
const openBtn = document.querySelector('.fa-shopping-cart');

const openCart = () => {
  cartWrap.style.top = '0';
}

openBtn.addEventListener('click', openCart);

const closeCart = () => {
  cartWrap.style.top = '-100%';
}

closeBtn.addEventListener('click', closeCart)


//total price
  // const totalWrap = document.querySelector('.total-wrap');

  // for(let i = 0; i < len; i++){
  //   const itemTotal = cartItems[i].price * cartItems[i].amount
  //   const total = total + itemTotal;
  //   const totalPrice = document.createElement('h3');
  //   totalPrice.textContent = `Total: C$${total}`
  //   totalWrap.appendChild(totalPrice)
  //   console.log(total)
  // }