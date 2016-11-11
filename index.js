
var express = require('express');

var server = express();

server.get('*', function(request, response) {
  var jsdom = require('jsdom').jsdom;

  var source = jsdom();
  var $window = source.defaultView;
  var $document = $window.document;

  global.window = $window;
  global.document = $document;

  var m = require('mithril');

  var root = window.document.createElement('div');
  window.document.body.appendChild(root);

  var Test = {
    view: function(vnode) {
      return m('p', 'This is a test');
    }
  };

  m.render(root, [
    m('h1', 'Test'),
    m(Test)
  ]);

  console.log(window.document.documentElement.outerHTML);

  response.send(window.document.documentElement.outerHTML);
});

server.listen(5000, function(error) {
  if (error) {
    throw error;
  }
  console.log('Server is running at localhost:5000');
});
