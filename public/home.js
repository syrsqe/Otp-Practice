function addAnouncement(){
  let announcementsCard = document.querySelector(".announcements")
  let newAnnouncement = document.createElement("li");
  let submitButton = document.createElement("button");

      submitButton.classList.add("btn");
      submitButton.classList.add("btn-success");
      submitButton.classList.add("publishAnnouncement-btn");
      submitButton.textContent = "Publish";
      submitButton.setAttribute("type", "button");
      submitButton.setAttribute("onclick", "submitAnnoncement(this)");

  newAnnouncement.contentEditable = true;
  newAnnouncement.textContent = "New Announcement";

  announcementsCard.lastElementChild.before(newAnnouncement);
  announcementsCard.lastElementChild.before(submitButton);

  //console.log(newAnnouncement.value);


}
function submitAnnoncement(button){
  let newAInput = document.createElement("input");
  newAInput.name = "newAnnouncement"
  newAInput.type = "hidden";
  newAInput.setAttribute("value",button.previousSibling.textContent); // get content of
  document.querySelector(".announcement-form").appendChild(newAInput);// setattribute sets both defualt value and value of input = sets only value
  document.querySelector(".announcement-form").submit();
}
function deleteAnnouncement(number){
  console.log("delete announcement called");
  let newAInput = document.createElement("input");
  newAInput.name = "delAnnouncement"
  newAInput.type = "hidden";
  newAInput.setAttribute("value",number);
  document.querySelector(".delAnnouncement-form").appendChild(newAInput);// setattribute sets both defualt value and value of input = sets only value
  document.querySelector(".delAnnouncement-form").submit();
}
