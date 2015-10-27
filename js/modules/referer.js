import _ from '../../bower_components/lodash-compat/lodash.min';

const visitors = {
  'designernews' : {
    message : 'Hello Designer News! Get 10% off regular tickets with this code: dn10'
  }
};

const visitor = {
  init: function(){
    this.displayBanner();
  },
  getQueryParams: function(variable) {
    let query = window.location.search.substring(1);
    let allParams = query.split("&");
    return _.object(
        _.map(allParams, (value) => {
            let item = value.split('=');
            return [item[0], item[1]];
        })
    );
  },
  isSpecialGuest: function(visitor){
    return visitors[visitor] || false;
  },
  findValues: function(){
    let params = this.getQueryParams();
    let visitor = params['ref'];
    if(this.isSpecialGuest(visitor)){
      return visitors[visitor];
    }
  },
  displayBanner: function(){
    let visitorDetails = this.findValues();
    if(visitorDetails) {
      $('body').prepend(`<div class="welcome-banner">${visitorDetails.message} </div>`);
    }
  }
}
export default visitor;