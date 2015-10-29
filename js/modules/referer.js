import _ from '../../bower_components/lodash-compat/lodash.min';

const refererList = {
  'designernews' : {
    message : 'Hello Designer News! Get 10% off regular tickets with this code: dn10',
    specialGuest: true,
    affiliate: false
  },
  'codefirstgirls' : {
    specialGuest: false,
    affiliate: true,
    link: ''
  },
  'girlsintech' : {
    specialGuest: false,
    affiliate: true,
    link: ''
  },
  'makers' : {
    specialGuest: false,
    affiliate: true,
    link: ''
  },
  'switchup' : {
    specialGuest: false,
    affiliate: true,
    link: ''
  }
};

const referral = {
  init: function(){
    let refParam = this.checkForRefParam();
    let localRef = this.checkForLocalStorage();
    let refererName = refParam || localRef;
    let refererInfo = this.getRefererInfo(refererName);

    if(refererInfo) {
      this.actionReferer(refererInfo);
      this.storeRefererName(refererName);
    }
  },
  checkForRefParam: function(){
    let params = this.getQueryParams();
    return params['ref'];
  },
  checkForLocalStorage: function(){
    return localStorage.getItem('referer');
  },
  getRefererInfo: function(refererName){
    return refererList[refererName] || false;
  },
  storeRefererName: function(refererName){
    localStorage.setItem('referer', refererName);
  },
  actionReferer: function(referer){
    if(referer.specialGuest) {
      this.displayBanner(referer);
    }
    if(referer.affiliate) {
      this.replaceTicketLinks(referer);
    }
  },
  replaceTicketLinks: function(referer){
    $('.js-ticket-link').attr('href', referer.link);
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
  displayBanner: function(referer){
    $('body').prepend(`<div class="welcome-banner">${referer.message} </div>`);
  }
}
export default referral;