module("Testing conversions");
test("LAB to RGB", function() {
    var lab,
        rgb;
    
    lab = {
                l : 12.319070000421839,
a: 32.79724522241495,
b: 19.351723549763015
              }
    rgb = Color.convert(lab, 'rgb');
    ok(rgb.r >=0 && rgb.r <=255, "Red is within bounds");
    ok(rgb.g >=0 && rgb.g <=255, "Green is within bounds");
    ok(rgb.b >=0 && rgb.b <=255, "Blue is within bounds");
});