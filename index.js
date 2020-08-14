if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

  function ready(){

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClick)
    var removeCartItemButtons =document.getElementsByClassName('btn-danger')
    for(var i=0; i<removeCartItemButtons.length; i++){
        var button=removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
        }
    
    var quantityInputs =document.getElementsByClassName('cart-quantity-input')
    for(var i=0; i<quantityInputs.length; i++){
        var input=quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons =document.getElementsByClassName('shop-item-button')
    for(var i=0; i<addToCartButtons.length; i++){
        var button=addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
        }
        for(let i=0; i<addToCartButtons.length; i++){
            addToCartButtons[i].addEventListener('click', ()=>{
                cartNumbers() ;
        
            })
        }
        
        function onLoadCartNumbers(){
            let productNumbers=localStorage.getItem('cartNumbers');
            if (productNumbers){
                document.querySelector('.cart span').textContent=productNumbers;
            }
        }
        
        function cartNumbers(){
            let productNumbers=localStorage.getItem('cartNumbers');
          
            productNumbers=parseInt(productNumbers);
            if(productNumbers){
                localStorage.setItem('cartNumbers', productNumbers + 1);
                document.querySelector('.cart span').textContent= productNumbers + 1;
        
            }else{
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.cart span').textContent=1;
        
        }
        
        }
        onLoadCartNumbers();
        
        
    }
    function purchaseClick(){
        alert ('Thank you for the purchase');
        var cartItemss=document.getElementsByClassName('cart-items')[0]
        while(cartItemss.hasChildNodes()){
            cartItemss.removeChild(cartItemss.firstChild)
        }
        updateCartTotal();
    }
function removeCartItem(event){
    console.log('click')
  var buttonClicked=event.target
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event){
    var input =event.target
    if(isNaN(input.value) || input.value<=0){
        input.value=1   
    }
    updateCartTotal()
}
function addToCartClicked(event){
     var button =event.target
     var shopItem=button.parentElement.parentElement
    //  var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText
     var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText
     var imageSrc=shopItem.getElementsByClassName('shop-item-image')[0].src
     console.log(price, imageSrc)
     addItemToCart( price, imageSrc)
     updateCartTotal();
}

function addItemToCart( price, imageSrc){
  
    var cartRow=document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems=document.getElementsByClassName('cart-items')[0]
  
    console.log(cartItems)
    var cartItemNames=cartItems.getElementsByClassName('cart-item-title')
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText==title){
            alert('This item is already added to cart')
            return
        }
    }

    var cartRowContents= `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
     </div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
     </div>`
cartRow.innerHTML=cartRowContents
cartItems.append(cartRow)
cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

let products=[
    {
        name: 'grey hoodiee',
        tag: 'dress 6',
        price: 15,
        inCart: 0
    },
    {
        name: 'black hoodiee',
        tag: 'dress 1',
        price: 10,
        inCart: 0
    },
    {
        name: 'brown hoodiee',
        tag: 'top 10',
        price: 20,
        inCart: 0
    }
    

];






function updateCartTotal(){
    
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    console.log(cartItemContainer)

    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total=0
    for(var i=0; i<cartRows.length; i++){
        var cartRow=cartRows[i]
        var priceElement= cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price =parseFloat(priceElement.innerText.replace('$', ''))
        var quantity =quantityElement.value
        total=total+(price* quantity)

    }
    total= Math.round (total*100)/100

document.getElementsByClassName('cart-total-price')[0].innerText='$'+total

  
}

