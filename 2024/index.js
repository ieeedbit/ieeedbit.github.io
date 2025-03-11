
const eventTitle = window.location.search.split("=")[1]
console.log(eventTitle)
$(document).ready(function () {
  initializeEvents();
});

const rowDiv = document.querySelector('.event-dets')

function initializeEvents() {
  let htmlString = '';
  var i = 0;

  // Load the data
  url = "../data/yearevents/2024/" + eventTitle + ".json"
  $.ajax({
    url: url,
    success: function(result) {

      data = result;
      title = data.title
      desc = data.description
      date = data.date
      pdf = data.pdf


      if(data.links[1]){
        image2 = data.links[1].url
      } else {
        image2 = null
      }

       if(data.links[0]){
        image1 = data.links[0].url
      } else {
        image1 = null
      }
      text = "Event Pdf"
      Registration = " Click here"

      // if (!pdf) {
      //   text = ""
      // }

      htmlString = `<h2>${title}</h2>

                   <div class="img-container">
                      <img src=${image1} alt="">
                      <img src=${image2} alt="">
                   </div>

                
                   <p> <strong> Description: \t \t </strong> <span>${desc}</span></p>

                <p> <strong> Event Date: \t \t </strong> <span>${date}</span></p>


          

                <p> <strong> Register Now : \t \t </strong> <span><a href=${data.links[2].url} target="_blank">${Registration}</a>  </span></p>

                <p> <strong> Event pdf : \t \t </strong> <span><a href=${data.links[3].url} target="_blank">${text}</a>  </span></p>
                     `

      rowDiv.innerHTML = htmlString;
    }
  });
}

