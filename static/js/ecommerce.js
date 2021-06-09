let formContainer = document.getElementById("form-container");
let addToCartButton = document.getElementsByClassName("add-to-cart");
//display cart when clicked
function popUpForm() {
    let contShop = document.getElementById("cont-shop");
    contShop.onclick = function closeForm(){
        document.getElementById("form-container").style.display = "none"; 
    }

    let cart = document.getElementById("cart");
    cart.onclick = function openForm(){
        document.getElementById("form-container").style.display = "block";
    }
    return
}
popUpForm();
//make summary-page invisible
let summaryPage = document.getElementsByClassName("summary-page")[0];  
function hideSummary() {
    summaryPage.style.display ="none"
}
hideSummary();
//add event listeners to add to cart button
function clickAddToCart() {
    for(let i = 0; i < addToCartButton.length; i++){
        addToCartButton[i].addEventListener("click", getItemDetails);
        addToCartButton[i].addEventListener("click", insertSerialNumber);   
    }    
}
clickAddToCart()
//gather details of items to add to cart
function getItemDetails(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('title')[0].innerText
    let amount = shopItem.getElementsByClassName('amount')[0].innerText
    addToCart(title, amount,event)
}    
//push items to cart
function addToCart(title, amount,event) {
    let cartContent = document.getElementById("form-header");
    let cartItemNames = formContainer.getElementsByClassName("item-title");
    let selectedItemName = event.target.parentElement.nextElementSibling;
    
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == selectedItemName.innerText){           
            alert("Item is already present in cart. You can increase the quantity of items in your cart.")
            return
        }            
    }
    
    let cartRowContents = `
                         <span class="serial-num"></span>
                         <span class="item-title" id="item-title">${title}</span>
                         <span class="item-price">${amount}</span>
                         <span class="item-quantity">              
                            <span class="decrement-btn">-</span>
                            <span class="cart-quant-value" id="cart-quant-value">1</span>
                            <span class="increment-btn">+</span>
                         </span> 
                        <span class="quantity-small-screen" id="quantity-small-screen">1</span>
                        <span class="decrement-btn-small" id="decrement-btn-small">-</span>
                        <span class="increment-btn-small" id="increment-btn-small">+</span>
                        <span class="remove-btn">REMOVE</span>
                         `;                                         
    cartContent.innerHTML += cartRowContents;        
    clickRemoveButton();
    getDecrementButton();
    getIncrementButton();
    increaseTotalQuantityValue();
    increaseQuantitySmallScreen();      
    decreaseQuantitySmallScreen();
    total();
}
//add serial number to cart
function insertSerialNumber() {
    let serialNums = formContainer.getElementsByClassName("serial-num");
    for(let i = 0; i < serialNums.length; i++){   
        serialNums[i].innerText = i + 1;
    }
}
//add event listener to increase button in cart for large screens
function getIncrementButton(){
    let incrementButton = formContainer.getElementsByClassName("increment-btn");
    for(let i = 0; i < incrementButton.length; i++){
        incrementButton[i].addEventListener("click", increaseQuantityValue);
    }
}
//add event listener to decrease button in cart for large screens
function getDecrementButton(){
    let decrementButton = formContainer.getElementsByClassName("decrement-btn"); 
    for(let i = 0; i < decrementButton.length; i++){
        decrementButton[i].addEventListener("click", decreaseQuantityValue);
    }
}
//Increases quantity in cart for large screens
function increaseQuantityValue(event){
    let selectedItemName = event.target.parentElement.previousElementSibling.previousElementSibling;
    let cartItemNames = formContainer.getElementsByClassName('item-title');
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == selectedItemName.innerText){
            let bigCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
            bigCartItemQuantity.innerText = parseInt(bigCartItemQuantity.innerText) + 1;                
            let smallCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.nextElementSibling;
            smallCartItemQuantity.innerText = parseInt(smallCartItemQuantity.innerText) + 1;                
        }    
    }
    total();
}
//decreases quantity in cart for large screens
function decreaseQuantityValue(event){
    let selectedItemName = event.target.parentElement.previousElementSibling.previousElementSibling;
    let selectedItemQuantity = selectedItemName.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
    let cartItemNames = formContainer.getElementsByClassName('item-title');
    if(selectedItemQuantity.innerText <= 1){
        alert("You cannot have less than 1 item. If you wish to remove the item click remove.");
        return;
    }
    for(let i = 0; i < cartItemNames.length; i++){
        let bigCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
        let smallCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.nextElementSibling;
        if(cartItemNames[i].innerText == selectedItemName.innerText){
            bigCartItemQuantity.innerText = parseInt(bigCartItemQuantity.innerText) - 1;                
            smallCartItemQuantity.innerText = parseInt(smallCartItemQuantity.innerText) - 1;                
        }    
    }
    total();
}
//Increase quantity in small screens
function increaseQuantitySmallScreen(){
    let button = document.getElementsByClassName("increment-btn-small");
    for(let i = 0; i < button.length; i++){
        button[i].addEventListener("click", function(e){
            let selectedItemName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
            let cartItemNames = formContainer.getElementsByClassName('item-title');
            for(let i = 0; i < cartItemNames.length; i++){
                if(cartItemNames[i].innerText == selectedItemName.innerText){
                    let bigCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
                    bigCartItemQuantity.innerText = parseInt(bigCartItemQuantity.innerText) + 1;                
                    let smallCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.nextElementSibling;
                    smallCartItemQuantity.innerText = parseInt(smallCartItemQuantity.innerText) + 1;
                    total();                
                }    
            }   
        })
    }   
}
//decrease quantity in small screens
function decreaseQuantitySmallScreen(){
    let button = document.getElementsByClassName("decrement-btn-small");
    for(let i = 0; i < button.length; i++){    
        button[i].addEventListener("click", function(e){
            let selectedItemName = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
            let selectedItemQuantity = selectedItemName.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
            let cartItemNames = formContainer.getElementsByClassName('item-title');
            if(selectedItemQuantity.innerText <= 1){
                alert("You cannot have less than 1 item. If you wish to remove the item click remove.");
                return;
            }
            for(let i = 0; i < cartItemNames.length; i++){
                let bigCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
                let smallCartItemQuantity = cartItemNames[i].nextElementSibling.nextElementSibling.nextElementSibling;
                if(cartItemNames[i].innerText == selectedItemName.innerText){
                    bigCartItemQuantity.innerText = parseInt(bigCartItemQuantity.innerText) - 1;                
                    smallCartItemQuantity.innerText = parseInt(smallCartItemQuantity.innerText) - 1;                
                    total();
                }    
            }
        })
    }
    total();
}
//return cart quantity back to default after removal
function makeQuantityOne(){
    let bigScreenQuantity = formContainer.getElementsByClassName("cart-quant-value");
    let smallScreenQuantity = formContainer.getElementsByClassName("quantity-small-screen");
    if(bigScreenQuantity > 1){
        bigScreenQuantity.innerText = 1;
        smallScreenQuantity.innerText = 1;
    }     
}
//add event listener to remove button
function clickRemoveButton(){
    let buttonRemove = document.getElementsByClassName("remove-btn");
    for(let i = 0; i < buttonRemove.length; i++){
        buttonRemove[i].addEventListener('click', removeButton);
        buttonRemove[i].addEventListener('click', insertSerialNumber);  
    }
}
//remove item from cart
function removeButton(event){
    let button = event.target;
    let i = 0;
    let container = [].reverse();
    while(i < 8){
        container.push(button);
        button = button.previousElementSibling;
        i++;
    }
    for(i = 0; i < container.length; i++){
        container[i].remove(); 
    }
    decreaseTotalQuantityValue();
    total();
}
//increase value for number of items in cart 
function increaseTotalQuantityValue(){
    let total = document.getElementById("cart-numb");
    total.innerText = parseInt(total.innerText) + 1;
}
//decrease value for number of items in cart
function decreaseTotalQuantityValue(){
    let total = document.getElementById("cart-numb");
    total.innerText = parseInt(total.innerText) - 1;
}
//add event listener to form
let input = document.getElementsByClassName("input");
for(let i = 0; i < input.length; i++){
    input[i].addEventListener("keydown", eraseErrorMessage);
    input[i].addEventListener("keyup", validateForm);
    input[i].addEventListener("blur", validateForm);
    input[i].addEventListener("keydown", eraseErrorMessage);
}
//remove errror message after input
function eraseErrorMessage(e) {
    let errorMessage = e.target.nextElementSibling;
    errorMessage.innerText = "";
}

function validateForm(e){
    let node = e.target;
    let nodeLength = node.value.length;
    let nodeSib = node.nextElementSibling;
    let id = node.getAttribute("id");
    if(node.value == "" && id == "input_name"){
        node.style.borderColor = "rgb(233, 14, 14)";
        nodeSib.style.color = "rgb(233, 14, 14)"
        nodeSib.innerText = "Please enter your name"
    }
    else if(node.value == "" && id == "email"){
        node.style.borderColor = "rgb(233, 14, 14)";
        nodeSib.style.color = "rgb(233, 14, 14)"
        nodeSib.innerText = "Please enter an email"
    }
    else if(node.value == "" && id == "tel"){
        node.style.borderColor = "rgb(233, 14, 14)";
        nodeSib.style.color = "rgb(233, 14, 14)"
        nodeSib.innerText = "Please enter your telephone number"
    }
    else if(id == "email" && nodeLength < 5){
        node.style.borderColor = "rgb(233, 14, 14)";
        nodeSib.style.color = "rgb(233, 14, 14)"
        nodeSib.innerText = "Invalid email";
    }
    else if(id == "tel" && isNaN(node.value)){
        node.style.borderColor = "rgb(233, 14, 14)";
        nodeSib.style.color = "rgb(233, 14, 14)"
        nodeSib.innerText = "Phone number can only be numbers";
    } 
    else if(id == "tel" && nodeLength < 11){
        node.style.borderColor = "rgb(233, 14, 14)";
        nodeSib.style.color = "rgb(233, 14, 14)"
        nodeSib.innerText = "Phone number cannot be less than 11 characters";
    } 
    else{
        node.style.borderColor = "rgb(10, 247, 10)";
        nodeSib.innerText = "";
    }
}
//control total price of items in cart
function total(){
    let prices = document.getElementsByClassName("item-price")
    let total = 0;
    for(let i = 0; i < prices.length; i++){
        let price = parseFloat(prices[i].innerText.replace("#", "").replace(",", ""));
        let quantity = parseFloat(prices[i].nextElementSibling.firstElementChild.nextElementSibling.innerText);
        total = total + (price * quantity)
    }   
    total = Math.round(total * 100) / 100;
    document.getElementById("amount").innerText = total;
}
//add event listener to ok button
function getOkButton() {
    let okButton = document.getElementById("ok-button");
    okButton.addEventListener("click", hideSummary);
    okButton.addEventListener("click", reloadPage);
}
getOkButton();
//displays summary page
function showSummary() {
    summaryPage.style.display = "block";
}
//addd items ordered to summary page
let main = document.getElementsByClassName("summary-main")[0];
function addToSummary() {
    let nameInput = document.getElementById("input_name").value;
    let buyer = document.getElementById("customer_name")
    buyer.innerHTML = nameInput;
    buyer.style.color = "#1db096";
    let cartItems = document.getElementsByClassName("form-header")[0];
    let presentSib = cartItems.firstElementChild;
    let presentSibClassName = "";
        let serialNumber = 0;
        let item = "";
        let quantity = "";
    while(presentSib) {
        let row = document.createElement("div");
        row.className = "summarized-items"
        if(presentSibClassName == "serial-num"){
            serialNumber = serialNumber + 1
            presentSib.innerHTML;
        }
        else if(presentSibClassName == "item-title") {
            item = presentSib.innerHTML;
        }
        else if(presentSibClassName == "quantity-small-screen"){
            quantity = presentSib.innerHTML;
        }
        else if(presentSibClassName == "remove-btn"){
            main.append(row);
        }
        row.innerHTML = `<li id="number">${serialNumber}</li>
                         <li id="item-summary">${item}</li>
                         <li id="quantity-summary">${quantity}</li>`                
        presentSib = presentSib.nextElementSibling;
        presentSibClassName = presentSib.className;
    }
}

function reloadPage() {
    window.location.reload();
}
//payment for goods
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);
function payWithPaystack(e) {
  e.preventDefault();
  let handler = PaystackPop.setup({
    key: 'pk_test_2828353ba6f2a33b6134a2a62293fbabe6156b5b', // Replace with your public key
    email: document.getElementById("email").value,
    amount: document.getElementById("amount").innerText * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
        showSummary();
        addToSummary();
    }
  });
  handler.openIframe();
}