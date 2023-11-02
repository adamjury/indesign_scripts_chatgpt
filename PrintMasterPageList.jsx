/* this script will put the name of every master page in your document in a selected text frame */

if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // Object to store unique master spread names and their based-on spread names
    var masterSpreadData = {};

    // Iterate through all master spreads in the document and collect their names and based-on spread names
    for (var i = 0; i < doc.masterSpreads.length; i++) {
        var currentMasterSpread = doc.masterSpreads[i];
        var basedOnSpreadName = (currentMasterSpread.basedOn != null) ? currentMasterSpread.basedOn.name : ""; // Get based-on spread name or an empty string if there is no based-on spread
        var formattedName = currentMasterSpread.name + " [" + basedOnSpreadName + "]";
        masterSpreadData[formattedName] = true;
    }

    // Extract unique master spread names with based-on spread names
    var masterSpreadNames = Object.keys(masterSpreadData);

    // Check if a text frame is selected
    if (app.selection.length > 0 && app.selection[0] instanceof TextFrame) {
        var selectedTextFrame = app.selection[0];

        // Put the unique master spread names with based-on spread names in the selected text frame
        selectedTextFrame.contents = masterSpreadNames.join("\r"); // "\r" represents a return character
    } else {
        alert("Please select a text frame.");
    }
} else {
    alert("No document is open in InDesign.");
}
