
var table = document.querySelector(".schedule-table tbody");
var tableData = document.querySelectorAll("td");
var rows = table.querySelectorAll("tr");
var colClassNum, currentRowNum;
var currentTarget;


for(var i = 0; i < tableData.length; i++){

    tableData[i].contentEditable = "true";
}
//add columns




function addColumnEnd(){


//handle inputs
 var rows = document.querySelectorAll(".schedule-table tbody tr");
 var rowstoArray = Array.from(rows);


rowstoArray.forEach(function(element){
      var newdata =   document.createElement("td");
       newdata.contentEditable = "true";
       newdata.classList.add("col_" + colClassNum);
       element.appendChild(newdata);
       refactorColNums();

});

}

function addColumnRight(){


//handle inputs
 var rows = document.querySelectorAll(".col_" + colClassNum);
 var rowstoArray = Array.from(rows);


rowstoArray.forEach(function(element){
      var newdata =   document.createElement("td");
      newdata.contentEditable = "true";
      newdata.classList.add("col" + (colClassNum+1));
    element.after(newdata);
    refactorColNums();
});
//TODO cycle through remaining classes and change column number

}


function addColumnLeft(){


//handle inputs
 var column = document.querySelectorAll(".col_" + colClassNum);
 var columntoArray = Array.from(column);


columntoArray.forEach(function(element){
      var newdata =   document.createElement("td");
      newdata.contentEditable = "true";
      newdata.classList.add("col" + (colClassNum-1));
    element.before(newdata);

});
refactorColNums();
  //TODO cycle through remaining classes and change column number

}




function removeColumnEnd(){

 var rows = document.querySelectorAll(".schedule-table tbody tr");
 var rowstoArray = Array.from(rows);


rowstoArray.forEach(function(element){
  console.log(element.lastElementChild);
    element.removeChild(element.lastElementChild);
});

}

function removeColumn(){

 var rows = document.querySelectorAll(".schedule-table tbody tr");
 var rowstoArray = Array.from(rows);


rowstoArray.forEach(function(element){

    var rowChildren = element.childNodes;
    for(var i = 0; i < rowChildren.length; i++){
      if(rowChildren[i].nodeType === 1){
        var classStr = rowChildren[i].classList;

        if(classStr.contains("col_" + colClassNum)){
          rowChildren[i].remove();
         }
      }

    }
    refactorColNums();

    console.log(rowChildren);

});

}





function addRowBelow(){
  var newRow = document.createElement("tr");
  newRow.classList.add("row_"+(currentRowNum+1));
  var currentRow = document.querySelector("tr");
  var currentRowChildren = currentRow.childNodes;
  for(var i = 0; i < currentRowChildren.length; i++){
      if(currentRowChildren[i].nodeType === 1){
        var newTd = document.createElement("td");
        newTd.contentEditable = "true";
        newTd.classList.add("col_" + i);
        newRow.appendChild(newTd);
      }


  }
  var targetRow = document.querySelector(".row_" + currentRowNum);
  targetRow.after(newRow);
  refactorRowNums();


}

function addRowAbove(){
  var newRow = document.createElement("tr");
  newRow.classList.add("row_"+(currentRowNum-1));
  var currentRow = document.querySelector("tr");
  var currentRowChildren = currentRow.childNodes;
  for(var i = 0; i < currentRowChildren.length; i++){
      if(currentRowChildren[i].nodeType === 1){
        var newTd = document.createElement("td");
        newTd.contentEditable = "true";
        newTd.classList.add("col_" + i);
        newRow.appendChild(newTd);
      }


  }
  var targetRow = document.querySelector(".row_" + currentRowNum);
  targetRow.before(newRow);
  refactorRowNums();

}

function removeRow(){
    var delRowTarget = document.querySelector(".row_"+ currentRowNum);
    delRowTarget.remove();
    refactorRowNums();

}







function refactorColNums(){

  var dataCount = 0;

 //handle inputs
  var rows = document.querySelectorAll(".schedule-table tbody tr");
  var rowstoArray = Array.from(rows);

  rowstoArray.forEach(function(element){
    var rowData = element.childNodes;
    dataCount = 0; //keep track of data class numbers

        //node list for each loop won't work and used i to calculate new col numbers
        for(var i = 0; i < rowData.length; i++){
          if(rowData[i].nodeType === 1){
            rowData[i].classList.replace(rowData[i].classList,"col_" + dataCount);
            dataCount++;

          }
        }

    });
}

function refactorRowNums(){
 var rows = document.querySelectorAll("tr");
 var rowsLength = rows.length;
 for(var i = 0; i < rowsLength; i++){
   if(rows[i].nodeType === 1){ //make sure node is an element
        rows[i].classList.replace(rows[i].classList, "row_" + i);
   }

 }
}

//hides menu onclick if dropdown is open
document.querySelector(".schedule-table").addEventListener("click", function(e){
  document.querySelector(".hidden-menu").classList.add("hide");
  var currentCol = e.target.className; //column
  colClassNum = parseInt(currentCol.slice(4));
  var currentRowStr = e.target.parentNode.className; //row
  currentRowNum = parseInt(currentRowStr.slice(4));
  currentTarget = e.target;
});

if (document.addEventListener) { // IE >= 9; other browsers
    document.querySelector(".schedule-table").addEventListener('contextmenu', function(e) {
        document.querySelector(".drop-menu-div").classList.add("show");
        document.querySelector(".hidden-menu").classList.remove("hide");
        document.querySelector(".drop-menu-div").style.top =  e.pageY + 'px';
        document.querySelector(".drop-menu-div").style.left = e.pageX + 'px';
        var currentCol = e.target.className; //column
        colClassNum = parseInt(currentCol.slice(4));
        var currentRowStr = e.target.parentNode.className; //row
        currentRowNum = parseInt(currentRowStr.slice(4));
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

document.addEventListener("keydown", function(e){
  var currentCol = e.target.className; //column
  colClassNum = parseInt(currentCol.slice(4));
  var currentRowStr = e.target.parentNode.className; //row
  currentRowNum = parseInt(currentRowStr.slice(4));

  console.log(e.keyCode);


  var tablerow = document.querySelectorAll("tr");
  var tableColumn = document.querySelector(".row_0").children;

  if(e.keyCode === 38){
    if(currentRowNum > 0){
      currentTarget = document.querySelector(".row_" + (currentRowNum-1) + " .col_" + colClassNum);
      currentTarget.focus();
    }


  }
  //down arrow
  if(e.keyCode === 40){
    if(currentRowNum < (tablerow.length -1)){
        currentTarget = document.querySelector(".row_" + (currentRowNum+1) + " .col_" + colClassNum);
        currentTarget.focus();
    }

  }
  //left arrow
  if(e.keyCode === 37){
    if(colClassNum > 0){
      currentTarget = document.querySelector(".row_" + (currentRowNum) + " .col_" + (colClassNum-1));
      currentTarget.focus();
    }

  }
  //right arrow
  if(e.keyCode === 39){
    if(colClassNum < (tableColumn.length -1)){
          currentTarget = document.querySelector(".row_" + (currentRowNum) + " .col_" + (colClassNum+1));
          currentTarget.focus();

    }

  }
  //b for bold text

  if(e.ctrlKey && e.keyCode === 66){
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('bold');
  }
  if(e.ctrlKey && e.keyCode === 73){
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('italic');
  }
  if(e.ctrlKey && e.keyCode === 85){
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('underline');
  }
  if(e.shiftKey && e.keyCode === 69){
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('justifyCenter',true,null);
  }
  if(e.shiftKey && e.keyCode === 76){
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('justifyLeft',false,null);
  }
  if(e.shiftKey && e.keyCode === 82){
    e.preventDefault();
    e.stopPropagation();
    document.execCommand('justifyRight',true,null);
  }

});


function boldText(){
   document.execCommand('bold');
   currentTarget.focus();
}
function italicText(){
   document.execCommand('italic');
   currentTarget.focus();
}
function underlineText(){
   document.execCommand('underline');
   currentTarget.focus();
}
function justifyRight(){
    document.execCommand('justifyRight');
   currentTarget.focus();
}
function justifyLeft(){
   document.execCommand('justifyLeft');
   currentTarget.focus();
}
function justifyCenter(){
   document.execCommand('justifyCenter');
   currentTarget.focus();
}

function setHighlightColor(highColor){
  currentTarget.focus();
   document.execCommand('hilitecolor',false,highColor);
}
function setfontColor(fontColor){
  currentTarget.focus();
   document.execCommand('foreColor',false,fontColor);

}


function setCellColor(bgcolor){
  currentTarget.focus();
   currentTarget.style.backgroundColor = bgcolor;
}
