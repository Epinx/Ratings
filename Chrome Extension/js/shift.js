












/*
Use directly
http://srobbin.com/jquery-plugins/pageslide/

Zoom etc:
http://jaukia.github.io/zoomooz/


Turn Pages
http://www.turnjs.com/

*/





/*  Version 1:   Try to Shifts the page and become a Sidebar

var sidebar;
  $('body').css({
    'padding-right': '300px'
  });
  sidebar = $("<div id='sidebar'></div>");
  sidebar.css({
    'position': 'fixed',
    'right': '0px',
    'top': '0px',
    'z-index': 9999,
    'width': '300px',
    'height': '100%',
    'background-color': '#efefef'  // Confirm it shows up
  });
  $('body').append(sidebar);