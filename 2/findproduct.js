var productList = {
    "products": [
      {
        "handle": "ega-botconn",
        "id": 1,
        "title": "egaBotConn",
        "vendor": "EGANY",
        "tags": "platform__cross-platform, type__apps, doc__ega-botconn, demo__https://egany.com",
        "image": {
          "id": 11,
          "src": "https://picsum.photos/id/14/600"
        },
        "variants": [
          {
            "id": 111,
            "sku": "egabotconn",
            "price": "0",
            "compare_at_price": "0",
            "inventory_management": null,
            "inventory_policy": "deny",
            "inventory_quantity": 1
          }
        ]
      },
      {
        "handle": "ega-shop",
        "id": 2,
        "title": "egaShop",
        "vendor": "EGANY",
        "tags": "platform__haravan_sapo_cross-platform, type__apps, doc__ega-shop, demo__https://egany.com",
        "image": {
          "id": 22,
          "src": "https://picsum.photos/id/15/600"
        },
        "variants": [
          {
            "id": 222,
            "sku": "egashop",
            "price": "149000",
            "compare_at_price": "199000",
            "inventory_management": null,
            "inventory_policy": "deny",
            "inventory_quantity": 1
          }
        ]
      },
      {
        "handle": "ega-countdown",
        "id": 3,
        "title": "egaCountdown",
        "vendor": "EGANY",
        "tags": "platform__haravan_cross-platform, type__apps, doc__ega-countdown, demo__https://egany.com",
        "image": {
          "id": 33,
          "src": "https://picsum.photos/id/16/600"
        },
        "variants": [
          {
            "id": 333,
            "sku": "egabotconn",
            "price": "99000",
            "compare_at_price": "149000",
            "inventory_management": "manual",
            "inventory_policy": "allow",
            "inventory_quantity": 0
          }
        ]
      },
      {
        "handle": "ega-salebox",
        "id": 4,
        "title": "egaSaleBox",
        "vendor": "EGANY",
        "tags": "platform__haravan_cross-platform, type__apps, doc__ega-salebox, demo__https://egany.com",
        "image": {
          "id": 44,
          "src": "https://picsum.photos/id/14/600"
        },
        "variants": [
          {
            "id": 444,
            "sku": "egasalebox",
            "price": "99000",
            "compare_at_price": "149000",
            "inventory_management": "manual",
            "inventory_policy": "allow",
            "inventory_quantity": -1
          }
        ]
      },
      {
        "handle": "ega-cro",
        "id": 5,
        "title": "egaCRO",
        "vendor": "EGANY",
        "tags": "platform__haravan_cross-platform_sapo, type__apps, doc__ega-salebox, demo__https://egany.com",
        "image": {
          "id": 55,
          "src": "https://picsum.photos/id/14/600"
        },
        "variants": [
          {
            "id": 555,
            "sku": "egasalebox",
            "price": "99000",
            "compare_at_price": "149000",
            "inventory_management": null,
            "inventory_policy": "deny",
            "inventory_quantity": 10
          }
        ]
      }
    ]
}

// Event click button
var btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", function(event) {
    renderProductList(true);
}, false);

// Event ENTER key textbox
var txtSearch = document.getElementById("txt-search");
txtSearch.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btnSearch.click();
    }
});

function renderProductList(isSearchMode = false) {
    var tableProduct = document.getElementById("product-list");
    var htmlText = "";
    var products = productList.products;
    var txtSearch = document.getElementById("txt-search");
    if (isSearchMode && txtSearch.value) {
        products = products.filter(filterProductName)
    }
    for(let idx = 0; idx < products.length; idx++) {
        var item = products[idx];
        var variant = item.variants[0];
        var tr = `<tr id=${item.id}>
                <td scope='row'><img src='${item.image?.src}' class='img-thumbnail'/></td>
                <td scope='row'>${item.title}</td>
                <td scope='row'>${variant.compare_at_price} & ${variant.price}</td>
                <td scope='row'>${percentagePrice(variant.price, variant.compare_at_price)}</td>
                <td scope='row'>${handleSWarehouseStatus(variant)}</td>
                </tr>`;
        htmlText += tr;
    }
    tableProduct.innerHTML = htmlText;
}

function handleSWarehouseStatus(variant) {
    var inventoryQuantity = variant.inventory_quantity; 
    var inventoryManagement = variant.inventory_management; 
    var inventoryPolicy = variant.inventory_policy; 
    
    // Allow order unlimited quantity
    var isInStock = !inventoryManagement && inventoryQuantity > 0;

    // Allow order when out of stock
    var isAllowOrder = inventoryQuantity < 1 && inventoryPolicy === 'allow';

    var status = isInStock ? `${inventoryQuantity}` : isAllowOrder ? "Allow order" : "Hết hàng"
    return status;
}
function filterProductName(product) {
    var txtSearch = document.getElementById("txt-search");
    return product.title.normalize() === txtSearch.value.normalize();
}

function percentagePrice(partialValue, totalValue) {
    if(totalValue === "0") return 0;
    return ((100 * partialValue) / totalValue).toFixed(2);
} 

renderProductList();