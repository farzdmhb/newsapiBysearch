

$(document).ready(function(){
    
    $("#searchbtn").on("click",function(e){
      e.preventDefault();
      
      let query = $("#searchquery").val();
      let url = " http://newsapi.org/v2/everything?q="+query+"&apiKey=da33f8d6115f480fa4cf97bfd60f4dc1";
     
      if(query !== ""){
        
        $.ajax({
          
          url: url,
          method: "GET",
          dataType: "json",
          
          beforeSend: function(){
            $("#loader").show();
          },
          
          complete: function(){
            $("#loader").hide();
          },
          
          success: function(news){
            let output = "";
            let latestNews = news.articles;
            
            for(var i in latestNews){
              output +=`
                <div class="col l6 m6 s12">
                <h4>${latestNews[i].title}</h4>
                <img src="${latestNews[i].urlToImage}" class="responsive-img">
                <p>${latestNews[i].description}</p>
                <p>${latestNews[i].content}</p>
                <p>Published on: ${latestNews[i].publishedAt}</p>
                <a href="${latestNews[i].url}" class="btn">Read more</a>
                </div>
              `;
            }
            
            if(output !== ""){
              $("#newsResults").html(output);
               M.toast({
                html: "There you go, nice reading",
                classes: 'green'
              });
              
            }else{
              let noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. Sorry about that.<br>Try searching for something else </div>`;
               $("#newsResults").html(noNews);
              M.toast({
                html: "This news isn't available",
                classes: 'red'
              });
            }
            
          },
          
          error: function(){
             let internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
             <img src="img/internet.png" class="responsive-img">
             </div>`;
             
            $("#newsResults").html(internetFailure);
             M.toast({
                html: "We encountered an error, please try again",
                classes: 'red'
              });
          }
          
          
        });
        
      }else{
        let missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;">Please enter any search term in the search engine</div>`;
        $("#newsResults").html(missingVal);
         M.toast({
                html: "Please enter something",
                classes: 'red'
              });
      }
      
    });
    
});


$("#sourcebtn").on("click",function(e){
  e.preventDefault();
  
  let url = " http://newsapi.org/v2/sources?apiKey=da33f8d6115f480fa4cf97bfd60f4dc1";
 
  
    
    $.ajax({
      
      url: url,
      method: "GET",
      dataType: "json",
      
      beforeSend: function(){
        $("#loader").show();
      },
      
      complete: function(){
        $("#loader").hide();
      },
      
      success: function(newsSources){
        let output = "";
        let allSources = newsSources.sources;
        
        for(var i in allSources){
          output +=`
            <div class="col l6 m6 s12">
            <h4>${allSources[i].name}</h4>
            <h3>${allSources[i].category}</h3>
            <p>${allSources[i].description}</p>
            <p>${allSources[i].country}</p>
            <a href="${allSources[i].url}" class="btn">Read more</a>
            </div>
          `;
        }
        
        if(output !== ""){
          $("#newsResults").html(output);
           M.toast({
            html: "There you go, nice reading",
            classes: 'green'
          });
          
        }else{
          let noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. Sorry about that.<br>Try searching for something else </div>`;
           $("#newsResults").html(noNews);
          M.toast({
            html: "This news isn't available",
            classes: 'red'
          });
        }
        
      },
      
      error: function(){
         let internetFailure = `
         <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
         <img src="img/internet.png" class="responsive-img">
         </div>`;
         
        $("#newsResults").html(internetFailure);
         M.toast({
            html: "We encountered an error, please try again",
            classes: 'red'
          });
      }
      
      
    });

  
});

