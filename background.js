'use strict';
(function () {

    // Draw browser action icon with HTML5 canvas
    document.write('<canvas id="canvas"></canvas>');
  
    var SIZE = 19; // Icon size
    var canvas = document.getElementById('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
  
    var c = canvas.getContext("2d");
  
    // Define an array to storage available memory percent
    var availMem = Array(SIZE);
    for (var i = availMem.length; i--; ) {
      availMem[i] = 1;
    }
  
    (function draw() {
  
      // Get available memory percent
      chrome.system.memory.getInfo(function (info) {
        availMem.push(info.availableCapacity / info.capacity);
        availMem.shift();
  
        // Show memory information on mouse over
        chrome.browserAction.setTitle({
          title: 'Total: ' + (info.capacity / 1073741824).toFixed(2) + ' GiB\n' +
                 'Available: ' + (info.availableCapacity / 1073741824).toFixed(2) + ' GiB',
        });
  
        c.clearRect(0, 0, SIZE, SIZE);
  
        // Draw memory usage change
        c.beginPath();
          c.moveTo(0, SIZE);
          for (var i = 0; i < SIZE; i++) {
            c.lineTo(i, availMem[i] * SIZE);
          }
          c.lineTo(SIZE, SIZE);
          c.lineWidth = 2;
          c.fillStyle = '#ff0000';
          c.fill();
  
        // Draw border
        c.beginPath();
          c.moveTo(0, 0);
          c.lineTo(0, SIZE);
          c.lineTo(SIZE, SIZE);
          c.lineTo(SIZE, 0);
          c.closePath();
          c.lineWidth = 2;
          c.strokeStyle = '#008744';
          c.stroke();
  
        chrome.browserAction.setIcon({
          imageData: c.getImageData(0, 0, SIZE, SIZE)
        });
      });
  
      setTimeout(draw, 1000);
    })();
  })();

chrome.alarms.onAlarm.addListener(function() {
console.log('done');
chrome.browserAction.setBadgeText({text: ''});
  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  var random = randomNumber(0, 100);
  if (random > 0 && random < 20) {
    chrome.notifications.create(
        'name-for-notification',{   
        type: 'basic', 
        iconUrl: '128.png',
        title: "Relax", 
        message: "Take a break! You're working too hard" 
        });

  } else if (random > 20 && random < 40) {
    chrome.notifications.create(
        'name-for-notification',{   
        type: 'basic', 
        iconUrl: '128.png',
        title: "Drink Water", 
        message: "Take a break! You're working too hard" 
        });

  } else if (random > 40 && random < 60) {
    chrome.notifications.create(
        'name-for-notification',{   
            type: 'basic', 
            iconUrl: '128.png',
            title: "Stretch a little!", 
            message: "Take a break! You're working too hard" 
            });

  } else if (random > 60 && random < 80) { 
    chrome.notifications.create(
        'name-for-notification',{   
            type: 'basic', 
            iconUrl: '128.png',
            title: "Go play a bit", 
            message: "Take a break! You're working too hard" 
            });

  } else {
    chrome.notifications.create(
        'name-for-notification',{   
            type: 'basic', 
            iconUrl: '128.png',
            title: "Fix your Posture!", 
            message: "Take a break! You're working too hard" 
            });
    console.log(random);
  }      
});

chrome.runtime.onInstalled.addListener(function() {
    chrome.system.memory.getInfo(function(memory) {
        var memory = memory.availableCapacity;
        if (memory < 2430000000 ) {
          chrome.notifications.create(
              'name-for-notification',{   
                  type: 'basic', 
                  iconUrl: '128.png',
                  title: "You might be working to Hard!", 
                  message: "Your memory usage is high. Maybe take a break?"
                  });

        }
        console.log(memory);
    })
})

window.onload = function () {
    // Initial function call
    callfunction();
    setInterval(function () {
      // Invoke function every 10 minutes
      callfunction();
    }, 600000);
  }

function callfunction () {
    chrome.system.memory.getInfo(function(memory) {
        var memory = memory.availableCapacity;
        if (memory < 2430000000 ) {
          chrome.notifications.create(
              'name-for-notification',{   
                  type: 'basic', 
                  iconUrl: '128.png',
                  title: "You might be working to Hard!", 
                  message: "Your memory usage is high. Maybe take a break?"
                });

        }
    })
    chrome.notifications.create(
        'name-for-notification',{   
            type: 'basic', 
            iconUrl: '128.png',
            title: "You've been looking at a screen for a while!", 
            message: "This green screen should help!"
          });
        var newURL = "https://mrazhar101.wixsite.com/greenscreen";
  chrome.tabs.create({ url: newURL });  
  }