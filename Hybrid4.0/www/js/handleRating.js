var handleRating={
    addRating: function(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter){
        Database.db.transaction(
            function(tx){
                tx.executeSql(
                    "insert into product(resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [resName, resType, dateVisit, avgPrice, serRate, cleanRate, foodRate, notes, reporter],
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
    loadRating: function(displayRating){
        Database.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "select * from product",
                    [],
                    function(tx, results){
                        displayRating(results);
                    },
                    function(tx, error){
                        console.log("Error while selecting the products" + error.message);
                    }
                );
            }
        );
    },
    deleteRating:function(_id){
        Database.db.transaction(
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
    updateRating: function(_id, newAvgPrice, newSerRate, newCleanRate, newFoodRate, newNotes){
        Database.db.transaction(
            function(tx){
                tx.executeSql(
                    "update product set avgPrice = ?, serRate = ?, cleanRate = ?, foodRate = ?, notes = ? where _id = ?",
                    [newAvgPrice, newSerRate, newCleanRate, newFoodRate, newNotes, _id],
                    function(tx, result){},
                    function(tx, error){
                        console.log("Error updating rating" + error.message);
                    }
                );
            }
        );
    }
    };