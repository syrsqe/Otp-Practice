var table = document.querySelector(".schedule-table tbody");
var tableData = document.querySelectorAll("td");
var rows = table.querySelectorAll("tr");
for(i = 0; i < tableData.length; i++){

    tableData[i].contentEditable = "true";
}
function addRow(){
 var dupNode = document.querySelector(".copy-target").cloneNode(true);
  table.appendChild(dupNode);
}

function removeRow(){
  childRemove = table.lastElementChild;
  table.removeChild(childRemove);
  // var i = 0;
  // while(i < rows.length){
  //   i++;
  // }
  // table.removeChild(rows[i]);
}
