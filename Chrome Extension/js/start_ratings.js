// Get the URLs

$ = window.jQuery;

setTimeout(myFunction, 1000);

$('body').find('#epinx-com-chrome-extension-guide').remove();
$('body').append('<div id="epinx-com-chrome-extension-guide" style=""> Please wait. </div> ');
var element_guide = $('#epinx-com-chrome-extension-guide');



// See this later.

// $('a').click(function() {
//    $(this).attr('href', '#');
//    return true;
// });

function myFunction() {

	var level = 0;
	var selected_element = {};



    // Alternate method, deprecated!

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




