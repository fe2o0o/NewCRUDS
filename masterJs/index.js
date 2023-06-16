let productName = document.getElementById("productName");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let adds = document.getElementById("adds");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creatBtn = document.getElementById("create");
let deleteAll = document.getElementById("deleteAll");
let productContainer = [];




let mood = "add";
let upDateIndex;
let searchMood = "name";

if (localStorage.getItem("productsContain") != null) {
    productContainer = JSON.parse(localStorage.getItem("productsContain"));
    displayProducts();
}

function getTotal() {
    let p = Number(price.value);
    let t = Number(taxes.value);
    let a = Number(adds.value);
    let d = Number(discount.value);
    if (price.value != '' && taxes.value != '' && adds.value != '' && discount.value != '') {
        let result = (p + t + a) - d;
        total.innerHTML = result;
        total.classList.replace("bg-danger","bg-success")
        
    }
    else {
        total.innerHTML = " ";
        total.classList.replace("bg-success","bg-danger");
    }
}

price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
adds.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);


creatBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let product = {
        name: productName.value,
        price: price.value,
        taxes: taxes.value,
        adds: adds.value,
        discount: discount.value,
        total:total.innerText,
        count: count.value,
        category:category.value
    }
    if (mood == "add") {
        productContainer.push(product);
        displayProducts(productContainer);
        clearForm();
        localStorage.setItem("productsContain", JSON.stringify(productContainer));
        calcCount();
        total.classList.replace("bg-success", "bg-danger");
    } else {
        productContainer[upDateIndex] = product;
        displayProducts(productContainer);
        clearForm();
        localStorage.setItem("productsContain", JSON.stringify(productContainer));
        mood = "add";
        creatBtn.innerHTML = "CREATE";
        creatBtn.style.backgroundColor = "#421d92";
        total.classList.replace("bg-success", "bg-danger");
        calcCount();
    }
})

function displayProducts() {
    let cartona = '';
    for (let i = 0; i < productContainer.length; i++){
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].taxes}</td>
                <td>${productContainer[i].adds}</td>
                <td>${productContainer[i].discount}</td>
                <td>${productContainer[i].total}</td> 
                <td>${productContainer[i].count}</td> 
                <td>${productContainer[i].category}</td>
                <td>
                    <button id="update" onclick="upDateProduct(${i})" class="btn">UP DATE</button>
                    <button  id="delete" onclick="deleteProduct(${i})" class="btn">DELETE</button>
                </td>
            </tr>
        `;
    }
    document.getElementById("tabelBody").innerHTML = cartona;
    // console.log(productContainer);
}


function clearForm() {
    productName.value = "";
    price.value = "";
    taxes.value = "";
    adds.value = "";
    discount.value = "";
    total.innerHTML = " ";
    count.value = "";
    category.value = "";
}

function upDateProduct(index) {
    productName.value = productContainer[index].name;
    price.value = productContainer[index].price;
    taxes.value = productContainer[index].taxes;
    adds.value = productContainer[index].adds;
    discount.value = productContainer[index].discount;
    total.innerHTML = productContainer[index].total;
    count.value = productContainer[index].count;
    category.value = productContainer[index].category;
    creatBtn.innerHTML = "Up Date";
    creatBtn.style.backgroundColor = "#f0ad4e";
    mood = "update";
    upDateIndex = index;
    if (total.innerHTML != "") {
        total.classList.replace("bg-danger", "bg-success");
    }
}

function calcCount() {
    let allCount=0;
    for (let i = 0; i < productContainer.length; i++){
        allCount += +productContainer[i].count;
    }
    // console.log(allCount);
    document.getElementById("allCount").innerHTML=`( ${allCount} )`;
}


function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("productsContain", JSON.stringify(productContainer));
    displayProducts();
    calcCount();
}

window.onload = function () {
    calcCount();
}

deleteAll.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("popUp").classList.remove("d-none");
    document.querySelector("body").classList.add("overflow-hidden");
})


function deleteAllProducts() {
    productContainer.splice(0, productContainer.length);
    localStorage.setItem("productsContain", JSON.stringify(productContainer));
    displayProducts();
    calcCount();
    document.getElementById("popUp").classList.add("d-none");
    document.querySelector("body").classList.remove("overflow-hidden");
}


function cancelDelete() {
    document.getElementById("popUp").classList.add("d-none");
    document.querySelector("body").classList.remove("overflow-hidden");
}

document.getElementById("searchByName").addEventListener("click", function (e) {
    e.preventDefault();
});
document.getElementById("searchByCategory").addEventListener("click", function (e) {
    e.preventDefault();
});

function beforeSearch(id) {
    document.getElementById("searchLabel").innerHTML=id;
    if (id == "searchByName") {
        searchMood = "name";
    } else {
        searchMood="category"
    }
    document.getElementById("search").value = '';
     document.getElementById("search").focus();
    displayProducts();
}


function searchProducts(value) {
    let cartona = '';
    if (searchMood === "name") {
        for (let i = 0; i < productContainer.length; i++){
            if (productContainer[i].name.toLowerCase().includes(value.toLowerCase())) {
                cartona += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${productContainer[i].name}</td>
                        <td>${productContainer[i].price}</td>
                        <td>${productContainer[i].taxes}</td>
                        <td>${productContainer[i].adds}</td>
                        <td>${productContainer[i].discount}</td>
                        <td>${productContainer[i].total}</td> 
                        <td>${productContainer[i].count}</td> 
                        <td>${productContainer[i].category}</td>
                        <td>
                            <button id="update" onclick="upDateProduct(${i})" class="btn">UP DATE</button>
                            <button  id="delete" onclick="deleteProduct(${i})" class="btn">DELETE</button>
                        </td>
                    </tr>
                `;
            }
        }
    }
    else
    {
        for (let i = 0; i < productContainer.length; i++){
            if (productContainer[i].category.toLowerCase().includes(value.toLowerCase())) {
                cartona += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${productContainer[i].name}</td>
                        <td>${productContainer[i].price}</td>
                        <td>${productContainer[i].taxes}</td>
                        <td>${productContainer[i].adds}</td>
                        <td>${productContainer[i].discount}</td>
                        <td>${productContainer[i].total}</td> 
                        <td>${productContainer[i].count}</td> 
                        <td>${productContainer[i].category}</td>
                        <td>
                            <button id="update" onclick="upDateProduct(${i})" class="btn">UP DATE</button>
                            <button  id="delete" onclick="deleteProduct(${i})" class="btn">DELETE</button>
                        </td>
                    </tr>
                `;
            }
        }
    }

    document.getElementById("tabelBody").innerHTML = cartona;
}