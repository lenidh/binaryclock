/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Moritz Heindl <lenidh[at]gmail[dot]com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function($) {

    // Update a binary clock.
    function updateClock(clock) {
        var date = new Date();
        clock._setHours(date.getHours());
        clock._setMinutes(date.getMinutes());
        clock._setSeconds(date.getSeconds())
    };

    // A binary clock widget.
    $.widget('lenidh.binaryclock', {

        // default options
        options: {
            prefix: 'binaryclock',
            bcd: true, // TODO: implement more clock types.
        },

        // widget initializer function
        _create: function() {
            var prefix = this.options.prefix;

            this.element.append('<div class="' + prefix + '-hh"></div>');
            this.element.append('<div class="' + prefix + '-mm"></div>');
            this.element.append('<div class="' + prefix + '-ss"></div>');

            for (var i = 0; i < 5; i++) {
                this.element.children('.' + prefix + '-hh')
                    .append('<div class="' + prefix + '-pin" />');
            };
            for (var i = 0; i < 6; i++) {
                this.element.children('.' + prefix + '-mm')
                    .append('<div class="' + prefix + '-pin" />');
            };
            for (var i = 0; i < 6; i++) {
                this.element.children('.' + prefix + '-ss')
                    .append('<div class="' + prefix + '-pin" />');
            };

            var clock = this;
            setInterval(function () { updateClock(clock); }, 1000);
        },

        // Set the hours component of the clock.
        _setHours: function(hours) {
            var prefix = this.options.prefix;

            for (var i = 0; i < 5; i++) {
                var pin = this.element
                    .find('.' + prefix + '-hh .' + prefix + '-pin:nth-child(' + (5 - i) + ')');
                if(hours & 1<<i) {
                    pin.addClass('active');
                } else {
                    pin.removeClass('active');
                }
            }
        },

        // Set the minutes component of the clock.
        _setMinutes: function(minutes) {
            var prefix = this.options.prefix;

            for (var i = 0; i < 6; i++) {
                var pin = this.element
                    .find('.' + prefix + '-mm .' + prefix + '-pin:nth-child(' + (6 - i) + ')');
                if(minutes & 1<<i) {
                    pin.addClass('active');
                } else {
                    pin.removeClass('active');
                }
            }
        },

        // Set the seconds component of the clock.
        _setSeconds: function(seconds) {
            var prefix = this.options.prefix;

            for (var i = 0; i < 6; i++) {
                var pin = this.element
                    .find('.' + prefix + '-ss .' + prefix + '-pin:nth-child(' + (6 - i) + ')');
                if(seconds & 1<<i) {
                    pin.addClass('active');
                } else {
                    pin.removeClass('active');
                }
            }
        },

    });

} (jQuery));
