(function () {
    var myConnector = tableau.makeConnector();
    var search = JSON.stringify({
        "criteria": {
           "advanced_text_search": {
              "operator": "and",
              "search_text": "furin",
              "search_field": "abstracttext"
           }
        },
        "offset": 0,
        "limit": 500,
        "sortField": "award_amount",
        "sortOrder": "desc"
      });
    console.log(search);

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "ApplId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ProjectTitle",
            alias: "projectTitle",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "AbstractText",
            alias: "abstractText",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Terms",
            dataType: tableau.dataTypeEnum.string
        }];
    
        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
// with  XMLHttpRequest
//     myConnector.getData = function(table, doneCallback) {
//         var request = new XMLHttpRequest();
//         request.onreadystatechange= function () {
//             if (request.readyState==4 ) {
//                 console.log(this.responseText); 
//                 console.log("hello");
//             }
//         }
//         request.open("POST", "https://api.reporter.nih.gov/v2/projects/search", true);
//         request.setRequestHeader("Content-Type", "application/json");
//         request.setRequestHeader("Accept","application/json");
//         request.send(search);
//         doneCallback();
// }
// // with jquery
//     myConnector.getData = function(table, doneCallback) {
//         $.post("https://api.reporter.nih.gov/v2/projects/search", search, function(resp) {
//             var feat = resp,
//                 tableData = [];
//             tableau.log("here")
//             // Iterate over the JSON object
//             for (var i = 0, len = feat.length; i < len; i++) {
//                 tableau.log(feat[i].ApplId);
//                 tableData.push({
//                     "ApplId": feat[i].ApplId,
//                     "ProjectTitle": feat[i].ProjectTitle,
//                     "AbstractText": feat[i].AbstractText,
//                     "Terms": feat[i].Terms
//                 });
//             }
    
//             table.appendRows(tableData);
//             doneCallback();
//         });
//     };

// with ajax

myConnector.getData = function(table, doneCallback) {
    $.ajax({
        url: 'https://api.reporter.nih.gov/v2/projects/search',
        type: 'POST',
        data: {
                "criteria": {
                   "advanced_text_search": {
                      "operator": "and",
                      "search_text": "furin",
                      "search_field": "abstracttext"
                   }
                },
                "offset": 0,
                "limit": 500,
                "sortField": "award_amount",
                "sortOrder": "desc"
        },
        headers: {
            "Content-Type": "application/json",   //If your header name has spaces or any other char not appropriate
            "Accept": "application/json"  //for object property name, use quoted notation shown in second
        },
        dataType: 'json',
        success: function (data) {
            console.info(data);
        }
    });
    doneCallback();
};
    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});