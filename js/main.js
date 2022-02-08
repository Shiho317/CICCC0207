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


async function addToCart(id){
  
    const targetItem = await getData(
    "GET",
    `https://fakestoreapi.com/products/${id}`
  )

  let amountNum = 0;

  const amountSec = document.createElement('div');

  console.log(targetItem.id)
  cartItems.push(targetItem);
  console.log(cartItems)
  console.log(cartItems[0])
  

  for(const cartItem of cartItems){
    if(cartItem.id === targetItem.id){
      amountNum++;
      console.log(amountNum)
      console.log('yy');
      cartItem.amount = amountNum;
      console.log(cartItem.amount)
    }else{
      console.log('nan')
    }
    
  }

  console.log(cartItems[0].amount)
  console.log(amountNum)

    const cartItemWrap = document.createElement('div');
    const itemTitle = document.createElement('h3');
    itemTitle.textContent = targetItem.title;
    const itemPrice = document.createElement('h4');
    itemPrice.textContent = `C$ ${targetItem.price}`;
    const amount = document.createElement('p');
    amount.classList.add('amount');
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    amountSec.appendChild(minusBtn)
    amountSec.appendChild(plusBtn);
    cartItemWrap.appendChild(amountSec);

    cartWrap.appendChild(cartItemWrap);
    cartItemWrap.appendChild(itemTitle);
    cartItemWrap.appendChild(itemPrice);
    const itemImg = document.createElement('img');
    itemImg.setAttribute('src', targetItem.image);
    cartWrap.appendChild(itemImg);
    amount.textContent = amountNum;
    amountSec.appendChild(amount)
    console.log(amount)

    const unVaildBtn = document.querySelector(`#${targetItem.id} button`);

}

