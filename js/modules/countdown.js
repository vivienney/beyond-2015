class Countdown {
  init(){
    if( $('tickets').hasClass('schedule')){
      this.calcCountdown();
    }
  }
  timeUntilDate(targetDate, format){
    var today = new Date();
    var target = new Date(targetDate);
    var timeLeftInMs = target.getTime() - today.getTime();
    var msPerMinute = 60 * 1000;
    var msPerHour = 60 * 60 * 1000;
    var msPerDay = 24 * 60 * 60 * 1000;
    var minutesLeft;
    var daysLeft;
    var hoursLeft;

    if (format === 'minutes'){
      minutesLeft = Math.floor(timeLeftInMs / msPerMinute);
      return minutesLeft;
    } else if (format === 'hours'){
      hoursLeft = Math.floor(timeLeftInMs / msPerHour);
      return hoursLeft;
    } else {
      daysLeft = Math.floor(timeLeftInMs / msPerDay);
      return daysLeft;
    }
  }

  inTheFuture(date){
    if( this.timeUntilDate(date, 'minutes') > 0 ){
      return true;
    }
  }

  inThePast(targetDate){
    if( new Date() >  new Date(targetDate) ){
      return true;
    }
  }

  calcCountdown(){
    const ticketTiers = [
      {
        name: 'Super Early bird',
        date: 'September 26, 2015 18:00:00'
      },
      {
        name: 'Early bird',
        date: 'October 22, 2015 18:00:00'
      },
      {
        name: 'Regular',
        date: 'November 10, 2015 18:00:00'
      },
      {
        name: 'Late',
        date: 'November 23, 2015 10:00:00'
      }];
    const totalTicketTiers = ticketTiers.length - 1;

    for (var i = 0; i < ticketTiers.length; i++) {
      if( this.inThePast(ticketTiers[i].date) ){
        $('.ticket').eq(i).addClass('ticket--sold-out');
      } else {
        $('.ticket--sold-out').last().next().removeClass('ticket--unreleased');
        $('.ticket').eq(i).wrap('<a href="https://www.eventbrite.co.uk/e/beyond-conf-2015-tickets-18517110175"></a>');
      }
    }

    if( $('.ticket--sold-out').last().index() < totalTicketTiers ) {
      let nextIncrease = ticketTiers[$('.ticket--sold-out').last().next().index() ].date;
      let minutes = this.timeUntilDate(nextIncrease, 'minutes');
      let hours = this.timeUntilDate(nextIncrease, 'hours');
      let days = this.timeUntilDate(nextIncrease, 'days');

      if(minutes <= 60){
        this.displayCountdown( minutes, 'minutes');
      } else if(hours <= 24) {
        this.displayCountdown( hours, 'hours');
      } else {
        this.displayCountdown( days , 'days');
      }
    } else {
      this.displayCountdown( 0 , 'days');
    }
  }

  displayCountdown(countdownAmount, format){
    var countdownAsText = countdownAmount.toString();

    if (countdownAsText.length === 1) {
      countdownAsText = '0' + countdownAsText;
    }
    $('.time-left__num').first().text(countdownAsText[0]);
    $('.time-left__num').last().text(countdownAsText[1]);
    $('.js-ticket-contdown__unit').text(format);
  }

}
export default new Countdown();