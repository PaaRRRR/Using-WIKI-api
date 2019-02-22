
    $(document).ready(function (){

      // UI
      var inputField = $("#inputField");
      var icon = $(".icon");
      var container = $(".container");
      var demo = $("#demo");
      var demogreed = $("#demogreed");
      var mainCenter = $("#mainCenter");
      var searchTerm, url, len, html;

      // hamburger effect
      container.click(function () {
        // container.toggleClass("start");

        if (icon.is(".active")) {
          icon.removeClass("active");
          demogreed.removeClass("getIn");
          inputField.val(" ");
          demogreed.text("Click icon to search");
        } else {
          icon.addClass("active");
          demogreed.removeClass("getIn")
          inputField.focus();
        }

        if (demogreed.is(".getIn")) {
          mainCenter.removeClass("change_center");
        } else {
          mainCenter.addClass("change_center");
        }

      });

      // get Data from WIKI API
      inputField.on('keydown', function(e){
        if (e.which == 13 || event.keyCode == 13) {

          // 아무것도 입력하지 않았을 때
          if(inputField.val() == '' || inputField.val() == ' '){
            demogreed.text("아무것도 입력되지 않았습니다.");

          // 무언가를 입력했을 때
          } else {
            searchTerm = inputField.val();
            url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?";

            $.getJSON(url, function (data) {
              // console.log(data);
              demogreed.empty();
              demogreed.addClass("getIn");
              len = data[1].length;

              for(var i = 0; i < len; i++){
                html = "<div class='things'><a href='" +
                data[3][i] + "' class='things_link' target='_blank'><h2 class='things_title'>" +
                data[1][i] + "</h2><p>" +
                data[2][i] + "</p></a></div>";
                demogreed.prepend(html);
              }

              if(demogreed.is(".getIn")){
                mainCenter.removeClass("change_center");
              } else{
                mainCenter.addClass("change_center");
              }

            });
          }
        }
      });

    });
