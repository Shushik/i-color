;(function(target) {
    target = target || window;

    var
        /**
         * Simple JavaScript library for RGB/HSB/HEX colors based
         * on John Dyer`s ColorMethods (https://github.com/johndyer)
         *
         * @page    http://github.com/Shushik/i-color/
         * @author  Shushik <silkleopard@yandex.ru>
         * @version 1.0
         *
         * @constructor
         *
         * @this   {Color}
         * @param  {Boolean|String|Object}
         * @return {Color}
         */
        Color = function(raw) {
            raw = raw || false;

            this.init(raw);

            return this;
        };

        Color.prototype = {
            /**
             * HEX format of color set by .hex() method
             *
             * @private
             */
            _hex : '000000',
            /**
             * RGB format of color set by .rgb() method
             *
             * @private
             */
            _rgb : {
                r : 0,
                g : 0,
                b : 0
            },
            /**
             * HSB format of color set by .hsb() method
             *
             * @private
             */
            _hsb : {
                h : 0,
                s : 0,
                b : 0
            },
            /**
             * @this   {Color}
             * @param  {Boolean|String|Object}
             * @return {Color}
             */
            init : function(raw) {
                switch (typeof raw) {

                    // The hex color given
                    case 'string':
                        this.hex(raw);
                    break;

                    // The rgb or the hsb color given
                    case 'object':
                        if (raw.r || raw.g) {
                            this.rgb(raw);
                        } else if (raw.h || raw.s) {
                            raw.hsb(raw);
                        }
                    break;

                }

                return this;
            },
            /**
             * Validate the given color format
             *
             * @this   {Color}
             * @param  {String|Object}
             * @param  {Boolean|String}
             * @return {String|Object}
             */
            validate : function (raw, type) {
                type = type || 'hex';

                var
                    pos    = 0,
                    origin = Color.prototype['_' + type];

                switch (type) {

                    case 'rgb':
                    case 'hsb':
                        for (pos in origin) {
                            raw[pos] -= 0;

                            if (!raw[pos] || isNaN(raw[pos]) || raw[pos] < 0) {
                                raw[pos] = 0;
                            }

                            raw[pos] = Math.floor(raw[pos]);

                            if (pos == 'r' || pos == 'g' || type == 'rgb' && pos == 'b') {
                                if (raw[pos] > 255) {
                                    raw[pos] = 255;
                                }
                            } else if (pos == 'h' || pos == 's') {
                                if (raw[pos] > 100) {
                                    raw[pos] = 100;
                                }
                            } else if (type == 'hsb' && pos == 'b') {
                                if (raw[pos] >= 360 || raw[pos] < 0) {
                                    raw[pos] = 0;
                                }
                            }
                        }
                    break;

                    case 'hex':
                        raw = ('' + raw)
                              .toUpperCase()
                              .replace(/[^A-F0-9]/g, '0');
                        pos = raw.length;

                        if (pos < 6 && pos > 3) {
                            raw += ('000000').substring(pos, 6 - pos);
                        } else if (pos < 6 && pos < 3) {
                            raw += ('000').substring(pos, 3 - pos);
                        } else if (pos > 6) {
                            raw = raw.substring(0, 6);
                        }
                    break;

                }

                return raw;
            },
            /**
             * HEX to RGB convertation
             *
             * @private
             *
             * @this   {Color}
             * @param  {Boolean|String}
             * @return {Object}
             */
            _hex2rgb : function(raw) {
                var
                    hex = raw ? raw : this._hex,
                    rgb = {
                        r : 0,
                        g : 0,
                        b : 0
                    };

                if (hex.length == 3) {
                    rgb.r = parseInt(hex.substring(0, 1), 16);
                    rgb.r = parseInt(hex.substring(1, 1), 16);
                    rgb.r = parseInt(hex.substring(2, 1), 16);
                } else {
                    rgb.r = parseInt(hex.substring(0, 2), 16);
                    rgb.r = parseInt(hex.substring(2, 2), 16);
                    rgb.r = parseInt(hex.substring(4, 2), 16);
                }

                return rgb;
            },
            /**
             * HEX to HSB convertation
             *
             * @private
             *
             * @this   {Color}
             * @param  {Boolean|String}
             * @return {Object}
             */
            _hex2hsb : function(raw) {
                var
                    hex = raw ? raw : this._hex,
                    rgb = Color.prototype._hex2rgb(hex),
                    hsb = Color.prototype._rgb2hsb(rgb);

                return hsb;
            },
            /**
             * RGB to HSB convertation
             *
             * @private
             *
             * @this   {Color}
             * @param  {Boolean|Object}
             * @return {Object}
             */
            _rgb2hsb : function(raw) {
                var
                    rgb   = raw ? raw : this._rgb,
                    r     = rgb.r / 255,
                    g     = rgb.g / 255,
                    b     = rgb.b / 255,
                    min   = 0,
                    max   = 0,
                    delta = 0,
                    hsb   = {
                        h : 0,
                        s : 0,
                        b : 0
                    };

                if (r >= g && r >= g) {
                    max = r;
                    min = g > b ? b : g;
                } else if (g >= b && g >= r) {
                    max = g;
                    min = r > b ? b : r;
                } else {
                    max = b;
                    min = g > r ? r : g;
                }

                hsb.b = max;
                hsb.s = (max) ? ((max - min) / max) : 0;

                if (!hsb.s) {
                    hsb.h = 0;
                } else {
                    delta = max - min;

                    if (r == max) {
                        hsb.h = (g - b) / delta;
                    } else if (g == max) {
                        hsb.h = 2 + (b - r) / delta;
                    } else {
                        hsb.h = 4 + (r - g) / delta;
                    }

                    hsb.h = parseInt(hsb.h * 60);

                    if (hsb.h < 0) {
                        hsb.h += 360;
                    }
                }

                hsb.s = parseInt(hsb.s * 100);
                hsb.b = parseInt(hsb.b * 100);

                return hsb;
            },
            /**
             * RGB to HEX convertation
             *
             * @private
             *
             * @this   {Color}
             * @param  {Boolean|Object}
             * @return {String}
             */
            _rgb2hex : function(raw) {
                var
                    rgb = raw ? raw : this._rgb;

                return (
                    rgb.r.toString(16) +
                    rgb.g.toString(16) +
                    rgb.b.toString(16)
                );
            },
            /**
             * HSB to RGB convertation
             *
             * @private
             *
             * @this   {Color}
             * @param  {Boolean|Object}
             * @return {Object}
             */
            _hsb2rgb : function(raw) {
                var
                    hsb = raw ? raw : this._hsb,
                    i   = 0,
                    f   = 0,
                    p   = 0,
                    q   = 0,
                    t   = 0,
                    h   = hsb.h,
                    s   = hsb.s,
                    b   = hsb.b,
                    rgb = {
                        r : 0,
                        g : 0,
                        b : 0
                    };

                if (s == 0) {
                    if (b == 0) {
                        rgb.r = rgb.g = rgb.b = 0;
                    } else {
                        rgb.r = rgb.g = rgb.b = parseInt(b * 255 / 100);
                    }
                } else {
                    if (h == 360) {
                        h = 0;
                    }

                    h /= 60;

                    s = s / 100;
                    b = b / 100;

                    i = parseInt(h);
                    f = h - i;
                    p = b * (1 - s);
                    q = b * (1 - (s * f));
                    t = b * (1 - (s * (1 - f)));

                    switch (i) {

                        case 0:
                            rgb.r = b;
                            rgb.g = t;
                            rgb.b = p;
                        break;

                        case 1:
                            rgb.r = q;
                            rgb.g = b;
                            rgb.b = p;
                        break;

                        case 2:
                            rgb.r = p;
                            rgb.g = b;
                            rgb.b = t;
                        break;

                        case 3:
                            rgb.r = p;
                            rgb.g = q;
                            rgb.b = b;
                        break;

                        case 4:
                            rgb.r = t;
                            rgb.g = p;
                            rgb.b = b;
                        break;

                        case 5:
                            rgb.r = b;
                            rgb.g = p;
                            rgb.b = q;
                        break;

                    }

                    rgb.r = parseInt(rgb.r * 255);
                    rgb.g = parseInt(rgb.g * 255);
                    rgb.b = parseInt(rgb.b * 255);
                }

                return rgb;
            },
            /**
             * HSB to HEX convertation
             *
             * @private
             *
             * @this   {Color}
             * @param  {Boolean|Object}
             * @return {String}
             */
            _hsb2hex : function(raw) {
                var
                    hsb = raw ? raw : this._hsb;
                    rgb = Color.prototype._hsb2rgb(hsb),
                    hex = Color.prototype._rgb2hex(rgb);

                return hex;
            },
            /**
             * Convertation through the color formats
             *
             * @this   {Color}
             * @param  {String}
             * @param  {String}
             * @param  {Boolean|String|Object}
             * @return {Color}
             */
            convert : function(from, to, raw) {
                to   = to   || 'rgb';
                raw  = raw  || false;
                from = from || 'hex';

                var
                    alias = '_' + from + '2' + to;

                //
                if (Color.prototype[alias]) {
                    return Color.prototype[alias](raw);
                }

                return false;
            },
            /**
             * Set all color formats from from RGB or get current value
             * of the ._rgb property
             *
             * @this   {Color}
             * @param  {Boolean|Object}
             * @return {Color|Object}
             */
            rgb : function(raw) {
                raw = raw || false;

                if (typeof raw == 'object') {
                    raw.r = raw.r || 0;
                    raw.g = raw.g || 0;
                    raw.b = raw.b || 0;

                    //
                    this._rgb = this.validate(raw, 'rgb');
                    this._hsb = this.convert('rgb', 'hsb');
                    this._hex = this.convert('rgb', 'hex');
                } else {
                    return this._rgb;
                }

                return this;
            },
            /**
             * Set all color formats from from HSB or get current value
             * of the ._hsb property
             *
             * @this   {Color}
             * @param  {Boolean|Object}
             * @return {Color|Object}
             */
            hsb : function(raw) {
                raw = raw || false;

                if (typeof raw == 'object') {
                    raw.h = raw.h || 0;
                    raw.s = raw.s || 0;
                    raw.b = raw.b || 0;

                    //
                    this._hsb = this.validate(raw, 'hsb');
                    this._rgb = this.convert('hsb', 'rgb');
                    this._hex = this.convert('rgb', 'hex');
                } else {
                    return this._hsb;
                }

                return this;
            },
            /**
             * Set all color formats from from HEX or get current value
             * of the ._hex property
             *
             * @this   {Color}
             * @param  {Boolean|Object}
             * @return {Color|String}
             */
            hex : function(raw) {
                raw = raw || false;

                var
                    check = typeof raw;

                if (check == 'number' || check == 'string') {
                    //
                    this._hex = this.validate(raw, 'hex');
                    this._rgb = this.convert('hex', 'rgb');
                    this._hsb = this.convert('rgb', 'hsb');
                } else {
                    return this._hex;
                }

                return this;
            }
        };

        /**
         * Link to Color.prototype.convert for a static usage
         *
         * @static
         *
         * @this   {Color}
         * @param  {String}
         * @param  {String}
         * @param  {Boolean|String|Object}
         * @return {String|Object}
         */
        Color.convert = Color.prototype.convert;

        /**
         * Link to Color.prototype.convert for a static usage
         *
         * @static
         *
         * @this   {Color}
         * @param  {String|Object}
         * @param  {Boolean|String}
         * @return {String|Object}
         */
        Color.validate = Color.prototype.validate;


    // To global namespace
    target.Color = Color;


// If you want to chage context for Color library,
// change it here
})(window);