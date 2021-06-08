$(document).on("ready", function(){
    handleDatabase.createDatabase();
});
function addProduct(){
    var resName = $("#resName").val();
    var resType = $("#resType").val();
    var dateVisit = $("#dateVisit").val();
    var avgPrice = $("#avgPrice").val();
    var serRate = $("#serRate").val();
    var cleanRate = $("#cleanRate").val();
    var foodRate = $("#foodRate").val();
    var notes = $("#notes").val();
    var reporter = $("#reporter").val();

    if(!resName){
        alert("Name is required");
    }else{
        var r = confirm(resName + " " + resType + " " + dateVisit + " " + avgPrice + " " + serRate + " " + cleanRate + " " + foodRate + " " + notes + " " + reporter);
        if(r==true){
            handleProduct.addProduct(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter);
            $("#resName").val("");
            $("#resType").val("");
            $("#dateVisit").val("");
            $("#serRate").val("");
            $("#cleanRate").val("");
            $("#foodRate").val("");
            $("#notes").val("");
            $("#reporter").val("");
        }
    }
}
var currentProduct={
id: -1,
resName: "",
resType:-1,
}
function displayProducts(results){
    var resultLength = results.rows.length;
    var ratingList = $("#ratingList");
    ratingList.empty();
    for(var i = 0; i< resultLength; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var h3 = $("<h3 />").text("Restaurant name: ");
        var h4 = $("<h4 />").text("Restaurant type: ");
        var p = $("<p />").text("Id: ");
        var spanName = $("<span />").text(item.resName);
        spanName.attr("name", "resName");
        var spandQuantity = $("<span />").text(item.resType);
        spandQuantity.attr("name", "resType");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        h3.append(spanName);
        h4.append(spandQuantity);
        p.append(spanId);
        a.append(h3);
        a.append(h4);
        a.append(p);
        var li = $("<li/>");
        li.attr("data-filtertext", item.resName);
        li.append(a);
        ratingList.append(li);
    }
    ratingList.listview("refresh");
    ratingList.on("tap", "li", function(){
        currentProduct.id = $(this).find("[name='_id']").text();
        currentProduct.resName = $(this).find("[name='resName']").text();
        currentProduct.resType = $(this).find("[name='resType']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    handleProduct.loadProducts(displayProducts);
});

function deleteProduct(){
    var r = confirm("Delete rating\nRestaurant name: "+currentProduct.resName+
                    "\nRestaurant type: " + currentProduct.resType);
    if(r==true){
        handleProduct.deleteProduct(currentProduct.id);
        handleProduct.loadProducts(displayProducts);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#resName").val(currentProduct.resName);
    $("#resType").val(currentProduct.resType);
});

function updateProduct(){
    var newName = $("#newResName").val();
    var newType = $("#newResType").val();
    handleProduct.updateProduct(currentProduct.id, newName, newType);
    $("#updatedialog").dialog("close");
}