  var localeSettings = {};
  dayjs.locale(localeSettings);
 
  $(function () {
    
    var currentTime = dayjs().format('H');

    function Time() {
      var dateElement = $('#date');
      var timeElement = $('#time');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
  
    function hourColor() {
      $('.time-block').each(function() {
        var blockTime = parseInt(this.id);
        $(this).toggleClass('past', blockTime < currentTime);
        $(this).toggleClass('present', blockTime === currentTime);
        $(this).toggleClass('future', blockTime > currentTime);
      });
    }
 
    function comments() {
      $('.saveBtn').on('click', function() {
        var key = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   
    function blockColor() {
      $('.time-block').each(function() {
        var blockTime = parseInt(this.id);
        if (blockTime == currentTime) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockTime < currentTime) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
   
    $('.time-block').each(function() {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });

    function deleteItems() {
      localStorage.clear();
    }
     
    hourColor();
    comments();                
    blockColor();

    setInterval(Time, 1000);
  });