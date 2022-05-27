// GRAPHICS LIBRARY
// Requires a global cnv and ctx variables

// FUNCTION LIST
// background(color)
// stroke(color)
// fill(color)
// lineWidth(width)
// font(fontSetting) 
// rect(x, y, w, h, mode)
// line(x1, y1, x2, y2)
// circle(x, y, r, mode)
// triangle(x1, y1, x2, y2, x3, y3, mode)
// text(message, x, y, mode)
// ellipse(x, y, xRadius, yRadius, rotation, mode)
// image(img, x, y, w, h)
// imageClip(img, xc, yc, wc, hc, x, y, w, h)

// Fill the canvas with the provided color
function background(color) {
    fill(color);
    rect(0, 0, cnv.width, cnv.height, "fill");
}
// Set the strokeStyle
function stroke(color) {
    ctx.strokeStyle = color;
}

// Set the fillStyle
function fill(color) {
    ctx.fillStyle = color;
}

// Set the lineWidth
function lineWidth(width) {
    ctx.lineWidth =  width;
}

// Set the font
function font(fontSetting) {
    ctx.font = fontSetting;
}

// Draw a stroke or fill rectangle with a top-left corner of (x, y) a width of w and a height of h
function rect(x, y, w, h, mode) {
    if (mode === "fill") {
        ctx.fillRect(x, y, w, h);
    }   else if (mode === "stroke") {
        ctx.strokeRect(x, y, w, h);
    }
}

// Draw a line segment from (x1, y1) to (x2, y2)
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Endpoint 1
    ctx.lineTo(x2, y2); // Endpoint 2
    ctx.stroke(); 
}

// Draw a stroke or fill circle with a center of (x, y) and a radius of r.
function circle(x, y, r, mode) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (mode === "fill") {
        ctx.fill();
    }   else if (mode === "stroke") {
        ctx.stroke()
    }
}

// Draw a stroke or fill triangle with vertices of (x1, y1), (x2, y2) and (x3, y3).
function triangle(x1, y1, x2, y2, x3, y3, mode) {
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Vertex 1
    ctx.lineTo(x2, y2); // Vertex 2
    ctx.lineTo(x3, y3); // Vertex 3
    if (mode === "fill") {
        ctx.fill();
    }   else if (mode === "stroke") {
        ctx.closePath();
        ctx.stroke();
    }
}

// Draw the message in stroke or fill with a bottom-left corner of (x, y)
function text(message, x, y, mode) {
    if (mode === "fill") {
        ctx.fillText(message, x, y);
    } else if (mode === "stroke") {
        ctx.strokeText(message, x, y);
    }
}

// Draw a stroke or fill ellipse with a center of (x, y), a horizontal radius of xRadius, a vertical radius of yRadius, and a rotation angle in radians.
function ellipse(x, y, xRadius, yRadius, rotation, mode) {
    ctx.beginPath();
    ctx.ellipse(x, y, xRadius, yRadius, rotation, 0, 2 * Math.PI);
    if (mode === "fill") {
        ctx.fill();
    }   else if (mode === "stroke") {
        ctx.stroke()
    }

}

// Draw img to the canvas with a top-left corner of (x, y), a width of w and a height of h.
function image(img, x, y, w, h) {
    ctx.drawImage(img, x, y, w, h);
}

// Draw a clipped part of img to the canvas.  
function imageClip(img, xc, yc, wc, hc, x, y, w, h) {
    ctx.drawImage(img, xc, yc, wc, hc, x, y, w, h);
}

