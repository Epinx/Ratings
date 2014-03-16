var DomOutline = function (options) {
    'use strict';

    options = options || {};

    var pub = {},
        self = {
            opts: {
                namespace: options.namespace || 'DomOutline',
                borderWidth: options.borderWidth || 2,
                onClick: options.onClick || false,
                border: options.border || false,
                realtime: options.realtime || false,
                label: options.label || false
            },
            keyCodes: {
                BACKSPACE: 8,
                ESC: 27,
                DELETE: 46
            },
            active: false,
            initialized: false,
            elements: {}
        };

    function writeStylesheet(css) {
        var element = document.createElement('style');
        element.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(element);

        if (element.styleSheet) {
            element.styleSheet.cssText = css; // IE
        } else {
            element.innerHTML = css; // Non-IE
        }
    }

    function initStylesheet() {
        var css = '';

        if (self.initialized !== true) {
            css +=
                '.' + self.opts.namespace + ' {' +
                '    background: rgba(0, 153, 204, 0.5);' +
                '    position: absolute;' +
                '    z-index: 1000000;' +
                '    pointer-events: none;' +
                '}' +
                '.' + self.opts.namespace + '_label {' +
                '    background: #09c;' +
                '    border-radius: 2px;' +
                '    color: #fff;' +
                '    font: bold 12px/12px Helvetica, sans-serif;' +
                '    padding: 4px 6px;' +
                '    position: absolute;' +
                '    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);' +
                '    z-index: 1000001;' +
                '    pointer-events: none;' +
                '}' +
                '.' + self.opts.namespace + '_box {' +
                '    background: rgba(0, 153, 204, 0.5);' +
                '    position: absolute;' +
                '    z-index: 1000000;' +
                '    pointer-events: none;' +
                '}';

            writeStylesheet(css);
            self.initialized = true;
        }
    }

    function createOutlineElements() {
        self.elements.label = jQuery('<div>').addClass(self.opts.namespace + '_label').appendTo('body');
        self.elements.top = jQuery('<div>').addClass(self.opts.namespace).appendTo('body');
        self.elements.bottom = jQuery('<div>').addClass(self.opts.namespace).appendTo('body');
        self.elements.left = jQuery('<div>').addClass(self.opts.namespace).appendTo('body');
        self.elements.right = jQuery('<div>').addClass(self.opts.namespace).appendTo('body');

        self.elements.box = jQuery('<div>').addClass(self.opts.namespace + '_box').appendTo('body');
    }

    function removeOutlineElements() {
        jQuery.each(self.elements, function (name, element) {
            element.remove();
        });
    }

    function compileLabelText(element, width, height) {
        var label = element.tagName.toLowerCase();
        if (element.id) {
            label += '#' + element.id;
        }
        if (element.className) {
            label += ('.' + jQuery.trim(element.className).replace(/ /g, '.')).replace(/\.\.+/g, '.');
        }
        return label + ' (' + Math.round(width) + 'x' + Math.round(height) + ')';
    }

    function getScrollTop() {
        if (!self.elements.window) {
            self.elements.window = jQuery(window);
        }
        return self.elements.window.scrollTop();
    }

    function stopOnEscape(e) {
        if (e.keyCode === self.keyCodes.ESC || e.keyCode === self.keyCodes.BACKSPACE || e.keyCode === self.keyCodes.DELETE) {
            pub.stop();
        }

        return false;
    }

    function draw(e) {
        if (e.target.className.indexOf(self.opts.namespace) !== -1) {
            return;
        }

        pub.element = e.target;

        var b = self.opts.borderWidth,
            scroll_top = getScrollTop(),
            pos = pub.element.getBoundingClientRect(),
            top = pos.top + scroll_top,
            label_text = '',
            label_top = 0,
            label_left = 0;

        if (self.opts.label) {
            label_text = compileLabelText(pub.element, pos.width, pos.height);
            label_top = Math.max(0, top - 20 - b, scroll_top);
            label_left = Math.max(0, pos.left - b);
            self.elements.label.css({ top: label_top, left: label_left }).text(label_text);
        }

        if (self.opts.border) {
            self.elements.top.css({ top: Math.max(0, top - b), left: pos.left - b, width: pos.width + b, height: b });
            self.elements.bottom.css({ top: top + pos.height, left: pos.left - b, width: pos.width + b, height: b });
            self.elements.left.css({ top: top - b, left: Math.max(0, pos.left - b), width: b, height: pos.height + b });
            self.elements.right.css({ top: top - b, left: pos.left + pos.width, width: b, height: pos.height + (b * 2) });
        } else {
            self.elements.box.css({
                top: pos.top,
                left: pos.left,
                width: pos.width,
                height: pos.height
            });
        }
    }

    function clickHandler(e) {
        if (!self.opts.realtime) {
            draw(e);
        }

        self.opts.onClick(pub.element);
        return false;
    }

    pub.start = function () {
        initStylesheet();
        if (self.active !== true) {
            self.active = true;
            createOutlineElements();

            jQuery('body').bind('keyup.' + self.opts.namespace, stopOnEscape);
            if (self.opts.onClick) {
                setTimeout(function () {
                    jQuery('body').bind('click.' + self.opts.namespace, clickHandler);
                }, 50);
            }

            if (self.opts.realtime) {
                jQuery('body').bind('mousemove.' + self.opts.namespace, draw);
            }
        }
    };

    pub.stop = function () {
        self.active = false;
        removeOutlineElements();
        jQuery('body').unbind('mousemove.' + self.opts.namespace)
            .unbind('keyup.' + self.opts.namespace)
            .unbind('click.' + self.opts.namespace);
    };

    return pub;
}; 


























// Get the URLs

$ = window.jQuery;

setTimeout(myFunction, 1000);

$('body').find('#epinx-com-chrome-extension-guide').remove();

$('body').append('<div id="epinx-com-chrome-extension-guide" style=""> Please wait. </div> ');

var element_guide = $('#epinx-com-chrome-extension-guide');

$('a').click(function() {
   $(this).attr('href', '#');
   return true;
});

function myFunction() {

	var level = 0;
	var selected_element = {};




	// $('cite').each(function(text) {
	// 	sendToSpecific($(this).text());
	// 	// console.log($(this).text());
	// });

	// // router
	// function sendToSpecific(text) {
	// 	if (text.toLowerCase().indexOf("www.imdb.com/title/tt") >= 0) {
	// 		parse_imdb();
	// 	}
	// }

	// function parse_imdb() {
	// 	console.log('parsing_imdb');
	// }

	var myExampleClickHandler = function (element) { 
		// console.log('Clicked '+level+' element:', element);
		myDomOutline.stop();
		if (level == 1) {
			selected_element.first = element;
			myDomOutline.start();
			element_guide.html('Select the SECOND movie');
			level++;
		}
		else if (level == 2) {
			selected_element.second = element;
			element_guide.html('Thank You!');
			console.log('first', selected_element.first);
			console.log('second', selected_element.second);
			find_similar(selected_element.first, selected_element.second);
		}
		
	}

	// not working, as there are no links but onClick events,: http://www.rottentomatoes.com/top/bestofrt/?year=2013 
	// #later - on mouse hover, using nearest common ancestor -> then same path, -> highlight brother texts too. Something like, pre-hint to whats gonna be searched.
	var myDomOutline = DomOutline({ onClick: myExampleClickHandler, realtime:true, border:true, label:true });

	element_guide.on('click', function(e) {
		if (level == 0) {
			myDomOutline.start();
			element_guide.html('Select the FIRST movie');
			level++;
		}
		else if (level == 1) {
		}

	});


	// As Now on Browser Action, no need for 'Click here to start'
	myDomOutline.start();
	element_guide.html('Select the FIRST movie');
	level++;


	// Fails on Google . Com , where an extra div is coming due to images which sometimes come, sometimes not.  :nth is not a good method ?
	// For now lets assume, hiearchy is exact in all elements of the loop of generated content.
	function find_similar(first, second) {
		_first = $(first);
		_second = $(second);

		var found_matches = 0;
		var keep_checking_children = false;
		var container_element = first;
		var keep_track = [];

		var count = 0;
		while((!keep_checking_children)&&(count<10)) {

			var temp_container_element = container_element;
			container_element = container_element.parentNode;


			keep_track[count] = 0;

			var local_count = 0;
			$(container_element).children().each(function(){
				local_count++;
				if (this==temp_container_element) {
					keep_track[count] = local_count;
				}
				// console.log(count, local_count, (this==temp_container_element));
			});


			// finding nearest common ancestor
			keep_checking_children = $.contains( container_element, second ) ;
			
			// console.log(count, container_element);

			count++;

			// console.log('keep_checking_children', keep_checking_children);
			// console.log('count', count);
		}

		var text_array = [];
		var element_array = [];
		var element_top_parent_array = []; // Used to give opacity to good/bad movies.

		$(container_element).children().each(function(number) {
			// console.log('lol1', count-2, $(this).children(':nth-child('+keep_track[count-2]+')').get(0));
			// console.log('lol2', count-3, $(this).children(':nth-child('+keep_track[count-2]+')').children(':nth-child('+keep_track[count-3]+')').get(0));
			// console.log('lol3', count-4, $(this).children(':nth-child('+keep_track[count-2]+')').children(':nth-child('+keep_track[count-3]+')').children(':nth-child('+keep_track[count-4]+')').get(0));
			// console.log('lol4', count-5, $(this).children(':nth-child('+keep_track[count-2]+')').children(':nth-child('+keep_track[count-3]+')').children(':nth-child('+keep_track[count-4]+')').children(':nth-child('+keep_track[count-5]+')').get(0));
			// console.log('lol5', count-5, $(this).children(':nth-child('+keep_track[count-2]+')').children(':nth-child('+keep_track[count-3]+')').children(':nth-child('+keep_track[count-4]+')').children(':nth-child('+keep_track[count-5]+')').children(':nth-child('+keep_track[count-6]+')').get(0));
		

			var temp_container = $(this);

			element_top_parent_array.push(temp_container);
			
			for (var i=2; i<count+1; i++) {
				temp_container = temp_container.children(':nth-child('+keep_track[count-i]+')');
			}
			// console.log('temp_container', temp_container.get(0));
			
			if(temp_container.get(0)) {
				text_array.push(temp_container.text());
				element_array.push(temp_container.get(0));
			}


			

		});

		console.log('text_array', text_array);
		console.log('element_array', element_array);
		fetch_details(text_array, element_array, element_top_parent_array);
		

	}


	// Only works with English Characters?   Pain with: http://en.wikipedia.org/wiki/List_of_films_considered_the_best
	function fetch_details(text_array, element_array, element_top_parent_array) {

		console.log('element_array:fetch_details', element_array);

		for (var i = 0; i < element_array.length; i++) {
			// console.log('for_loop | element_array', i, element_array[i]);
			// console.log('text_array', i, text_array[i]);
			if (text_array[i].length>2) {
				fetch_source_imdb(text_array[i], element_array[i], element_top_parent_array[i]);
			} 
		}
	}

	function fetch_source_imdb(text, element, element_top_parent){
		$.ajax({
		  url: "http://www.omdbapi.com/?i=&t="+text,
		  crossDomain: true
		}).done(function(data) {
		 // $(element_array[i]).append(data.imdbRating);
		 data = JSON.parse(data);
		 if(data.Response=="False") {
		 	console.log('fail', text);
		 	// If you want to tell that I tried but couldnt recognize the movie name.
		 	// $(element).append("<span class='epinx-com-chrome-extension-rating-not-found'>x</span>");
		 } else {
		 	// console.log('done', text, element, data);
		 	console.log('done', text);
		 	$(element).append("<span class='epinx-com-chrome-extension-rating'>"+data.imdbRating+"</span>");
		 	if (data.imdbRating<7) {
		 		$(element_top_parent).addClass('epinx-com-chrome-extension-fade-title');
		 	}
		 }
		 
		});
	}



}




