$(document).on("ready", function(){
    Database.createDatabase();
});
function addRating(){
    var resName = $("#Name").val();
    var resType = $("#Type").val();
    var dateVisit = $("#date").val();
    var avgPrice = $("#avgPrice").val();
    var serRate = $("#serRateInput").val();
    var cleanRate = $("#cleanRate").val();
    var foodRate = $("#foodRate").val();
    var notes = $("#notes").val();
    var reporter = $("#reporter").val();
    var year = dateVisit.split("-")[0];
    var month = dateVisit.split("-")[1];
    var date = dateVisit.split("-")[2];
    var regex = new RegExp("^[A-Za-z0-9 ]+$","i");

    
    if(!resName){
        alert("Restaurant Name Empty !");
    }else if(!regex.test(resName)){
        alert("Restaurant Name contains invalid characters !");
    }else if(!resType){
        alert("Restaurant Type Empty !");
    }else if(!dateVisit){
        alert("Date of the Empty !");
    }else if(!avgPrice){
        alert("Average price Empty !");
    }else if(avgPrice <= 0){
        alert("Average price is invalid !");
    }else if(!serRate){
        alert("Service rating Empty !");
    }else if(!cleanRate){
        alert("Cleanliness rating Empty !");
    }else if(!foodRate){
        alert("Food rating Empty !");
    }else if(!regex.test(notes) && notes.length > 0){
        alert("Note have invalid characters !");
    }else if(!reporter){
        alert("Reporter Empty !");
    }else if(!regex.test(reporter)){
        alert("Reproter contains invalid characters !");
    }else{
        var r = confirm("Please confirm the information:\nRestaurant Name: " + resName + "\nRestaurant Type: " + resType + "\nDate of the visit: " + date + "/" + month + "/" +  year + "\nAverage price of the meal: " + avgPrice + "\nService Rating: " + serRate + "\nCleanliness Rating: " + cleanRate + "\nFood Rating: " + foodRate + "\nNotes: " + notes + "\nReporter: " + reporter);
        if(r==true){
            handleRating.addRating(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter);
            $("#Name").val("");
            $("#Type").val("");
            $("#date").val("");
            $("#avgPrice").val("");
            $("#serRateInput").val("");
            $("#cleanRate").val("");
            $("#foodRate").val("");
            $("#notes").val("");
            $("#reporter").val("");
            alert("successful added !");
        }
    }
}


var currentRating={
id: -1,
resName: "",
resType: "",
dateVisit: Date.now(),
avgPrice: 0,
serRate: 0,
cleanRate: 0,
foodRate: 0,
notes: "",
reporter: ""
}
function displayRating(results){
    var resultLength = results.rows.length;
    var ratingList = $("#ratingList");
    ratingList.empty();
    for(var i = 0; i< resultLength; i++){
        var item = results.rows.item(i);
        var a = $("<a />");
        var p = $("<p />").text("Id: ");
        var h1 = $("<h3 />").text("Restaurant name: ");
        var h2 = $("<h3 />").text("Reporter: ");
        var h3 = $("<h3 />").text("Date Visit: ");
        var h4 = $("<h4 />").text("");
        var h5 = $("<h5 />").text("Notes: ");
        var spanId = $("<span />").text(item._id);
        spanId.attr("name", "_id");
        var spanName = $("<span />").text(item.resName);
        spanName.attr("name", "resName");
        var spanReporter = $("<span />").text(item.reporter);
        spanReporter.attr("name", "reporter");
        var spanDate = $("<span />").text(item.dateVisit);
        spanDate.attr("name", "dateVisit");
        var spanPrice = $("<span />").text(item.avgPrice);
        spanPrice.attr("name", "avgPrice");
        var spanSer = $("<span />").text(item.serRate);
        spanSer.attr("name", "serRate");
        var spanClean = $("<span />").text(item.cleanRate);
        spanClean.attr("name", "cleanRate");
        var spanFood = $("<span />").text(item.foodRate);
        spanFood.attr("name", "foodRate");
        var spanNotes = $("<span />").text(item.notes);
        spanNotes.attr("name", "notes");
        var spanType = $("<span />").text(item.resType);
        spanType.attr("name", "resType");
        p.append(spanId);
        h1.append(spanName);
        h2.append(spanReporter);
        h3.append(spanDate);
        h4.append(spanPrice);
        h4.append(spanSer);
        h4.append(spanClean);
        h4.append(spanFood);
        h5.append(spanNotes);
        h4.append(spanType);
        a.append(p);
        a.append(h1);
        a.append(h2);
        a.append(h3);
        a.append(h4);
        a.append(h5);
        var li = $("<li/>");
        li.append(a);
        ratingList.append(li);
    }
    console.log(item);
    console.log(currentRating);
    ratingList.listview("refresh");
    ratingList.on("tap", "li", function(){
        currentRating.id = $(this).find("[name='_id']").text();
        currentRating.resName = $(this).find("[name='resName']").text();
        currentRating.reporter = $(this).find("[name='reporter']").text();
        currentRating.resType = $(this).find("[name='resType']").text();
        currentRating.dateVisit = $(this).find("[name='dateVisit']").text();
        currentRating.avgPrice = $(this).find("[name='avgPrice']").text();
        
        currentRating.serRate = $(this).find("[name='serRate']").text();
        currentRating.foodRate = $(this).find("[name='foodRate']").text();
        currentRating.cleanRate = $(this).find("[name='cleanRate']").text();
        currentRating.notes = $(this).find("[name='notes']").text();
        currentRating.reporter = $(this).find("[name='reporter']").text();
        $("#popupUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadpage", function(){
    handleRating.loadRating(displayRating);
});

function deleteRating(){
    var r = confirm("Delete rating\nRestaurant name: "+currentRating.resName+
                    "\nReporter: " + currentRating.reporter);
    if(r==true){
        handleRating.deleteRating(currentRating.id);
        handleRating.loadRating(displayRating);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#newAvgPriceInput").val(currentRating.avgPrice);
    $("#newSerRateInput").val(currentRating.serRate);
    $("#newCleanRateInput").val(currentRating.cleanRate);
    $("#newFoodRateInput").val(currentRating.foodRate);
    $("#newNotesInput").val(currentRating.notes);
});

function updateRating(){
    var newAvgPrice = $("#newAvgPrice").val();
    var newSerRate = $("#newSerRate").val();
    var newCleanRate = $("#newCleanRate").val();
    var newFoodRate = $("#newFoodRate").val();
    var newNotes = $("#newNotes").val();
    handleRating.updateRating(currentRating.id, newAvgPrice, newSerRate, newCleanRate, newFoodRate, newNotes);
    $("#updatedialog").dialog("close");
}