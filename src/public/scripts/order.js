const submitButton = document.querySelector('#submit')
submitButton.addEventListener('click', saveOrderInDatabase)


function saveOrderInDatabase(){
  
  const shoppingCart = localStorage.getItem('shoppingCart')
  const email = document.getElementById('email-element').value
  console.log(email)
  console.log(shoppingCart)

  const dataToSend = {
    email: email,
    items: JSON.parse(shoppingCart)
  }

  fetch('/order',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend)

  }).then(function (result){
    return result.json();
  }).then((res)=> console.log(res)).then((shoppingCartItemsContainer.innerHTML=''))


  updateShoppingCartTotal();
  modal.classList.remove('modal--show')
  Swal.fire({
    title: 'Muchas gracias! Se le enviará un mail con el número del pedido',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

  

}