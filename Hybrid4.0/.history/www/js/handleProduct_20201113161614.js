var handleProduct={
    addProduct: function(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter){
        handleDatabase.db.transaction(
            function(tx){
                tx.executeSql(
                    "insert into product(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [resName, resType, "dateVisit", "avgPrice", "serRate", "cleanRate", "foodRate", "notes", "reporter"],
                    function(tx, results){},
                    function(tx, error){
                        console.log("add product error: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
    },
    loadProducts: function(displayProducts){
        handleDatabase.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "select * from product",
                    [],
                    function(tx, results){
                        displayProducts(results);
                    },
                    function(tx, error){
                        console.log("Error while selecting the products" + error.message);
                    }
                );
            }
        );
    },
    deleteProduct:function(_id){
        handleDatabase.db.transaction(
            function(tx){
                tx.executeSql(
                    "delete from product where _id = ?",
                    [_id],
                    function(tx, results){},
                    function(tx, error){
                        console.log("Error happen when deleting: " + error.message);
                    }
                );
            }
        );
    },
    updateProduct: function(_id, newName, newQuantity){
        handleDatabase.db.transaction(
            function(tx){
                tx.executeSql(
                    "update product set resName = ?, resType = ?, dateVisit = ?, avgPrice = ?, serRate = ?, cleanRate = ?, foodRate = ?, notes = ?, reporter = ? where _id = ?",
                    [newResName, newResType, "newDateVisit", "newAvgPrice", "newSerRate", "newCleanRate", "newFoodRate", "newNotes", "newReporter", _id],
                    function(tx, result){},
                    function(tx, error){
                        console.log("Error updating product" + error.message);
                    }
                );
            }
        );
    }
    };