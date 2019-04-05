var table = document.querySelector(".schedule-table tbody");
var tableData = document.querySelectorAll("td");
var rows = table.querySelectorAll("tr");
var colClassNum, currentRowNum;
var currentTarget;
var currentSchedule = document.querySelector(".carousel-item.active")
var schedules = [];
if (schedules.length === 0) {
  let loadedSchedules = document.querySelectorAll(".carousel-item");
  for (let i = 0; i < loadedSchedules.length; i++) {
    schedules.push(loadedSchedules[i]);
  }

}
//TODO: refactor RowNames upon row creation and row delection

for (let i = 0; i < tableData.length; i++) {
  tableData[i].contentEditable = "true";
}
//add columns




function addColumnEnd() {


  //handle inputs
  var rows = currentSchedule.querySelectorAll(".schedule-table tbody tr");
  var rowstoArray = Array.from(rows);


  rowstoArray.forEach(function(element) {
    var newdata = document.createElement("td");
    newdata.contentEditable = "true";
    element.appendChild(newdata);

  });

}

function addColumnRight() {


  //handle inputs
  var rows = currentSchedule.querySelector(".schedule-table").rows;
  //console.log(rows);
  var rowstoArray = Array.from(rows);

  var selectedColumns = [];

  rowstoArray.forEach(function(element) {
    selectedColumns.push(element.cells[colClassNum]);

  });
  selectedColumns.forEach(function(element) {
    var newdata = document.createElement("td");
    newdata.contentEditable = "true";
    element.after(newdata);
  });
  //TODO cycle through remaining classes and change column number

}


function addColumnLeft() {

  var rows = currentSchedule.querySelector(".schedule-table").rows;
  //console.log(rows);
  var rowstoArray = Array.from(rows);

  var selectedColumns = [];

  rowstoArray.forEach(function(element) {
    selectedColumns.push(element.cells[colClassNum]);

  });
  selectedColumns.forEach(function(element) {
    var newdata = document.createElement("td");
    newdata.contentEditable = "true";
    element.before(newdata);
  });

}




function removeColumnEnd() {

  var rows = currentSchedule.querySelectorAll(".schedule-table tbody tr");
  var rowstoArray = Array.from(rows);


  rowstoArray.forEach(function(element) {
    element.removeChild(element.lastElementChild);
  });

}

function removeColumn() {

  var rows = currentSchedule.querySelector(".schedule-table").rows;
  var rowstoArray = Array.from(rows);


  rowstoArray.forEach(function(element) {

    var rowChildren = element.childNodes;
    var i = 0;
    var nodeCount = 0;
    while (i < rowChildren.length) {
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
  var currentRow = currentSchedule.querySelector("tr"); //row length
  var currentRowChildren = currentRow.childNodes;
  for (var i = 0; i < currentRowChildren.length; i++) {
    if (currentRowChildren[i].nodeType === 1) {
      var newTd = document.createElement("td");
      newTd.contentEditable = "true";
      // newTd.classList.add("col_" + i);
      newRow.appendChild(newTd);
    }


  }

  var targetRow = currentSchedule.querySelector(".schedule-table").rows[currentRowNum]
  targetRow.after(newRow);
  refactorRowNames();


}

function addRowAbove() {
  var newRow = document.createElement("tr");
  // newRow.classList.add("row_" + (currentRowNum - 1));
  var currentRow = currentSchedule.querySelector("tr");
  var currentRowChildren = currentRow.childNodes;
  for (var i = 0; i < currentRowChildren.length; i++) {
    if (currentRowChildren[i].nodeType === 1) {
      var newTd = document.createElement("td");
      newTd.contentEditable = "true";
      // newTd.classList.add("col_" + i);
      newRow.appendChild(newTd);
    }


  }
  var targetRow = currentSchedule.querySelector(".schedule-table").rows[currentRowNum]
  targetRow.before(newRow);
  refactorRowNames();

}

function removeRow() {
  var delRowTarget = currentSchedule.querySelector(".schedule-table").rows[currentRowNum]
  delRowTarget.remove();
  refactorRowNames();

}







function refactorColNums() {

  var dataCount = 0;

  //handle inputs
  var rows = currentSchedule.querySelectorAll(".schedule-table tbody tr");
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
  var rows = currentSchedule.querySelectorAll("tr");
  var rowsLength = rows.length;
  for (var i = 0; i < rowsLength; i++) {
    if (rows[i].nodeType === 1) { //make sure node is an element
      // rows[i].classList.replace(rows[i].classList, "row_" + i);
      rows[i].setAttribute("name", i);
    }

  }
}

//hides menu onclick if dropdown is open
let loadedSchedules = document.querySelectorAll(".schedule-table");
let loadedSchedulesArray = Array.from(loadedSchedules);
loadedSchedulesArray.forEach(function(schedule) {
  schedule.addEventListener("click", function(e) {
    document.querySelector(".hidden-menu").classList.add("hide");
    var currentCol = e.target; //column
    colClassNum = currentCol.cellIndex;
    var currentRowStr = e.target.parentNode; //row
    currentRowNum = currentRowStr.rowIndex;
    currentTarget = e.target;
    currentSchedule = (e.target.parentNode.parentNode.parentNode.parentNode.parentNode);

  });
});

if (document.addEventListener) { // IE >= 9; other browsers

  let loadedSchedules = document.querySelectorAll(".carousel-item");
  let loadedSchedulesArray = Array.from(loadedSchedules);
  loadedSchedulesArray.forEach(function(shedule) {
    shedule.querySelector("table").addEventListener('contextmenu', function(e) {
      // document.querySelector(".schedule-table").addEventListener('contextmenu', function(e) {
      document.querySelector(".drop-menu-div").classList.add("show");
      document.querySelector(".hidden-menu").classList.remove("hide");
      document.querySelector(".drop-menu-div").style.top = e.pageY + 'px';
      document.querySelector(".drop-menu-div").style.left = e.pageX + 'px';
      var currentCol = e.target; //column
      colClassNum = currentCol.cellIndex;

      var currentRowStr = e.target.parentNode; //row
      currentRowNum = currentRowStr.rowIndex;
      currentTarget = e.target;
      currentSchedule = (e.target.parentNode.parentNode.parentNode.parentNode.parentNode);
      //console.log(currentColNum);
      e.preventDefault();


    }, false); // bubbles which is default anyway
  });
} else { // IE < 9
  document.querySelector(".schedule-table").attachEvent('oncontextmenu', function() {
    alert("You've tried to open context menu");
    window.event.returnValue = false;
  });
}


document.querySelector(".schedule-table").addEventListener("keydown", function(e) {
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
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum - 1].cells[colClassNum];
      currentTarget.focus();
    }


  }
  //down arrow
  if (e.keyCode === 40) {
    if (currentRowNum < (tablerow.length - 1)) {
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum + 1].cells[colClassNum];
      currentTarget.focus();
    }

  }
  //left arrow
  if (e.keyCode === 37) {
    if (colClassNum > 0) {
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum].cells[colClassNum - 1];
      currentTarget.focus();
    }

  }
  //right arrow
  if (e.keyCode === 39) {
    if (colClassNum < (tableColumn.length - 1)) {
      currentTarget = document.querySelector(".schedule-table").rows[currentRowNum].cells[colClassNum + 1];
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

//get data from table
function getTableContent() {
  let rowObjects = []; //empty array for objects
  //get rows\
  let rows = currentSchedule.querySelector(".schedule-table").rows;
  let rowsToArray = Array.from(rows);
  let numberOfRows = 0;
  let form;
  var carouselDiv = document.createElement("div");
  carouselDiv.classList.add("Place-holder-div");
  carouselDiv.appendChild(currentSchedule);

  rowsToArray.forEach(function(row) {

    let rowtextData = [] //array for text data
    for (let i = 0; i < (row.children.length); i++) {
      rowtextData.push(row.children[i].textContent);

    }
    //console.log(document.querySelector())
    rowObjects.push(rowtextData);
    numberOfRows++;


  });
  var htmlInput = document.createElement("input");
  htmlInput.type = "hidden";
  htmlInput.value = carouselDiv.innerHTML;
  console.log(carouselDiv.innerHTML);
  htmlInput.name = "htmlCode";

  for (let i = 0; i < rowObjects.length; i++) {
    // let currentRowObject = document.getElementsByName("r"+i);
    // console.log(currentRowObject);
    // currentRowObject[0].value = rowObjects[i];
    //add input so that it can be used upon submission
    var newRowInput = document.createElement("input");
    newRowInput.type = "hidden";
    newRowInput.value = rowObjects[i];
    newRowInput.name = ("r" + i);
    form = carouselDiv.querySelector(".table-submit-form");
    form.appendChild(newRowInput)

  }
  //create input that holds inner html for table

  //scheduleTitle = document.querySelector(".schedule-title");
  //console.log(scheduleTitle);
  form = carouselDiv.querySelector(".table-submit-form");

  form.appendChild(htmlInput);
  form.classList.add("hide");
  document.body.appendChild(form);
  console.log(htmlInput);

  //document.getElementsByName("rowArrayLength")[0].value = numberOfRows;
  form.submit();

}


//loop through rows and assign each row a row object with cell text


//   document.querySelector(".schedule-table").rows[0].cells[0].textContent
//
// }

function addSchedule() {
  let datesForWeek = getDatesForSchedule(); //get full form dates
  console.log(datesForWeek);
  //get previouse week dates
  let datesThisWeek = []; //numeric dates
  datesForWeek.forEach(function(day) {
    datesThisWeek.push(day.slice(8));
  });
  let newTable = document.querySelector(".carousel-item.active").cloneNode(true);
  if (newTable === null) {
    tables = document.querySelectorAll(".carousel-item");
    newTable = tables[tables.length - 1].cloneNode(true);
  }
  newTable.classList = "carousel-item " + datesForWeek[0]; // add carousell-item
  newTable.querySelector(".table-submit-form").classList = "table-submit-form table" + datesForWeek[0] + "-submit-from" // change form submission, will need to change
  newTable.querySelector("table").classList = "table table-condensed table-sm table-bordered table-hover schedule-table schedule-table-" + datesForWeek[0];
  newTable.querySelector(".inputDate").value = datesForWeek[0];

  headerRow = newTable.querySelector(".row_0");
  let tableDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let mondayIndex, sundayIndex;


  //get column with monday and sunday, so we know where to place dates in column
  for (let i = 0; i < headerRow.children.length; i++) {

    if (headerRow.children[i].innerHTML.includes("Monday")) {
      let monday = headerRow.children[i];
      let mondayClass = monday.classList.toString();

      mondayIndex = Number(mondayClass.slice(15));
    }
    if (headerRow.children[i].innerHTML.includes("Sunday")) {
      let sunday = headerRow.children[i];
      let sundayClass = sunday.classList.toString();

      sundayIndex = Number(sundayClass.slice(15));
    }
  }
  //gets dates for title
  year = Number(datesForWeek[0].slice(0, 4));
  month = Number(datesForWeek[0].slice(5, 7));
  firstDay = Number(datesForWeek[0].slice(8, 10));
  lastDay = Number(datesForWeek[6].slice(8, 10));
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  console.log(year, month, firstDay, lastDay);
  var tempDate = new Date();
  tempDate.setMonth(month - 1);
  tempDate.setFullYear(year);
  tempDate.setDate(firstDay);
  var thisMonthStr = monthNames[tempDate.getMonth()];
  console.log(tempDate.getMonth());
  for (let i = mondayIndex; i <= sundayIndex; i++) {
    headerRow.children[i].innerHTML = "<b>" + tableDay[i - 4] + "</br>" + datesThisWeek[i - 4] + "</b>";
  }
  //create title
  newTable.querySelector(".schedule-title").value = thisMonthStr + " " + year + ": " + datesThisWeek[0] + "-" + datesThisWeek[6]; //monday through sunday

  document.querySelector(".carousel-inner").appendChild(newTable);
  schedules.push(newTable);
  addListeners(newTable);
  currentSchedule = schedules[schedules.length - 1];
  currentSchedule.querySelector(".schedule-title").setAttribute("value", thisMonthStr + " " + year + ": " + datesThisWeek[0] + "-" + datesThisWeek[6]);
  $("#tableControls").carousel(schedules.length - 1); // only way to use property carousel is in jquery
  console.log(currentSchedule);



}

function deleleSchedule() {
  let currentScheduleIndex = schedules.indexOf(currentSchedule);
  //schedules.splice(currentScheduleIndex, 1); //remove schedule from array
  currentSchedule.remove();
  // var NextElement = $carousel.find('.item').first();
  // NextElement.addClass('active');
  schedules[currentScheduleIndex - 1].classList.add(".active");
  // console.log(currentSchedule);
  // console.log(schedules);
}



function getDatesForSchedule() {
  let tables = document.querySelectorAll(".carousel-item"); //gets both tableControl
  let lastTable = tables[tables.length - 1];
  let year, month, lastDay;

  let curr = new Date;

  let nextWeekDates = [];
  let firstMonday;
  let secondMonday;
  let currentDateYyyyMmDd;

  if (tables.length > 1) {
    let lastScheduleDate = lastTable.classList.toString();
    year = Number(lastScheduleDate.slice(14, 18));
    month = Number(lastScheduleDate.slice(19, 21));
    lastDay = Number(lastScheduleDate.slice(22, 24)); //sundat
    console.log(year, month, lastDay);
    curr.setFullYear(year);
    curr.setMonth(month - 1);
    curr.setDate(lastDay);
    nextWeekDates = [];
    firstMonday = curr.getDate() - curr.getDay() + 1;
    secondMonday = firstMonday + 6;
    currentDateYyyyMmDd = curr.toISOString().slice(0, 10);

  } else {
    nextWeekDates = [];
    firstMonday = curr.getDate() - curr.getDay() + 1;
    secondMonday = firstMonday + 6;
    currentDateYyyyMmDd = curr.toISOString().slice(0, 10);
  }





  for (let i = 0; i <= 6; i++) {
    //subtract current day of the week
    secondMonday++;
    let day = new Date(curr.setDate(secondMonday)).toISOString().slice(0, 10)
    nextWeekDates.push(day)
  }

  return nextWeekDates;
}

function addListeners(obj) {
  obj.querySelector("table").addEventListener('contextmenu', function(e) {
    // document.querySelector(".schedule-table").addEventListener('contextmenu', function(e) {
    document.querySelector(".drop-menu-div").classList.add("show");
    document.querySelector(".hidden-menu").classList.remove("hide");
    document.querySelector(".drop-menu-div").style.top = e.pageY + 'px';
    document.querySelector(".drop-menu-div").style.left = e.pageX + 'px';
    var currentCol = e.target; //column
    colClassNum = currentCol.cellIndex;

    var currentRowStr = e.target.parentNode; //row
    currentRowNum = currentRowStr.rowIndex;
    currentTarget = e.target;
    currentSchedule = obj //get current schedule
    //console.log(currentColNum);
    e.preventDefault();


  }, false); // bubbles which is default anyway

  obj.querySelector(".schedule-table").addEventListener("click", function(e) {
    document.querySelector(".hidden-menu").classList.add("hide");
    var currentCol = e.target; //column
    colClassNum = currentCol.cellIndex;
    var currentRowStr = e.target.parentNode; //row
    currentRowNum = currentRowStr.rowIndex;
    currentTarget = e.target;
    console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode);
    currentSchedule = obj

  });

  obj.querySelector(".schedule-table").addEventListener("keydown", function(e) {
    var currentCol = e.target; //column
    colClassNum = currentCol.cellIndex;
    var currentRowStr = e.target.parentNode; //row
    currentRowNum = currentRowStr.rowIndex;

    // console.log(e.keyCode);


    var tablerow = obj.querySelectorAll("tr");
    var tableColumn = obj.querySelector(".row_0").children;

    //up arrow
    if (e.keyCode === 38) {
      if (currentRowNum > 0) {
        // currentTarget = document.querySelector(".row_" + (currentRowNum - 1) + " .col_" + colClassNum);
        currentTarget = obj.querySelector(".schedule-table").rows[currentRowNum - 1].cells[colClassNum];
        currentTarget.focus();
      }


    }
    //down arrow
    if (e.keyCode === 40) {
      if (currentRowNum < (tablerow.length - 1)) {
        currentTarget = obj.querySelector(".schedule-table").rows[currentRowNum + 1].cells[colClassNum];
        currentTarget.focus();
      }

    }
    //left arrow
    if (e.keyCode === 37) {
      if (colClassNum > 0) {
        currentTarget = obj.querySelector(".schedule-table").rows[currentRowNum].cells[colClassNum - 1];
        currentTarget.focus();
      }

    }
    //right arrow
    if (e.keyCode === 39) {
      if (colClassNum < (tableColumn.length - 1)) {
        currentTarget = obj.querySelector(".schedule-table").rows[currentRowNum].cells[colClassNum + 1];
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

}



// let datesThisWeek = [];
//   nextWeekDates.forEach(function(day){
//     datesThisWeek.push(day.slice(8));
//   });
// return datesThisWeek;
