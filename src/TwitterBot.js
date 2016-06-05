var _ = require('underscore');
var twitter = require('twit');

var TwitterBot = (function() {

  var debug = true;

  var verbose = false;

  var twitConfig = {
    consumer_key:        '****************',
    consumer_secret:     '****************',
    access_token:        '****************',
    access_token_secret: '****************'
  };

  this.Twit = new twitter(twitConfig);

  console.log("-------------------------$$$$$");
  console.log(this.Twit);
  console.log("-------------------------$$$$$");



//   var sendDirectMessage = function(user, msg) {
//
//   console.log(" ======================================================  SEND DIRECT MESSAGE TO  :::  ", user);
//   console.log(" ======================================================  MESSAGE  :::  ", messages[msg]);
//   if(!debug)
//   {
//     Twit.post('direct_messages/new', { user_id: user, text: messages[msg]}, function (err, data, response) {
//       console.log(data)
//     });
//   }
//
// }
//
// var tweet = function(tweet) {
//
// }
//
// var retweet = function(tweet) {
//   var output = verbose == true ? tweet : tweet.id_str ;
//   if(!debug){
//     if(mediaOnlyRetweet){
//       if(tweet.entities.media){
//         Twit.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
//           console.log("------------------------------- [media only]");
//           console.log(output);
//           if(err)
//           {
//             console.log(data);
//             console.log("------------------------------> Retweet FAILED");
//           } else {
//             console.log("------------------------------> Retweet OK");
//           }
//         });
//       }
//     } else {
//       Twit.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
//         console.log(tweet);
//         if(err)
//         {
//           console.log(data);
//           console.log("------------------------------> Retweet FAILED");
//         } else {
//           console.log("------------------------------> Retweet OK");
//         }
//       });
//     }
//   } else {
//     if(mediaOnlyRetweet){
//       if(tweet.entities.media){
//         console.log("------------------------------- [media only]");
//         console.log(output);
//         console.log("------------------------------> Retweet FAILED [DEBUG MODE]");
//       } else {
//         console.log("------------------------------- Retweet Abord NO MEDIA");
//       }
//     } else {
//       console.log(output);
//       console.log("------------------------------> Retweet FAILED [DEBUG MODE]");
//     }
//   }
// }
//
// var greetNewFollowers = function() {
//
//   Twit.get('followers/list', {count: 200}, function(err, data, response) {
//     var updatedFollowersList = [];
//     var newFollowersList = [];
//     _.each(data.users, function(d){
//       updatedFollowersList.push(d.id_str);
//     });
//
//     if(followersList.length != 0){
//       newFollowersList = _.difference(updatedFollowersList, followersList);
//
//       _.each(newFollowersList, function(user){
//         sendDirectMessage(user, "greetings");
//       });
//     }
//
//     followersList = updatedFollowersList;
//
//   });
//
// }
//
// var getFollowersList = function() {
//
//   Twit.get('followers/list', {count: 200}, function(err, data, response) {
//     console.log("*****************************")
//     _.each(data.users, function(d){
//       console.log("---");
//       followersList.push(d.id_str);
//       console.log(d.id_str);
//       console.log("*****************************")
//     });
//   });
//
// }
//
//
// var retweetFromList = function() {
//
//   Twit.get('lists/members', {list_id : listID}, function(err, data, response) {
//
//     // console.log(data);
//     _.each(data.users, function(d){
//       console.log("---");
//       console.log(d.id_str);
//       followList += ','+d.id_str;
//     });
//
//     // console.log(data);
//     Twit.get('lists/statuses', { list_id : listID, count : 100 }, function (err, data, response) {
//
//       _.each(data, function(tweet){
//
//         console.log("------------------------------- Retweet from list ", listID);
//         retweet(tweet);
//
//       });
//
//     });
//
//   });
//
//
// }
//
// var TwitterBot = function() {
//
//
// }
//
//
// var streamStatuses = Twit.stream('statuses/filter', { follow: followList, track: trackers });
// // var streamStatuses = Twit.stream('statuses/filter', { track: trackers });
//
// streamStatuses.on('tweet', function (tweet) {
//
//   if(gate == true && autoRetweetOnSchedule == true)
//   {
//
//     console.log("------------------------------- Retweet from Home Timeline ");
//     retweet(tweet);
//
//
//   }
//
// });



})();

module.exports = TwitterBot;
