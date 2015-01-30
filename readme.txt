    i-color, simple JavaScript library for HEX/RGB/HSV/LAB/XYZ colors based on algorithms from EasyRGB (http://www.easyrgb.com/index.php?X=MATH).


    Goods:

    — simple syntax;
    — compatibility with all existant frameworks;
    — hex/rgb/hsv/lab/xyz converter;
    — human colors name and rgb/rgba css syntax are available;
    — color format validator;
    — color inverter,
    — static syntax (no need to make an example to use IColor object methods.



    Requirements:

    — JavaScript.



    Code example:

    <code>
        <script type="text/javascript" src="i-color.js"></script>
        <script type="text/javascript">
            var
                color   = 0,
                format  = 0,
                colors  = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'],
                formats = ['hex', 'hsv', 'lab', 'rgb', 'xyz'];

            for (format in formats) {
                color = Math.floor(Math.random() * colors.length);

                console.log(formats[format], colors[color], IColor(colors[color], formats[format]));
            }
        </script>
    </code>



    IColor():

    <code>
        <script type="text/javascript" src="i-color.js"></script>
        <script type="text/javascript">
            // Get XYZ from RGB
            console.log(IColor({r : 055, g : 155, b : 255}, 'XYZ'));
        </script>
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    ---------------------------------------------------------------------
     out      | string with the following value: HEX, HSV, LAB, RGB, XYZ
              | (RGB by the default)
    =====================================================================



    IColor.invert():

    <code>
        // Get an inverted color
        IColor.invert('purple'); // {r=127, g=255, b=127}
        IColor.convert({w : -1, u : 0, t : 1}); // null
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    ---------------------------------------------------------------------
     out      | string with the following value: HEX, HSV, LAB, RGB, XYZ
              | (RGB by the default)
    =====================================================================



    IColor.convert():

    <code>
        // Get a color in chosen format
        IColor.convert({l : 90, a : -7, b : -14}, 'HEX');
        IColor.convert({w : -1, u : 0, t : 1}); // null
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    ---------------------------------------------------------------------
     out      | string with the following value: HEX, HSV, LAB, RGB, XYZ
              | (RGB by the default)
    =====================================================================



    IColor.identify():

    <code>
        // Get a color format
        IColor.identify('#BADBAD'); // HEX
        IColor.identify({l : 90, a : -7, b : -14}); // LAB
        IColor.identify({w : -1, u : 0, t : 1}); // null
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    =====================================================================



    IColor.HEX():

    <code>
        var
            hex = IColor.HEX({l : 90, a : -7, b : -14}); // c4e8fd

        console.log(IColor.HEX.HSV(hex));
        console.log(IColor.HEX.LAB(hex));
        console.log(IColor.HEX.RGB(hex));
        console.log(IColor.HEX.XYZ(hex));
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    =====================================================================



    IColor.HEX.check():

    <code>
        // Check if a given color format is HEX
        console.log(IColor.HEX.check('0DEAD0')); // true
        console.log(IColor.HEX.check('#FACE8D')); // true
        console.log(IColor.HEX.check('#trololo')); // false
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string which presumably is the HEX formatted color
    =====================================================================




    IColor.HEX.human():

    <code>
        // Get a HEX formatted color from a human color name
        console.log(IColor.HEX.human('seagreen')); // 2E8B57
        console.log(IColor.HEX.human('light goldenrod yellow')); // FAFAD2
        console.log(IColor.HEX.human('trololo')); // null
    </code>


    Arguments:

     argument | description
    =====================================================================
     keyword  | string with the human color name (with spaces )
    =====================================================================



    IColor.HSV():

    <code>
        var
            hsv = IColor.HSV({r : 60, g : 177, b : 74}); // {h=127, s=66, v=69}

        console.log(IColor.HSV.HEX(hsv));
        console.log(IColor.HSV.LAB(hsv));
        console.log(IColor.HSV.RGB(hsv));
        console.log(IColor.HSV.XYZ(hsv));
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    =====================================================================



    IColor.HSV.check():

    <code>
        // Check if a given color format is HSV
        console.log(IColor.HSV.check({h:127, s:66, v:69})); // true
        console.log(IColor.HSV.check({w:-1, u:0, t:1})); // false
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | object which presumably is the HSV formatted color
    =====================================================================



    IColor.LAB():

    <code>
        var
            lab = IColor.LAB('antiquewhite'); // {l=93.73079174967708, a=1.8418379936777085, b=11.517150228348449}

        console.log(IColor.LAB.HEX(lab));
        console.log(IColor.LAB.HSV(lab));
        console.log(IColor.LAB.RGB(lab));
        console.log(IColor.LAB.XYZ(lab));
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    =====================================================================



    IColor.LAB.check():

    <code>
        // Check if a given color format is LAB
        console.log(IColor.LAB.check({l : 93.73079174967708, a : 1.8418379936777085, b : 11.517150228348449})); // true
        console.log(IColor.LAB.check({w : -1, u : 0, t : 1})); // false
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | object which presumably is the LAB formatted color
    =====================================================================



    IColor.RGB():

    <code>
        var
            rgb = IColor.RGB({l : 93.73079174967708, a : 1.8418379936777085, b : 11.517150228348449}); // {r=250, g=235, b=215}

        console.log(IColor.RGB.HEX(rgb));
        console.log(IColor.RGB.HSV(rgb));
        console.log(IColor.RGB.LAB(rgb));
        console.log(IColor.RGB.XYZ(rgb));
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    =====================================================================



    IColor.RGB.check():

    <code>
        // Check if a given color format is RGB
        console.log(IColor.LAB.check({r : 250, g : 235, b : 215})); // true
        console.log(IColor.LAB.check({w : -1, u : 0, t : 1})); // false
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | object which presumably is the RGB formatted color
    =====================================================================



    IColor.XYZ():

    <code>
        var
            xyz = IColor.XYZ('#FACE8D'); // {x=66.303, y=66.39, z=34.519}

        console.log(IColor.XYZ.HEX(xyz));
        console.log(IColor.XYZ.HSV(xyz));
        console.log(IColor.XYZ.LAB(xyz));
        console.log(IColor.XYZ.RGB(xyz));
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | string with the HEX or object with HSV, LAB, RGB
              | or XYZ formatted color
    =====================================================================



    IColor.XYZ.check():

    <code>
        // Check if a given color format is XYZ
        console.log(IColor.XYZ.check({x : 66.303, y : 66.39, z : 34.519})); // true
        console.log(IColor.XYZ.check({w : -1, u : 0, t : 1})); // false
    </code>


    Arguments:

     argument | description
    =====================================================================
     raw      | object which presumably is the RGB formatted color
    =====================================================================