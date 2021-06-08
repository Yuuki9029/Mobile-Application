var handleDatabase = {
    db: null,
    createDatabase: function(){
        this.db = window.openDatabase(
            "rating.db",
            "1.0",
            "rating database",
            5*1024*1024);
        this.db.transaction(
            function(tx){
                tx.executeSql(
                    "create table if not exists product(_id integer primary key, resName text, resType text, dateVisit date, avgPrice integer, serRate integer, cleanRate integer, foodRate integer, notes text, reporter text)",
                    [],
                    function(tx, results){},
                    function(tx, error){
                        console.log("Error while creating the table: " + error.message);
                    }
                );
            },
            function(error){
                console.log("Transaction error: " + error.message);
            },
            function(){
                console.log("Create DB transaction completed successfully");
            }
        );
    
    }
}