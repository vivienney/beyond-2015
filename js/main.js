"use strict";
//vendor
import $ from 'jquery';
import fitvids from 'fitvids';
import svgeezy from 'svgeezy';
import Modernizr from 'modernizr-mq';

//modules
import uiActions from './modules/ui-actions';
import schedule from './modules/schedule';
import visitor from './modules/visitor-banner';
import audioPlayer from './modules/audio-player';

const APP = {
  init: function() {
    // vendor init
    $('.blog-content-video').fitVids();
    svgeezy.init(false, 'png');

    //Module init
    visitor.init();
    uiActions.init();
    schedule.init();
    audioPlayer.init();
  }
};

APP.init();
