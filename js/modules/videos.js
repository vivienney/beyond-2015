'use strict';
import YouTubeIframeLoader from 'youtube-iframe';
import fitVids from 'fitvids';

let player;
let initialised = false;
let resolve, reject, promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
});

const videos = {
  init: function() {
    if (!initialised){ this.loadYT(); }
    return promise;
  },
  loadYT: function() {
    YouTubeIframeLoader.load(function(YT) {
      player = new YT.Player('video-placeholder', {
        height: '390',
        width: '640',
        videoId: 'fObfRDB0JQw'
      });
      initialised = true;
      resolve();
    });
    return promise;
  },
  changeVid: function() {
    $('.single-video').click(function() {
      var id = $(this).data('id');
      player.loadVideoById(id);
    });
  }
};

export default videos;