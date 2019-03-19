var table = document.querySelector(".schedule-table tbody");
var tableData = document.querySelectorAll("td");
var rows = table.querySelectorAll("tr");
var colClassNum, currentRowNum;
var currentTarget;


for (var i = 0; i < tableData.length; i++) {

  tableData[i].contentEditable = "true";
}
//add columns




function addColumnEnd() {


  //handle inputs
  var rows = document.querySelectorAll(".schedule-table tbody tr");
  var rowstoArray = Array.from(rows);


  rowstoArray.forEach(function(element) {
    var newdata = document.createElement("td");
    newdata.contentEditable = "true";
    element.appendChild(newdata);

  });

}

function addColumnRight() {


  //handle inputs
  var rows = document.querySelector(".schedule-table").rows;
  //console.log(rows);
  var rowstoArray = Array.from(rows);

  var selectedColumns = [];

  rowstoArray.forEach(function(element) {
    selectedColumns.push(element.cells[colClassNum]);

  });
  selectedColumns.forEach(function(element){
    var newdata = document.createElement("td");
    newdata.contentEditable = "true";
    element.after(newdata);
  });
  //TODO cycle through remaining classes and change column number

}


function addColumnLeft() {

  var rows = document.querySelector(".schedule-table").rows;
  //console.log(rows);
  var rowstoArray = Array.from(rows);

  var selectedColumns = [];

  rowstoArray.forEach(function(element) {
    selectedColumns.push(element.cells[colClassNum]);

  });
  selectedColumns.forEach(function(element){
    var newdata = document.createElement("td");
    newdata.contentEditable = "true";
    element.before(newdata);
  });

}




function removeColumnEnd() {

  var rows = document.querySelectorAll(".schedule-table tbody tr");
  var rowstoArray = Array.from(rows);


  rowstoArray.forEach(function(element) {
    element.removeChild(element.lastElementChild);
  });

}

function removeColumn() {

  var rows = document.querySelector(".schedule-table").rows;
  var rowstoArray = Array.from(rows);


  rowstoArray.forEach(function(element) {

    var rowChildren = element.childNodes;
    var i = 0;
    var nodeCount = 0;
    while(i < rowChildren.length) {
      if (rowChildren[i].nodeType === 1) { //make sure nodetype is td, not text
        // var classStr = rowChildren[i].classList;


        if (rowChildren[i].cellIndex === colClassNum) {
          console.log(i);
          //console.log(rowChildren[i].cellIndex);
           rowChildren[i].remove();
           break;
        }
      }
      i++;
    }

  });
    //refactorColNums();


}





function addRowBelow() {
  var newRow = document.createElement("tr");
  //newRow.classList.add("row_" + (currentRowNum + 1));
  var currentRow = document.querySelector("tr"); //row length
  var currentRowChildren = currentRow.childNodes;
  for (var i = 0; i < currentRowChildren.length; i++) {
    if (currentRowChildren[i].nodeType === 1) {
      var newTd = document.createElement("td");
      newTd.contentEditable = "true";
      // newTd.classList.add("col_" + i);
      newRow.appendChild(newTd);
    }


  }
  var targetRow = document.querySelector(".schedule-table").rows[currentRowNum]
  targetRow.after(newRow);
  refactorRowNames();


}

function addRowAbove() {
  var newRow = document.createElement("tr");
  // newRow.classList.add("row_" + (currentRowNum - 1));
  var currentRow = document.querySelector("tr");
  var currentRowChildren = currentRow.childNodes;
  for (var i = 0; i < currentRowChildren.length; i++) {
    if (currentRowChildren[i].nodeType === 1) {
      var newTd = document.createElement("td");
      newTd.contentEditable = "true";
      // newTd.classList.add("col_" + i);
      newRow.appendChild(newTd);
    }


  }
    var targetRow = document.querySelector(".schedule-table").rows[currentRowNum]
  targetRow.before(newRow);
  refactorRowNames();

}

function removeRow() {
  var delRowTarget = document.querySelector(".schedule-table").rows[currentRowNum]
  delRowTarget.remove();
  refactorRowNames();

}







function refactorColNums() {

  var dataCount = 0;

  //handle inputs
  var rows = document.querySelectorAll(".schedule-table tbody tr");
  var rowstoArray = Array.from(rows);

  rowstoArray.forEach(function(element) {
    var rowData = element.childNodes;
    dataCount = 0; //keep track of data class numbers

    //node list for each loop won't work and used i to calculate new col numbers
    for (var i = 0; i < rowData.length; i++) {
      if (rowData[i].nodeType === 1) {
        rowData[i].classList.replace(rowData[i].classList, "col_" + dataCount);
        dataCount++;

      }
    }

  });
}

function refactorRowNames() {
  var rows = document.querySelectorAll("tr");
  var rowsLength = rows.length;
  for (var i = 0; i < rowsLength; i++) {
    if (rows[i].nodeType === 1) { //make sure node is an element
      // rows[i].classList.replace(rows[i].classList, "row_" + i);
      rows[i].setAttribute("name", i);
    }

  }
}

//hides menu onclick if dropdown is open
document.querySelector(".schedule-table").addEventListener("click", function(e) {
  document.querySelector(".hidden-menu").classList.add("hide");
  var currentCol = e.target; //column
  colClassNum = currentCol.cellIndex;
      console.log(colClassNum);
    var currentRowStr = e.target.parentNode; //row
    currentRowNum = currentRowStr.rowIndex;
  currentTarget = e.target;
});

if (document.addEventListener) { // IE >= 9; other browsers
  document.querySelector(".schedule-table").addEventListener('contextmenu', function(e) {
    document.querySelector(".drop-menu-div").classList.add("show");
    document.querySelector(".hidden-menu").classList.remove("hide");
    document.querySelector(".drop-menu-div").style.top = e.pageY + 'px';
    document.querySelector(".drop-menu-div").style.left = e.pageX + 'px';
    var currentCol = e.target; //column
    colClassNum = currentCol.cellIndex;

    var currentRowStr = e.target.parentNode; //row
    currentRowNum = currentRowStr.rowIndex;
    currentTarget = e.target;
    //console.log(currentColNum);
    e.preventDefault();


  }, false); // bubbles which is default anyway
} else { // IE < 9
  document.querySelector(".schedule-table").attachEvent('oncontextmenu', function() {
    alert("You've tried to open context menu");
    window.event.returnValue = false;
  });
}

document.addEventListener("keydown", function(e) {
  var currentCol = e.target; //column
  colClassNum = currentCol.cellIndex;
  var currentRowStr = e.target.parentNode; //row
  currentRowNum = currentRowStr.rowIndex;

  // console.log(e.keyCode);


  var tablerow = document.querySelectorAll("tr");
  var tableColumn = document.querySelector(".row_0").children;

//up arrow
  if (e.keyCode === 38) {
    if (currentRowNum > 0) {
      // currentTarget = document.querySelector(".row_" + (currentRowNum - 1) + " .col_" + colClassNum);
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum-1].cells[colClassNum];
      currentTarget.focus();
    }


  }
  //down arrow
  if (e.keyCode === 40) {
    if (currentRowNum < (tablerow.length - 1)) {
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum+1].cells[colClassNum];
      currentTarget.focus();
    }

  }
  //left arrow
  if (e.keyCode === 37) {
    if (colClassNum > 0) {
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum].cells[colClassNum-1];
      currentTarget.focus();
    }

  }
  //right arrow
  if (e.keyCode === 39) {
    if (colClassNum < (tableColumn.length - 1)) {
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum].cells[colClassNum+1];
      currentTarget.focus();

    }

  }
  //b for bold text

  if (e.ctrlKey && e.keyCode === 66) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('bold');
  }
  if (e.ctrlKey && e.keyCode === 73) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('italic');
  }
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('underline');
  }
  if (e.shiftKey && e.keyCode === 69) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('justifyCenter', true, null);
  }
  if (e.shiftKey && e.keyCode === 76) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('justifyLeft', false, null);
  }
  if (e.shiftKey && e.keyCode === 82) {
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('justifyRight', true, null);
  }

});


function boldText() {
  document.execCommand('bold');
  currentTarget.focus();
}

function italicText() {
  document.execCommand('italic');
  currentTarget.focus();
}

function underlineText() {
  document.execCommand('underline');
  currentTarget.focus();
}

function justifyRight() {
  document.execCommand('justifyRight');
  currentTarget.focus();
}

function justifyLeft() {
  document.execCommand('justifyLeft');
  currentTarget.focus();
}

function justifyCenter() {
  document.execCommand('justifyCenter');
  currentTarget.focus();
}

function setHighlightColor(highColor) {
  currentTarget.focus();
  document.execCommand('hilitecolor', false, highColor);
}

function setfontColor(fontColor) {
  currentTarget.focus();
  document.execCommand('foreColor', false, fontColor);

}


function setCellColor(bgcolor) {
  currentTarget.focus();
  currentTarget.style.backgroundColor = bgcolor;
}
