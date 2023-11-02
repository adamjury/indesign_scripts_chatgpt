/* with two selected objects, this moves the topmost to the same X/Y coordinates as the bottommost, then resizes the topmost to match */

#target "InDesign"

// Function to find the bottom-most object
function findBottomObject(obj1, obj2) {
    return (obj1.geometricBounds[2] > obj2.geometricBounds[2]) ? obj1 : obj2;
}

// Function to align and resize objects
function alignAndResizeObjects(topObject, bottomObject) {
    // Align the bottom object with the top object's X and Y coordinates
    bottomObject.move([topObject.geometricBounds[1], topObject.geometricBounds[0]]);
    
    // Resize the bottom object to match the width and height of the top object
    var widthDifference = topObject.geometricBounds[3] - topObject.geometricBounds[1];
    var heightDifference = topObject.geometricBounds[2] - topObject.geometricBounds[0];
    
    // Calculate new geometric bounds
    var newLeft = bottomObject.geometricBounds[1];
    var newTop = bottomObject.geometricBounds[0];
    var newRight = newLeft + widthDifference;
    var newBottom = newTop + heightDifference;
    
    // Set the new geometric bounds for resizing
    bottomObject.geometricBounds = [newTop, newLeft, newBottom, newRight];
}

// Main script
if (app.selection.length == 2) {
    var obj1 = app.selection[0];
    var obj2 = app.selection[1];

    var topObject = (obj1.geometricBounds[2] > obj2.geometricBounds[2]) ? obj2 : obj1;
    var bottomObject = findBottomObject(obj1, obj2);

    alignAndResizeObjects(topObject, bottomObject);
} else {
    alert("Please select exactly two objects to align and resize.");
}
