var img = null;
var grayimg = null;
var redimg = null;
var rainimg = null;
var rainbowFimg = null;

function upload() {
    var canvas = document.getElementById("can");
    var image = document.getElementById("imgup");
    img = new SimpleImage(image);
    grayimg = new SimpleImage(image);
    redimg = new SimpleImage(image);
    rainimg = new SimpleImage(image);
    rainbowFimg = new SimpleImage(image);

    img.drawTo(canvas);
}

function resetImg() {
    if (img != null) {
        var canvas = document.getElementById("can");
        var image = document.getElementById("imgup");

        grayimg = new SimpleImage(image);
        redimg = new SimpleImage(image);
        rainimg = new SimpleImage(image);
        rainbowFimg = new SimpleImage(image);
        img.drawTo(canvas);
    }
}

function clearCan() {
    if (img != null) {
        var canvas = document.getElementById("can").getContext("2d");
    
        canvas.clearRect(0, 0, document.getElementById("can").width, document.getElementById("can").height);
        
        document.getElementById("imgup").value = null;
        img = null;
        grayimg = null;
        redimg = null;
        rainimg = null;
        rainbowFimg = null;
  }
}

function makeGray() {
  if (grayimg == null) {
    alert("Please upload an image first!");
  } else {
    for (var pixel of grayimg.values()) {
      var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }

    var canvas = document.getElementById("can");
    grayimg.drawTo(canvas);
  }
}

function makeRed() {
    if (redimg == null) {
        alert("Please upload an image first!");
    } else {
        for (var pixel of redimg.values()) {
            redFilter(pixel);
        }
        var canvas = document.getElementById("can");
        redimg.drawTo(canvas);
  }
}

// rainbow functions

function makeRainbow() {
    if (rainimg == null) {
        alert("Please upload an image first!");
    } else {
        var section = rainimg.height / 7;
        for (var pixel of rainimg.values()) {
            if (pixel.getY() <= section) {
                redFilter(pixel);
            } else if (pixel.getY() <= section * 2) {
                orangeFilter(pixel);
            } else if (pixel.getY() <= section * 3) {
                yellowFilter(pixel);
            } else if (pixel.getY() <= section * 4) {
                greenFilter(pixel);
            } else if (pixel.getY() <= section * 5) {
                blueFilter(pixel);
            } else if (pixel.getY() <= section * 6) {
                indigoFilter(pixel);
            } else {
                violetFilter(pixel);
            }
        }
    }
    
    var canvas = document.getElementById("can");
    rainimg.drawTo(canvas);
}

function redFilter(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    
    if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
    } else {
        pixel.setRed(255);
        pixel.setGreen((avg * 2) - 255);
        pixel.setBlue((avg * 2) - 255);
    }
}

function orangeFilter(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    
    if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(avg * .8);
        pixel.setBlue(0);
    } else {
        pixel.setRed(255);
        pixel.setGreen((avg * 1.2) - 51);
        pixel.setBlue((avg * 2) - 255);
    }
}

function yellowFilter(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    
    if (avg < 128) {
        pixel.setRed(avg * 2);
        pixel.setGreen(avg * 2);
        pixel.setBlue(0);
    } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue((avg * 2) - 255);
    }
}

function greenFilter(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    
    if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(avg * 2);
        pixel.setBlue(0);
    } else {
        pixel.setRed((avg * 2 ) - 255);
        pixel.setGreen(255);
        pixel.setBlue((avg * 2) - 255);
    }
}

function blueFilter(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    
    if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(avg * 2);
    } else {
        pixel.setRed((avg * 2) - 255);
        pixel.setGreen((avg * 2) - 255);
        pixel.setBlue(255);
    }
}

function indigoFilter(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    
    if (avg < 128) {
        pixel.setRed(avg * .8);
        pixel.setGreen(0);
        pixel.setBlue(avg * 2);
    } else {
        pixel.setRed((avg * 1.2) - 51);
        pixel.setGreen((avg * 2) - 255);
        pixel.setBlue(255);
    }
}

function violetFilter(pixel) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    
    if (avg < 128) {
        pixel.setRed(avg * 1.6);
        pixel.setGreen(0);
        pixel.setBlue(avg * 1.6);
    } else {
        pixel.setRed((avg * 0.4) + 153);
        pixel.setGreen((avg * 2) - 255);
        pixel.setBlue((avg * 0.4) + 153);
    }
}

function doBlur() {
    if (img == null) {
        alert("Please upload an image first!");
    } else {
        var blurred = new SimpleImage(img.width, img.height);
        
        for (var pixel of blurred.values()) {
            var x = pixel.getX();
            var y = pixel.getY();
            var prob = Math.random();
            
            if (prob < 0.5) {
                var pixelO = img.getPixel(x, y);
                blurred.setPixel(x, y, pixelO);
            } else {
                var Xoff = Math.floor(Math.random() * 11);
                var Yoff = Math.floor(Math.random() * 11);
                var newX = x + Xoff;
                var newY = y + Yoff;
                
                if (newX > blurred.width - 1) {
                    newX = blurred.width - 1;
                }
                if(newY > blurred.height - 1) {
                    newY = blurred.height - 1;
                }
                
                var pixelB = img.getPixel(newX, newY);
                blurred.setPixel(x, y, pixelB);
            }
        }
        var canvas = document.getElementById("can");
        blurred.drawTo(canvas);
    }
}

// rainbow frame functions

function rainbowFrame() {
    if (rainbowFimg == null) {
        alert("Please upload an image first!");
    } else {
        let frameW = prompt("Please enter a frame width! The frame will take a couple seconds to load.");
        var colorR = frameW;
        
        for (let i = 0; i < 6; i++) {
            for (var pixel of rainbowFimg.values()) {
                if (pixel.getX() <= colorR || pixel.getY() <= colorR) {
                    rainbowSeq[i](pixel);
                }
                if (pixel.getX() >= (rainbowFimg.width - colorR) || pixel.getY() >= (rainbowFimg.height - colorR)) {
                    rainbowSeq[i](pixel);
                }
            }
            colorR = colorR - (frameW / 6);
        }
        
        var canvas = document.getElementById("can");
        rainbowFimg.drawTo(canvas);
    }
}

var rainbowSeq = [
    paintViolet,
    paintBlue,
    paintGreen,
    paintYellow,
    paintOrange,
    paintRed
]

function paintRed(pixel) {
    pixel.setRed(228);
    pixel.setGreen(3);
    pixel.setBlue(3);
}

function paintOrange(pixel) {
    pixel.setRed(255);
    pixel.setGreen(140);
    pixel.setBlue(0);
}

function paintYellow(pixel) {
    pixel.setRed(255);
    pixel.setGreen(237);
    pixel.setBlue(0);
}

function paintGreen(pixel) {
    pixel.setRed(0);
    pixel.setGreen(128);
    pixel.setBlue(38);
}

function paintBlue(pixel) {
    pixel.setRed(36);
    pixel.setGreen(64);
    pixel.setBlue(142);
}

function paintViolet(pixel) {
    pixel.setRed(115);
    pixel.setGreen(41);
    pixel.setBlue(130);
}