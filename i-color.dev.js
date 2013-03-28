;(function(target) {
    target = target || window;


    var
        /**
         * Simple JavaScript library for HEX/RGB/HSB/LAB/XYZ colors based
         * on algorithms from EasyRGB (http://www.easyrgb.com/index.php?X=MATH)
         *
         * @page    http://github.com/Shushik/i-color/
         * @author  Shushik <silkleopard@yandex.ru>
         * @version 1.0
         *
         * @constructor
         *
         * @this    {Color}
         * @param   {String|Object}
         * @param   {String}
         * @returns {String|Object}
         */
        Color = function(raw, out) {
            return this.convert(raw, out);
        };

        Color.prototype = {
            /**
             * @private
             */
            _rgb : {
                r : {
                    min : 0,
                    max : 255
                },
                g : {
                    min : 0,
                    max : 255
                },
                b : {
                    min : 0,
                    max : 255
                }
            },
            /**
             * @private
             */
            _hsv : {
                h : {
                    min : 0,
                    max : 359
                },
                s : {
                    min : 0,
                    max : 100
                },
                v : {
                    min : 0,
                    max : 100
                }
            },
            /**
             * @private
             */
            _xyz : {
                x : {
                    min : 0,
                    max : 95.047
                },
                y : {
                    min : 0,
                    max : 100
                },
                z : {
                    min : 0,
                    max : 108.883
                }
            },
            /**
             * @private
             */
            _lab : {
                l : {
                    min : 0,
                    max : 100
                },
                a : {
                    min : -128,
                    max : 127
                },
                b : {
                    min : -128,
                    max : 127
                }
            },
            /**
             * @private
             */
            _white : {
                x : 95.047,
                y : 100.000,
                z : 108.883
            },
            /**
             * @private
             */
            _human : {
                'red'                  : 'FF0000',
                'tan'                  : 'D2B48C',
                'aqua'                 : '00FFFF',
                'blue'                 : '0000FF',
                'cyan'                 : '00FFFF',
                'gold'                 : 'FFD700',
                'gray'                 : '808080',
                'lime'                 : '00FF00',
                'navy'                 : '000080',
                'peru'                 : 'CD853F',
                'pink'                 : 'FFC0CB',
                'plum'                 : 'DDA0DD',
                'snow'                 : 'FFFAFA',
                'teal'                 : '008080',
                'azure'                : 'F0FFFF',
                'beige'                : 'F5F5DC',
                'black'                : '000000',
                'brown'                : 'A52A2A',
                'coral'                : 'FF7F50',
                'green'                : '008000',
                'ivory'                : 'FFFFF0',
                'khaki'                : 'F0E68C',
                'linen'                : 'FAF0E6',
                'olive'                : '808000',
                'wheat'                : 'F5DEB3',
                'white'                : 'FFFFFF',
                'bisque'               : 'FFE4C4',
                'indigo'               : '4B0082',
                'maroon'               : '800000',
                'orange'               : 'FFA500',
                'orchid'               : 'DA70D6',
                'purple'               : '800080',
                'salmon'               : 'FA8072',
                'sienna'               : 'A0522D',
                'silver'               : 'C0C0C0',
                'tomato'               : 'FF6347',
                'violet'               : 'EE82EE',
                'yellow'               : 'FFFF00',
                'crimson'              : 'DC143C',
                'darkred'              : '8B0000',
                'dimgray'              : '696969',
                'fuchsia'              : 'FF00FF',
                'hotpink'              : 'FF69B4',
                'magenta'              : 'FF00FF',
                'oldlace'              : 'FDF5E6',
                'skyblue'              : '87CEEB',
                'thistle'              : 'D8BFD8',
                'cornsilk'             : 'FFF8DC',
                'darkblue'             : '00008B',
                'darkcyan'             : '008B8B',
                'darkgray'             : 'A9A9A9',
                'deeppink'             : 'FF1493',
                'honeydew'             : 'F0FFF0',
                'lavender'             : 'E6E6FA',
                'moccasin'             : 'FFE4B5',
                'seagreen'             : '2E8B57',
                'seashell'             : 'FFF5EE',
                'aliceblue'            : 'F0F8FF',
                'burlywood'            : 'DEB887',
                'cadetblue'            : '5F9EA0',
                'chocolate'            : 'D2691E',
                'darkgreen'            : '006400',
                'darkkhaki'            : 'BDB76B',
                'firebrick'            : 'B22222',
                'gainsboro'            : 'DCDCDC',
                'goldenrod'            : 'DAA520',
                'indianred'            : 'CD5C5C',
                'lawngreen'            : '7CFC00',
                'lightblue'            : 'ADD8E6',
                'lightcyan'            : 'E0FFFF',
                'lightgrey'            : 'D3D3D3',
                'lightpink'            : 'FFB6C1',
                'limegreen'            : '32CD32',
                'mintcream'            : 'F5FFFA',
                'mistyrose'            : 'FFE4E1',
                'olivedrab'            : '6B8E23',
                'orangered'            : 'FF4500',
                'palegreen'            : '98FB98',
                'peachpuff'            : 'FFDAD9',
                'rosybrown'            : 'BC8F8F',
                'royalblue'            : '4169E1',
                'slateblue'            : '6A5ACD',
                'slategray'            : '708090',
                'steelblue'            : '4682B4',
                'turquoise'            : '40E0D0',
                'aquamarine'           : '7FFFD4',
                'blueviolet'           : '8A2BE2',
                'chartreuse'           : '7FFF00',
                'darkorange'           : 'FF8C00',
                'darkorchid'           : '9932CC',
                'darksalmon'           : 'E9967A',
                'darkviolet'           : '9400D3',
                'dodgerblue'           : '1E90FF',
                'ghostwhite'           : 'F8F8FF',
                'lightcoral'           : 'F08080',
                'lightgreen'           : '90EE90',
                'mediumblue'           : '0000CD',
                'papayawhip'           : 'FFEFD5',
                'powderblue'           : 'B0E0E6',
                'sandybrown'           : 'F4A460',
                'whitesmoke'           : 'F5F5F5',
                'floralwhite'          : 'FFFAF0',
                'forestgreen'          : '228B22',
                'darkmagenta'          : '8B008B',
                'deepskyblue'          : '00BFFF',
                'navajowhite'          : 'FFDEAD',
                'yellowgreen'          : '9ACD32',
                'greenyellow'          : 'ADFF2F',
                'lightsalmon'          : 'FFA07A',
                'lightyellow'          : 'FFFFE0',
                'saddlebrown'          : '8B4513',
                'springgreen'          : '00FF7F',
                'darkseagreen'         : '8FBC8F',
                'antiquewhite'         : 'FAEBD7',
                'lemonchiffon'         : 'FFFACD',
                'lightskyblue'         : '87CEFA',
                'mediumorchid'         : 'BA55D3',
                'mediumpurple'         : '9370D8',
                'midnightblue'         : '191970',
                'darkslateblue'        : '483D8B',
                'darkslategray'        : '2F4F4F',
                'darkturquoise'        : '00CED1',
                'darkgoldenrod'        : 'B8860B',
                'lavenderblush'        : 'FFF0F5',
                'lightseagreen'        : '20B2AA',
                'palegoldenrod'        : 'EEE8AA',
                'paleturquoise'        : 'AFEEEE',
                'palevioletred'        : 'D87093',
                'blanchedalmond'       : 'FFEBCD',
                'cornflowerblue'       : '6495ED',
                'darkolivegreen'       : '556B2F',
                'lightslategray'       : '778899',
                'lightsteelblue'       : 'B0C4DE',
                'mediumseagreen'       : '3CB371',
                'mediumslateblue'      : '7B68EE',
                'mediumturquoise'      : '48D1CC',
                'mediumvioletred'      : 'C71585',
                'mediumaquamarine'     : '66CDAA',
                'mediumspringgreen'    : '00FA9A',
                'lightgoldenrodyellow' : 'FAFAD2'
            },
            /**
             * Instead of nonworking Math.toFixed()
             *
             * @private
             *
             * @this    {Color}
             * @param   {Number}
             * @param   {Number}
             * @returns {Number}
             */
            _round : function(num, after) {
                after = after || 3;

                var
                    reg = new RegExp('^([-\\d]*)(\\.\\d{1,' + after + '})?.*');

                num += '';
                num = num.replace(reg, '$1$2');
                num -= 0;

                return num;
            },
            /**
             * HEX to RGB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {String}
             * @returns {Object}
             */
            _hex2rgb : function(raw) {
                var
                    rgb = {
                        r : 0,
                        g : 0,
                        b : 0
                    };
                if (raw.length == 3) {
                    rgb.r = parseInt((raw.substring(0, 1) + raw.substring(0, 1)), 16);
                    rgb.g = parseInt((raw.substring(1, 2) + raw.substring(1, 2)), 16);
                    rgb.b = parseInt((raw.substring(2, 3) + raw.substring(2, 3)), 16);
                } else {
                    rgb.r = parseInt(raw.substring(0, 2), 16);
                    rgb.g = parseInt(raw.substring(2, 4), 16);
                    rgb.b = parseInt(raw.substring(4, 6), 16);
                }

                return rgb;
            },
            /**
             * HEX to HSV convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {String}
             * @returns {Object}
             */
            _hex2hsv : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._hex2rgb(raw);

                return pttp._rgb2hsv(rgb);
            },
            /**
             * HEX to LAB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {String}
             * @returns {Object}
             */
            _hex2lab : function(raw) {
                var
                    pttp = Color.prototype,
                    xyz  = pttp._hex2xyz(raw);

                return pttp._xyz2lab(xyz);
            },
            /**
             * HEX to XYZ convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {String}
             * @returns {Object}
             */
            _hex2xyz : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._hex2rgb(raw);

                return pttp._rgb2xyz(rgb);
            },
            /**
             * RGB to HSV convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _rgb2hsv : function(raw) {
                var
                    r     = raw.r / 255,
                    g     = raw.g / 255,
                    b     = raw.b / 255,
                    min   = 0,
                    max   = 0,
                    delta = 0,
                    hsv   = {
                        h : 0,
                        s : 0,
                        v : 0
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

                hsv.v = max;
                hsv.s = (max) ? ((max - min) / max) : 0;

                if (!hsv.s) {
                    hsv.h = 0;
                } else {
                    delta = max - min;

                    if (r == max) {
                        hsv.h = (g - b) / delta;
                    } else if (g == max) {
                        hsv.h = 2 + (b - r) / delta;
                    } else {
                        hsv.h = 4 + (r - g) / delta;
                    }

                    hsv.h = parseInt(hsv.h * 60);

                    if (hsv.v < 0) {
                        hsv.v += 360;
                    }
                }

                hsv.s = parseInt(hsv.s * 100);
                hsv.v = parseInt(hsv.v * 100);

                return hsv;
            },
            /**
             * RGB to LAB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _rgb2lab : function(raw) {
                var
                    pttp = Color.prototype,
                    xyz  = pttp._rgb2xyz(raw);

                return pttp._xyz2lab(xyz);
            },
            /**
             * RGB to XYZ convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _rgb2xyz : function(raw) {
                var
                    tmp  = '',
                    loop = '',
                    rgb  = {
                        r : raw.r / 255,
                        g : raw.g / 255,
                        b : raw.b / 255
                    },
                    xyz  = null;

                for (loop in rgb) {
                    if (rgb[loop] > 0.04045) {
                        rgb[loop] = Math.pow(((rgb[loop] + 0.055) / 1.055), 2.4);
                    } else {
                        rgb[loop] /= 12.92;
                    }

                    rgb[loop] = rgb[loop] * 100;
                }

                xyz = {
                    x : rgb.r * 0.4124 + rgb.g * 0.3576 + rgb.b * 0.1805,
                    y : rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722,
                    z : rgb.r * 0.0193 + rgb.g * 0.1192 + rgb.b * 0.9505
                };

                for (loop in xyz) {
                    xyz[loop] = Color.prototype._round(xyz[loop]);
                }

                return xyz;
            },
            /**
             * RGB to HEX convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {String}
             */
            _rgb2hex : function(raw) {
                var
                    loop = '',
                    tmp  = {};

                    tmp.r = raw.r.toString(16),
                    tmp.g = raw.g.toString(16),
                    tmp.b = raw.b.toString(16);

                for (loop in tmp) {
                    if (tmp[loop].length < 2) {
                        tmp[loop] += tmp[loop];
                    }
                }

                return tmp.r + tmp.g + tmp.b;
            },
            /**
             * HSV to RGB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _hsv2rgb : function(raw) {
                var
                    i   = 0,
                    f   = 0,
                    p   = 0,
                    q   = 0,
                    t   = 0,
                    h   = raw.h,
                    s   = raw.s,
                    v   = raw.v,
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
                    v = v / 100;

                    i = parseInt(h);
                    f = h - i;
                    p = v * (1 - s);
                    q = v * (1 - (s * f));
                    t = v * (1 - (s * (1 - f)));

                    switch (i) {

                        case 0:
                            rgb.r = v;
                            rgb.g = t;
                            rgb.b = p;
                        break;

                        case 1:
                            rgb.r = q;
                            rgb.g = v;
                            rgb.b = p;
                        break;

                        case 2:
                            rgb.r = p;
                            rgb.g = v;
                            rgb.b = t;
                        break;

                        case 3:
                            rgb.r = p;
                            rgb.g = q;
                            rgb.b = v;
                        break;

                        case 4:
                            rgb.r = t;
                            rgb.g = p;
                            rgb.b = v;
                        break;

                        case 5:
                            rgb.r = v;
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
             * HSV to LAB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _hsv2lab : function(raw) {
                var
                    pttp = Color.prototype,
                    xyz  = pttp._hsv2xyz(raw);

                return pttp._xyz2lab(xyz);
            },
            /**
             * HSV to XYZ convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _hsv2xyz : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._hsv2rgb(raw);

                return pttp._rgb2xyz(rgb);
            },
            /**
             * HSV to HEX convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {String}
             */
            _hsv2hex : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._hsv2rgb(raw);

                return pttp._rgb2hex(rgb);
            },
            /**
             * LAB to RGB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _lab2rgb : function(raw) {
                var
                    pttp = Color.prototype,
                    xyz  = pttp._lab2xyz(raw);

                return pttp._xyz2rgb(xyz);
            },
            /**
             * LAB to RGB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _lab2hsv : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._lab2rgb(raw);

                return pttp._rgb2hsv(rgb);
            },
            /**
             * LAB to XYZ convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _lab2xyz : function(raw) {
                var
                    loop  = '',
                    powed = 0,
                    xyz   = {},
                    pttp  = Color.prototype,
                    white = pttp._white;

                xyz.y = (raw.l + 16) / 116;
                xyz.x = raw.a / 500 + xyz.y;
                xyz.z = xyz.y - raw.b / 200;

                for (loop in xyz) {
                    powed = Math.pow(xyz[loop], 3);

                    if (powed > 0.008856) {
                        xyz[loop] = powed;
                    } else {
                        xyz[loop] = (xyz[loop] - 16 / 116 ) / 7.787;
                    }

                    xyz[loop] = pttp._round(xyz[loop] * white[loop]);
                }

                return {
                    x : xyz.x,
                    y : xyz.y,
                    z : xyz.z
                };
            },
            /**
             * LAB to HEX convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {String}
             */
            _lab2hex : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._lab2rgb(raw);

                return pttp._rgb2hex(rgb);
            },
            /**
             * XYZ to RGB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _xyz2rgb : function(raw) {
                var
                    loop = '',
                    xyz  = {
                        x : raw.x / 100,
                        y : raw.y / 100,
                        z : raw.z / 100
                    },
                    rgb  = {};

                rgb.r = xyz.x * 3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986;
                rgb.g = xyz.x * -0.9689 + xyz.y * 1.8758 + xyz.z * 0.0415;
                rgb.b = xyz.x * 0.0557 + xyz.y * -0.2040 + xyz.z * 1.0570;

                for (loop in rgb) {
                    rgb[loop] = Color.prototype._round(rgb[loop]);

                    if (rgb[loop] < 0) {
                        rgb[loop] = 0;
                    }

                    if (rgb[loop] > 0.0031308) {
                        rgb[loop] = 1.055 * Math.pow(rgb[loop], (1 / 2.4)) - 0.055;
                    } else {
                        rgb[loop] *= 12.92;
                    }

                    rgb[loop] = Math.round(rgb[loop] * 255);
                }

                return rgb;
            },
            /**
             * XYZ to HSV convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _xyz2hsv : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._xyz2rgb(raw);

                return pttp._rgb2hsv(rgb);
            },
            /**
             * XYZ to LAB convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {Object}
             */
            _xyz2lab : function(raw) {
                var
                    loop  = '',
                    xyz   = {},
                    white = Color.prototype._white;

                for (loop in raw) {
                    xyz[loop] = raw[loop] / white[loop];

                    if (xyz[loop] > 0.008856) {
                        xyz[loop] = Math.pow(xyz[loop], 1 / 3);
                    } else {
                        xyz[loop] = (7.787 * xyz[loop]) + (16 / 116);
                    }
                }

                return {
                    l : 116 * xyz.y - 16,
                    a : 500 * (xyz.x - xyz.y),
                    b : 200 * (xyz.y - xyz.z)
                };
            },
            /**
             * XYZ to HEX convertation
             *
             * @private
             *
             * @this    {Color}
             * @param   {Object}
             * @returns {String}
             */
            _xyz2hex : function(raw) {
                var
                    pttp = Color.prototype,
                    rgb  = pttp._xyz2rgb(raw);

                return pttp._rgb2hex(rgb);
            },
            /**
             * Get a type of the given color
             *
             * @this    {Color}
             * @param   {String|Object}
             * @returns {Boolean|String}
             */
            type : function(raw) {
                var
                    loop  = '',
                    check = '';

                if (typeof raw == 'object') {
                    for (loop in raw) {
                        raw[loop] -= 0;
                    }

                    if (!isNaN(raw.r) || !isNaN(raw.g)) {
                        return 'rgb';
                    } else if (!isNaN(raw.h) || !isNaN(raw.s)) {
                        return 'hsv';
                    } else if (!isNaN(raw.x) ||!isNaN(raw.z)) {
                        return 'xyz';
                    } else if (!isNaN(raw.l) || !isNaN(raw.a)) {
                        return 'lab';
                    } else if (!isNaN(raw.c) || !isNaN(raw.m) || !isNaN(raw.k)) {
                        return 'cmyk';
                    }
                } else if (
                    typeof raw == 'number' ||
                    typeof raw == 'string'
                ) {
                    check = raw.substring(0, 4);

                    if (check == 'rgb(' || check == 'rgba') {
                        return 'css';
                    } else {
                        return 'hex';
                    }
                }

                return false;
            },
            /**
             * Validate the given color
             *
             * @this    {Color}
             * @param   {String|Object}
             * @param   {Boolean}
             * @returns {Boolean|Object}
             */
            validate : function(raw, object) {
                object = object || false;

                var
                    pttp   = Color.prototype,
                    type   = pttp.type(raw),
                    loop   = '',
                    check  = '',
                    tmp    = null,
                    origin = null;

                if (type) {
                    if (type == 'css') {
                        origin = pttp._rgb;
                        type   = 'rgb';
                        tmp    = raw.replace(/rgb(a)?\(|\)/g, '').split(/,\s?/);
                        raw    = {r : tmp[0], g : tmp[1], b : tmp[2]};
                    } else {
                        origin = pttp['_' + type];
                    }

                    switch (type) {

                        case 'css':
                        case 'rgb':
                        case 'hsv':
                        case 'lab':
                        case 'xyz':
                        case 'cmyk':
                            for (loop in origin) {
                                if (!raw[loop] || raw[loop] < origin[loop].min) {
                                    raw[loop] = origin[loop].min;
                                } else if (raw[loop] > origin[loop].max) {
                                    if (type == 'hsv' && loop == 'h') {
                                        raw[loop] = 0;
                                    } else {
                                        raw[loop] = origin[loop].max;
                                    }
                                }
                            }
                        break;

                        case 'hex':
                            check = pttp._human[raw.toLowerCase()];

                            if (check) {
                                raw = check;
                            } else {
                                raw  = ('' + raw)
                                       .toUpperCase()
                                       .replace(/^#/g, '')
                                       .replace(/[^A-F0-9]/g, '0');
                                loop = raw.length;

                                if (loop < 6 && loop > 3) {
                                    raw += ('000000').substring(loop, 6 - loop);
                                } else if (loop < 6 && loop < 3) {
                                    raw += ('000').substring(loop, 3 - loop);
                                } else if (loop > 6) {
                                    raw = raw.substring(0, 6);
                                }
                            }
                        break;

                    }

                    if (object) {
                        return {
                            type : type,
                            raw  : raw
                        };
                    }

                    return raw;
                }

                return false;
            },
            /**
             * Convert a given color into needed format
             *
             * @this    {Color}
             * @param   {String|Object}
             * @param   {String}
             * @returns {String|Object}
             */
            convert : function(raw, out) {
                out = out || 'rgb';

                var
                    alias = '',
                    pttp  = Color.prototype,
                    valid = pttp.validate(raw, true);

                if (valid) {
                    alias = '_' + valid.type + '2' + out;

                    if (pttp[alias]) {
                        return pttp[alias](valid.raw);
                    }
                }

                return false;
            },
            /**
             * Invert a given color
             *
             * @this    {Color}
             * @param   {String|Object}
             * @param   {String}
             * @returns {String|Object}
             */
            invert : function(raw, out) {
                out = out || 'rgb';

                var
                    loop  = '',
                    pttp  = Color.prototype,
                    rgb   = null,
                    valid = pttp.validate(raw, true);

                if (valid) {
                    rgb = pttp['_' + valid.type + '2rgb'](valid.raw);

                    for (loop in rgb) {
                        rgb[loop] = 255 - rgb[loop];
                    }

                    if (out != 'rgb') {
                        return pttp['_rgb2' + out](rgb);
                    }

                    return rgb;
                }

                return false;
            }
        };

        /**
         * Static links to prototype methods
         *
         * @static
         */
        Color.type     = Color.prototype.type;
        Color.invert   = Color.prototype.invert;
        Color.convert  = Color.prototype.convert;
        Color.validate = Color.prototype.validate;


    // Appear in the given namespace
    target.Color = Color;


// If you wish to chage context for Color library,
// change it here
})(window);