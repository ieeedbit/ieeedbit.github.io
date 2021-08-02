var events = {};
$(document).ready(function() {
    initializeEvents();
});

function populateModal(id){
    var i = id+1;
    var url = "/data/events/event" + i + ".json";
    $.ajax({
        url: url,
        success: function(result) {
            var body = "#event-content" + id;
            var htmlStr = ``;
            htmlStr += `<p><strong>Date:</strong>&nbsp;` + result.date + "" + `</p><p>` + result.description + `</p><p>`;
            for (link in result.links) {
                htmlStr += `<a href="` + result.links[link].url + `" class="btn btn-primary" target="_blank">` + result.links[link].title + `</a>`;
            }
            htmlStr += `</p>`
            $(body).html(htmlStr);
        }
    });
}

function initializeEvents() {
    var htmlString = '';
    var i = 0;

    // Load the data
    $.ajax({
        url: "data/yearevents/2020/2020init.json",
        success: function(result) {
            events = result;
            for (myEvent in events) {
                
                htmlString += `<div class='col-md-6'><div class='event-card' id='` + myEvent + `' onclick="populateModal(` + i + `)" data-toggle="modal" data-target="#exampleModalCenter` + i + `" ><div class="event-content">`;
                htmlString += `<a href="/2020/index.html?q=`+myEvent+`" class='name'><strong>` + events[myEvent].title + `</strong></a></div><div class='event-expand'><i class='fa fa-plus'></i></div></div></div>`;
                $("#events").html(htmlString);
                
                i += 1;
                
            }
        }
    });
}

function generateModal(i, eventTitle) {
    var htmlString = $('#event-modals').html();
    htmlString += `<div class="modal fade" id="exampleModalCenter` + i + `" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <a class="modal-title" id="exampleModalLongTitle">` + eventTitle + `</a>
          <img src="../res/img/events/`+i+`.jpg" />
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="event-content` + i + `">
        <div class="colorlib-loader colorlib-event-loader">
            <div id="loader"></div>
            <div id="loader"></div>
            <div id="loader"></div>
            <div id="loader"></div>
            <div id="loader"></div>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" style="color: #fff;" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
  $('#event-modals').html(htmlString)
}

function displayEventData(result){
    var htmlString = '';
    $(".event_title").html(result.title);
    $(".event_sub_title").html(result.sig);
    $(".event_desc_p").html(result.description);
    if(result.links.length > 0){
        htmlString += "<h3>More info:</h3><ul>";
        for(var i = 0; i< result.links.length; i++)
            htmlString += "<li><a target='_blank' href='"+result.links[i].url+"'>"+result.links[i].title+"</a></li>"
        $(".box_right .more").html(htmlString);
    }
}
