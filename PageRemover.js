/* remove all pages in a document that have the master pages 1, 2, 3 applied. You can add/remove from the list of page and change their names. */

#target indesign

// Get the current InDesign document
var doc = app.activeDocument;

// Loop through pages in reverse order to avoid issues with page deletion
for (var i = doc.pages.length - 1; i >= 0; i--) {
    var currentPage = doc.pages[i];
    var appliedMaster = currentPage.appliedMaster;

    // Check if the applied master's name matches any of the Parent Page names. 
    // Change the names to the ones you want to remove. Add or remove more as necessary.
    if (appliedMaster) {
        if (appliedMaster.name === "1" || 
            appliedMaster.name === "2" ||
            appliedMaster.name === "3") {
            // Delete the page if the applied master's name matches any of the Parent Page names
            currentPage.remove();
        }
    }
}

// Save the modified document with a new name
var newFilePath = "~/Desktop/NewDocument.indd";
var newFile = new File(newFilePath);
doc.save(newFile);

// Optionally, close the modified document
// doc.close();
