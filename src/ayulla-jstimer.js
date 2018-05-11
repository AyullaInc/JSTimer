(function($) {

    var hours, minutes, seconds, warning, redWarning;
    var onHour = true, onMinute = true;
    var settings, height, id;


    $.fn.AyullaTimer = function ( time, options ) {
        totalTime = time;
        //default settings
        settings = $.extend({
            initColor       : '#5390E3',
            warningColor    : '#5390E3',
            closingColor    : '#5390E3',
            fontFamily      : "-apple-system, BlinkMacSystemFont, 'Open Sans', sans-serif",
            removePadding   : false,
            addPadding      : 20,
            margin          : 0,
        }, options);

        if (settings.totalTime == 0) {
            throw "Time (in minutes) must be provided";
            return this;
        }

        this.css({
            'height'        : 'auto',
            'width'         : 'auto',
            'color'         : settings.initColor,
            'display'       : 'flex',
            'position'      : 'absolute',
            'font-family'   : settings.fontFamily,
            'margin'        : settings.margin + 'px',
        });

        id = this.attr('id');


        if (settings.removePadding)
            this.css('padding', '0px');
        else
            this.css('padding', settings.addPadding + 'px');

        calculateTimes (totalTime);
        var toAppend = getToAppend();
        this.html(toAppend);
        initTimer();
        setInterval(updateMinutes, 60000);
        setInterval(updateSeconds, 1000)
    }

    //private functiom to allocate timing
    function calculateTimes (timeInMinutes) {
        //calculate hours, minutes, and seconds from given time
        hours = Math.floor(timeInMinutes / 60);
        minutes = timeInMinutes - hours * 60;
        seconds = 0;

        warning = Math.floor(timeInMinutes * 0.3);
        redWarning = Math.floor(timeInMinutes * 0.1);

        if (warning > 60) {
            warning = 60;
            redWarning = 25;
        }

        if (redWarning == 0) {
            if (warning == 0) {
                warning = Math.floor(timeInMinutes/2);
                redWarning = Math.floor(warning/2);
            } else {
                redWarning = Math.floor(warning/2);
            }
        }

        if (hours > 0) {
            onMinute = false;
        } else {
            onHour = false;
        }
    }

    function updateMinutes() {
        if (onHour) {
            minutes--;
            if (minutes <= 0 && hours > 1) {
                hours--;
                minutes = 60;
            } else if(minutes < 0 && hours == 1) {
                hours--;
                hours = 59;
                minutes = 59;
                seconds = 60;
                onHour = false;
                onMinute = true;
            }

            //set hours
            if (hours < 10) {
                if (minutes == 60) {
                    if (hours+1 >= 10)
                        $("#first-set").text(hours+1);
                    else
                        $("#first-set").text("0" + (hours+1));
                }
                else
                    $("#first-set").text("0" + hours)
            } else {
                if (minutes == 60)
                    $("#first-set").text((hours+1));
                else
                    $("#first-set").text(hours);
            }
            $("#first-set-tile").text("HOURS");
            if (hours == 1) {
                $("#first-set-tile").text("HOUR");
            }

            //set minutes
            if (minutes < 10 || minutes == 60) {
                if (minutes == 60) {
                    $("#second-set").text("00");
                } else {
                    $("#second-set").text("0" + minutes);
                }

            } else {
                $("#second-set").text(minutes);
            }
            $("#second-set-tile").text("MINUTES");
            if (minutes == 1) {
                $("#second-set-tile").text("MINUTE");
            }
        }
    }

    function updateSeconds() {
        if (onMinute) {
            seconds--;
            if (seconds <= 0 && minutes > 0) {
                minutes--;
                seconds = 60;
            } else if(seconds == 0 && minutes == 0) {
                onMinute = false;
                //code to submit assignment
            }
            //set minutes
            if (minutes < 10) {
                if (seconds == 60) {
                    if (minutes + 1 >= 10)
                        $("#first-set").text(minutes + 1);
                    else
                        $("#first-set").text("0" + (minutes + 1));
                } else
                    $("#first-set").text("0" + minutes)
            } else {
                if (seconds == 60)
                    $("#first-set").text((minutes+1));
                else
                    $("#first-set").text(minutes);
            }
            $("#first-set-tile").text("MINUTES");
            if (minutes == 1) {
                $("#first-set-tile").text("MINUTE");
            }

            //set seconds
            if (seconds < 10 || seconds == 60) {
                if (seconds == 60) {
                    $("#second-set").text("00");
                } else {
                    $("#second-set").text("0" + seconds);
                }
            } else {
                $("#second-set").text(seconds);
            }
            $("#second-set-tile").text("SECONDS");
            if (seconds == 1) {
                $("#second-set-tile").text("SECOND");
            }
            var timeRemaining = minutes;
            if (timeRemaining <= warning)
                $("#"+id).css("color", settings.warningColor);
            if (timeRemaining <= redWarning)
                $("#"+id).css("color", settings.closingColor);
        }
    }

    //private function to create DOM elements
    function getToAppend() {
        var appendString = "";
        appendString = '<div><p id="first-set"></p><p id="first-set-tile"></p></div>';
        appendString += '<div><p id="styled-as-colon">:</p></div>';
        appendString += '<div><p id="second-set"></p><p id="second-set-tile"></p></div>';
        return appendString;
    }

    //private function to init timer
    function initTimer() {
        if (hours > 0) {
            //set hours
            if (hours < 10) {
                 $("#first-set").text("0" + hours);
            } else {
                $("#first-set").text(hours);
            }
            $("#first-set-tile").text("HOURS");
            if (hours == 1) {
                $("#first-set-tile").text("HOUR");
            }

            //set minutes
            if (minutes < 10) {
                 $("#second-set").text("0" + minutes);
            } else {
                $("#second-set").text(minutes);
            }
            $("#second-set-tile").text("MINUTES");
            if (minutes == 1) {
                $("#second-set-tile").text("MINUTE");
            }
        } else {
            //set minutes
            if (minutes < 10) {
                 $("#first-set").text("0" + minutes);
            } else {
                $("#first-set").text(minutes);
            }
            $("#first-set-tile").text("MINUTES");
            if (minutes == 1) {
                $("#first-set-tile").text("MINUTE");
            }

            //set seconds
            $("#second-set").text("00");
            $("#second-set-tile").text("SECONDS");
        }
    }

}(jQuery));