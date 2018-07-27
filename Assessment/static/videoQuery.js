
   var key = 'AIzaSyDc5Y2QwI7t4r2xhEP8go6MrYccO9DreAo'


$(document).ready(function(){


    function resultsLoop(data){

           $.each(data.items,function(i, item){

           var thumb = item.snippet.thumbnails.medium.url;
           var title = item.snippet.title;
           var desc = item.snippet.description.substring(0,100);
           var vid = item.id.videoId;

           $('main').append(`
                   <article class="item" data-key="${vid}">
            <img src="${thumb}" alt="" class="thumb">
            <div class="details">
                <h4>${title}</h4>
                <p>${desc}</p>
            </div>
        </article>
           `)
           });


    }
    var channel = $('section').attr('data-channel');

    //Get videos from same author

	    $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part : 'snippet',
      channelId : channel,
      type : 'video',
      key: key},
      function(data) {
console.log(data);
    resultsLoop(data)
      }
  );


	        function commentsLoop(data){

           $.each(data.items,function(i, item){

           // var thumb = item.snippet.thumbnails.medium.url;
           // var title = item.snippet.title;
           // var desc = item.snippet.description.substring(0,100);
           // var channel = item.snippet.channelId;
           // var vid = item.id.videoId;

               var comment = item.snippet.topLevelComment.snippet.textDisplay;
               var name = item.snippet.topLevelComment.snippet.authorDisplayName;

           $('#comments').append(`
         <article class="comment">

            <div class="content">
                <h4>${name}</h4>
                <p>${comment}</p>
            </div>
        </article>
        
           `)
           });

    }

	    //Get Comments on Video
    var idComments = $('section').attr('data-key');
    var urlComments = "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDc5Y2QwI7t4r2xhEP8go6MrYccO9DreAo&textFormat=plainText&part=snippet&videoId="+ idComments

	      $.ajax({
        dataType: "jsonp",
        type: 'GET',
        url: urlComments,
        success: function(result){
            console.log(result);
            // $('.data').text(data);
            // console.log(data);
            commentsLoop(result)
    }});




});
