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
        var r = confirm("Please confirm the information:\nRestaurant Name: " + resName + "\nRestaurant Type: " + resType + "\nDate of the visit: " + dateVisit + "\nAverage price of the meal: " + avgPrice + "\nService Rating: " + serRate + "\nCleanliness Rating: " + cleanRate + "\nFood Rating: " + foodRate + "\nNotes: " + notes + "\nReporter: " + reporter);
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
            alert("successful added !");
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
        var h1 = $("<h1 />").text("Restaurant name: ");
        var h2 = $("<h1 />").text("Reporter: ");
        var p = $("<p />").text("Id: ");
        var spanResName = $("<span />").text(item.resName);
        spanResName.attr("name", "resName");
        var spanReporter = $("<span />").text(item.reporter);
        spanReporter.attr("name", "reporter");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        h1.append(spanResName);
        h2.append(spanReporter);
        p.append(spanId);
        a.append(h1);
        a.append(h2);
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
        currentProduct.reporter = $(this).find("[name='reporter']").text();
        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    handleProduct.loadProducts(displayProducts);
});

function deleteProduct(){
    var r = confirm("Delete rating\nRestaurant name: "+currentProduct.resName+
                    "\nReporter: " + currentProduct.reporter);
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