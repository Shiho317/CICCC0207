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

      const itemDesc = document.createElement('p');
      itemDesc.textContent = item.description;

      const itemPrice = document.createElement('h3');
      itemPrice.textContent = `C$${(item.price).toFixed(2)}`;

      const itemContainer = document.createElement('div');
      itemContainer.id = item.id;
      itemsWrap.appendChild(itemContainer);
      itemContainer.classList.add('item-container');

      itemContainer.appendChild(itemImg);
      itemContainer.appendChild(itemDesc);
      itemContainer.appendChild(itemPrice);

      const buyButton = document.createElement('button');
      buyButton.textContent = 'Buy Now';
      buyButton.classList.add('buyButton');

      itemContainer.appendChild(buyButton);

    }
  } catch (error) {
    console.log(error)
  }
}

getItems()