$(document).on("ready", function(){
    handleDatabase.createDatabase();
});
function addProduct(){
    var resName = $("#resNameInput").val();
    var resType = $("#resTypeInput").val();
    var dateVisit = $("#dateVisitInput").val();
    var avgPrice = $("#avgPriceInput").val();
    var serRate = $("#serRateInput").val();
    var cleanRate = $("#cleanRateInput").val();
    var foodRate = $("#foodRateInput").val();
    var notes = $("#notesInput").val();
    var reporter = $("#reporterInput").val();

    if(!resName){
        alert("Restaurant Name is required");
    }else{
        var r = confirm(resName + " " + resType + " " + dateVisit + " " + avgPrice + " " + serRate + " " + cleanRate + " " + foodRate + " " + notes + " " + reporter);
        if(r==true){
            handleProduct.addProduct(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter);
            $("#resNameInput").val("");
            $("#resTypeInput").val("");
            $("#dateVisitInput").val("");
            $("#avgPriceInput").val("");
            $("#serRateInput").val("");
            $("#cleanRateInput").val("");
            $("#foodRateInput").val("");
            $("#notesInput").val("");
            $("#reporterInput").val("");
        }
    }
}
var currentProduct={
id: -1,
resName: "",
resType: "",
dateVisit: "",
avgPrice: "",
serRate: "",
cleanRate: "",
foodRate: "",
notes: "",
reporter: ""
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
        console.log(item);
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
    $("#resNameInput").val(currentProduct.resName);
    $("#resTypeInput").val(currentProduct.resType);
    $("#dateVisitInput").val(currentProduct.dateVisit);
    $("#avgPriceInput").val(currentProduct.avgPrice);
    $("#serRateInput").val(currentProduct.serRate);
    $("#cleanRateInput").val(currentProduct.cleanRate);
    $("#foodRateInput").val(currentProduct.foodRate);
    $("#notesInput").val(currentProduct.notes);
    $("#reporterInput").val(currentProduct.reporter);
});

function updateProduct(){
    var newResName = $("#newResNameInput").val();
    var newRresType = $("#newResTypeInput").val();
    var newDateVisit = $("#newDateVisitInput").val();
    var newAvgPrice = $("#newAvgPriceInput").val();
    var newSerRate = $("#newSerRateInput").val();
    var newCleanRate = $("#newCleanRateInput").val();
    var newFoodRate = $("#newFoodRateInput").val();
    var newNotes = $("#newNotesInput").val();
    var newReporter = $("#newReporterInput").val();
    handleProduct.updateProduct(currentProduct.id, newResName, newRresType, newDateVisit, newAvgPrice, newSerRate, newCleanRate, newFoodRate, newNotes, newReporter);
    $("#updatedialog").dialog("close");
}