const purchaseButton = document.querySelector('.comprarButton')
purchaseButton.addEventListener('click', initPayment)


function initPayment(){
  const shoppingCart = localStorage.getItem('shoppingCart')
  fetch('/checkout',{
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: shoppingCart,
  }).then(function(result){
    return result.json()
  }).then(function(data){

  })
}

function saveOrderInDatabase(){
  const email = document.getElementById('email-element').value;
  const shoppingCart = localStorage.getItem('shoppingCart')

  const dataToSend = {
    email: email,
    items: JSON.parse(shoppingCart)
  }

  fetch('/order',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(dataToSend)

  })

}