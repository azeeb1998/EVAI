function addRow() {
    var xData = document.getElementById("x_data");
    var yData = document.getElementById("y_data");
    var table = document.getElementById("myTableData");
  
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
  
    row.insertCell(0).innerHTML =
      '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML = xData.value;
    row.insertCell(2).innerHTML = yData.value;
    data_x.push(Number(xData.value));
    data_y.push(Number(yData.value));
  }
  
  function deleteRow(obj) {
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    data_x.splice(index - 1, 1);
    data_y.splice(index - 1, 1);
    table.deleteRow(index);
  }
  
  function addTable() {
    var myTableDiv = document.getElementById("myDynamicTable");
  
    var table = document.createElement("TABLE");
    table.border = "1";
  
    var tableBody = document.createElement("TBODY");
    table.appendChild(tableBody);
  
    for (var i = 0; i < 3; i++) {
      var tr = document.createElement("TR");
      tableBody.appendChild(tr);
  
      for (var j = 0; j < 4; j++) {
        var td = document.createElement("TD");
        td.width = "75";
        td.appendChild(document.createTextNode("Cell " + i + "," + j));
        tr.appendChild(td);
      }
    }
    myTableDiv.appendChild(table);
  }
  
  var data_x = [];
  var data_y = [];
  
  var cubic = function (params, x) {
    return params[0] * x * x * x + params[1] * x * x + params[2] * x + params[3];
  };
  
  var objective = function (params) {
    // console.log("objective 2");
    var total = 0.0;
    for (var i = 0; i < data_x.length; ++i) {
      var resultThisDatum = cubic(params, data_x[i]);
      var delta = resultThisDatum - data_y[i];
      total += delta * delta;
    }
    return total;
  };
  function curvefit() {
  var initial = [1, 1, 1, 1];
  
  //first fun call from here
  var minimiser = numeric.uncmin(objective, initial);
  
  console.log("initial:");
  for (var j = 0; j < initial.length; ++j) {
    console.log(initial[j]);
  }
  
  
    var minimiser = numeric.uncmin(objective, initial);
  
    var result = "";
    console.log("minimiser:");
    for (var j = 0; j < minimiser.solution.length; ++j) {
      result += "<li>" + minimiser.solution[j];
    }
    document.getElementById("answer").innerHTML = result;
  }