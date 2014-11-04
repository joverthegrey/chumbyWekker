$(function(){
        
        var alarm_on = true;

	// Cache some selectors

	var clock = $('#clock'),
		alarm = clock.find('.alarm'),
		ampm = clock.find('.ampm');

	// Map digits to their names (this will be an array)
	var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

	// This object will hold the digit elements
	var digits = {};

	// Positions for the hours, minutes, and seconds
	var positions = [
		'h1', 'h2', ':', 'm1', 'm2'
	];

	// Generate the digits with the needed markup,
	// and add them to the clock

	var digit_holder = clock.find('.digits');

	$.each(positions, function(){

		if(this == ':'){
			digit_holder.append('<div class="dots">');
		}
		else{

			var pos = $('<div>');

			for(var i=1; i<8; i++){
				pos.append('<span class="d' + i + '">');
			}

			// Set the digits as key:value pairs in the digits object
			digits[this] = pos;

			// Add the digit elements to the page
			digit_holder.append(pos);
		}

	});

	// Add the weekday names

	var weekday_names = 'MON TUE WED THU FRI SAT SUN'.split(' '),
		weekday_holder = clock.find('.weekdays');

	$.each(weekday_names, function(){
		weekday_holder.append('<span>' + this + '</span>');
	});

	var weekdays = clock.find('.weekdays span');


	// Run a timer every second and update the clock

	(function update_time(){

		// Use moment.js to output the current time as a string
		// HH is for the hours in 24-hour format,
		// mm - minutes, ss-seconds (all with leading zeroes),
		// d is for day of week

		var now = moment().format("HHmmssd");

		digits.h1.attr('class', digit_to_name[now[0]]);
		digits.h2.attr('class', digit_to_name[now[1]]);
		digits.m1.attr('class', digit_to_name[now[2]]);
		digits.m2.attr('class', digit_to_name[now[3]]);

		// The library returns Sunday as the first day of the week.
		// Stupid, I know. Lets shift all the days one position down, 
		// and make Sunday last

		var dow = now[6];
		dow--;
		
		// Sunday!
		if(dow < 0){
			// Make it last
			dow = 6;
		}

		// Mark the active day of the week
		weekdays.removeClass('active').eq(dow).addClass('active');

                var dots = clock.find('.dots');
                
                var sec = now[4] + now[5];
                
                if(sec % 2 == 0){
                    dots.attr('style','opacity: 0;');
                } else {
                    dots.attr('style','opacity: 1;');
                }
                
                if(sec % 60 == 0){
                    //call the servlet and check nightmode
                    $.ajax({
                        url : "AlarmServlet",
                        dataType : 'json',
                        error : function() {

                            alert("Error Occured");
                        },
                        success : function(data) {
                            
                            // check for nightmode 
                            if(data.nightmode)
                            {
                                if(data.nightmode == "on") {
                                    clock.attr("class", "dark");
                                } else {
                                    clock.attr("class", "light");
                                }
                            }
                            
                            // check for alarm
                            if(data.alarm)
                            {
                                //alarm af laten gaan
                                
                            }

                        }
                    });

                }

                // Schedule this function to be run again in 1 sec
		setTimeout(update_time, 1000);

	})();


	// Toggle the alarm
	$('a.button').click(function(){
                alarm_on = !alarm_on;
                if (alarm_on) {
                    alarm.attr('style', 'opacity: 1');
                } else {
                    alarm.attr('style', 'opacity: 0.2');
                }
	});

});