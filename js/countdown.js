//Countdown plugin

(function($) {
    $.fn.countdown = function(options, callback) {

      //custom 'this' selector
      var thisEl = $(this);

      //array of custom settings
      var settings = { 
        'date': null,
        'format': null
      };

      //append the settings array to options
      if(options) {
        $.extend(settings, options);
      }

      //main countdown function
      var countdown_proc = function () {

        var eventDate = Date.parse(settings['date']) / 1000;
        var currentDate = Math.floor($.now() / 1000);

        if(eventDate <= currentDate) {
          callback.call(this);
          clearInterval(interval);
        };

        var seconds = eventDate - currentDate;

        var days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
        seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed

        var hours = Math.floor(seconds / (60 * 60));
        seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed

        var minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60; //update the seconds variable with no. of minutes removed
      
        //logic for the two_digits ON setting
        if(settings['format'] == "on") {
          days = (String(days).length >= 2) ? days : "0" + days;
          hours = (String(hours).length >= 2) ? hours : "0" + hours;
          minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
        }

        //update the countdown's html values.
        if(!isNaN(eventDate)) {
          thisEl.find("#daysLeft").text(days);
          thisEl.find("#hoursLeft").text(hours);
          thisEl.find("#minutesLeft").text(minutes);        
        } else { 
          alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
          clearInterval(interval); 
        }
      }

      //run the function
      countdown_proc();

      //loop the function
      interval = setInterval(countdown_proc, 1000);

    }
}) (jQuery);

$(function() {
  $(".countdown").countdown({
    date: "7 march 2017 20:00:00"
    format: "on" // on (03:07:52) | off (3:7:52) - two_digits set to ON maintains layout consistency
  });

});
  




