    i-color, simple JavaScript library for HEX/RGB/HSV/LAB/XYZ colors based on algorithms from EasyRGB (http://www.easyrgb.com/index.php?X=MATH).


    Goods:

    — simple syntax;
    — compatibility with all existant frameworks;
    — hex/rgb/hsv/lab/xyz converter;
    — human colors name and rgb/rgba css syntax are available;
    — color format validator;
    — color inverter,
    — static syntax (no need to make an example to use Color object methods.


    Requirements:

    — JavaScript.


    Code example:

    <code>
        <script type="text/javascript" src="i-color.min.js"></script>
        <script type="text/javascript">
            var lab = Color.convert('red', 'lab');

            console.log(lab);
        </script>
    </code>


    .validate() method:

    Gets a hex/rgb/rgba string or rgb/hsv/lab/xyz object and checks
    if it`s correct and fixes if it`s partially correct

    <code>
        <script type="text/javascript">
            // incorrect rgb color
            var checked = Color.validate('rgb(0, 0, 266)');
            // {r : 0, g : 0, b : 255}
        </script>
    </code>

    <code>
        <script type="text/javascript">
            // incorrect cielab color
            var checked = Color.validate(
                {
                    l : 1000,
                    a : 10,
                    b : 38
                },
                true
            );
            // {type : 'lab', raw : {l : 100, a : 10, b : 38}}
        </script>
    </code>

     param  | description
    =============================================================
     raw    | string or object with color format
    -------------------------------------------------------------
     object | true if you want to get an object with the correct
            | color type and corrected raw
    =============================================================


    .convert() method:

    Gets a hex/rgb/rgba string or rgb/hsv/lab/xyz object, converts
    it into needed format and checks it with the .validate() method

    <code>
        var
            hsv, rgb;

        hsv = Color.convert('#BADBAD', 'hsv');
        // {h : 103, s : 21, v : 86}

        rgb = Color.convert(hsv, 'rgb');
        // {r : 186, g : 219, b : 173}
    </code>

     param | description
    =============================================================
     raw   | string or object with color format
    -------------------------------------------------------------
     out   | string with the following value:
           |
           | — hex
           | — rgb
           | — hsv
           | — lab
           | — xyz
    =============================================================


    .invert() method:

    Gets a hex/rgb/rgba string or rgb/hsv/lab/xyz object, inverts
    it and returns in a needed format

    <code>
        var
            inverted = Color.invert({l : 43, a : 68, b : 59}, 'hex');
            // '33FFFF'
    </code>

     param | description
    =============================================================
     raw   | string or object with color format
    -------------------------------------------------------------
     out   | string with the following value:
           |
           | — hex
           | — rgb
           | — hsv
           | — lab
           | — xyz
    =============================================================