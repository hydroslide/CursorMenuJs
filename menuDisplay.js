/**
 * Created by RSCANLO2 on 3/10/2016.
 */

exports.MenuDisplay =function(lineCount, updateDisplayLines){
    var lineCount = lineCount;

    function getLineCount(){return lineCount;}

    var updateDisplayLines = updateDisplayLines;

    var displayHistory=[];

    var currentDisplayInfo = null;


    var getSelectedItemString = function(selectedItem){
        var display = ">"+selectedItem.getTitle();
        console.log(display);
        return display;
    }

    var getUnselectedItemString = function(unselectedItem){
        var display =  " "+unselectedItem.getTitle();
        console.log(display);
        return display;
    }

    function DisplayInfo(){
        this.previousSelectedIndex=0;
        //this.selectedLine=0;
        this.previousSelectedLine=0;
        //this.selectedIndex=0;
        this.menu = null;
        this.firstShownIndex=0;
        this.lastShownIndex = lineCount-1;
    }

    function getCurrentDisplayInfo(menuRunner)
    {
        function setNewDisplayInfo(){
            currentDisplayInfo = new DisplayInfo();
            currentDisplayInfo.menu = menuRunner.getCurrentMenu();
            if(currentDisplayInfo.menu.getItems().length < lineCount)
                currentDisplayInfo.lastShownIndex = currentDisplayInfo.menu.getItems().length-1;
        }

        if(currentDisplayInfo == null)
            setNewDisplayInfo();
        else
        {
            if(currentDisplayInfo.menu === menuRunner.getCurrentMenu())
                return currentDisplayInfo;
            else
            {
                if(displayHistory.length>0 && displayHistory[displayHistory.length-1].menu === menuRunner.getCurrentMenu())
                    currentDisplayInfo = displayHistory.pop();
                else
                {
                    displayHistory.push(currentDisplayInfo);
                    setNewDisplayInfo();
                }
            }
        }
        return currentDisplayInfo;
    }

    this.updateDisplayMenuRunner = function(menuRunner){

        var currentDisplayInfo = getCurrentDisplayInfo(menuRunner)

        var items = currentDisplayInfo.menu.getItems();
        var selectedIndex = menuRunner.getSelectedIndex();
        var lines=[];
        var firstShownIndex =currentDisplayInfo.firstShownIndex;
        var lastShownIndex =currentDisplayInfo.lastShownIndex;
        var selectedLine = currentDisplayInfo.previousSelectedLine;

        // first adjust the selected line and first / last shown indexes
        if(currentDisplayInfo.previousSelectedIndex<selectedIndex){
            if(selectedLine<lineCount-1)
                selectedLine++;

            if(selectedIndex > lastShownIndex) {
                firstShownIndex = (selectedIndex + 1) - lineCount;
                lastShownIndex = selectedIndex;
            }
        }
        else if(currentDisplayInfo.previousSelectedIndex>selectedIndex) {
            if(selectedLine>0)
                selectedLine--;

            if(selectedIndex<firstShownIndex) {
                firstShownIndex = selectedIndex;
                lastShownIndex = selectedIndex+(lineCount-1);
                if(lastShownIndex>items.length-1)
                   lastShownIndex=items.length-1;
            }
        }


        // Iterate over items and display the correct ones.
        for(var i=firstShownIndex; i<= lastShownIndex; i++) {

                var line;
                if(i==selectedIndex)
                    line = getSelectedItemString(items[i]);
                else
                    line = getUnselectedItemString(items[i]);
                lines.push(line);

        }

        currentDisplayInfo.previousSelectedIndex=selectedIndex;
        currentDisplayInfo.previousSelectedLine=selectedLine;
        currentDisplayInfo.firstShownIndex=firstShownIndex;
        currentDisplayInfo.lastShownIndex=lastShownIndex;

        updateDisplayLines(lines);
    }


        /*
         this.updateDisplayMenuRunner = function(menuRunner){
         var items = menuRunner.getCurrentMenu().getItems();
         var selectedIndex = menuRunner.selectedIndex;
         var lines;
         if(selectedIndex == 0){
         lines.add(this.getSelectedItemString(items[0]));
         selectedLine=0;
         }
         if(items.length > 1){
         if(previousSelectedIndex<selectedIndex){
         if(selectedLine<lineCount-1)
         selectedLine++;
         }
         else if(previousSelectedIndex>selectedIndex){
         if(selectedLine>0)
         selectedLine--;
         }

         for(var i=0; i<lineCount; i++){
         if(selectedIndex > 0)
         {

         }
         else
         lines.add(this.getUnselectedItemString(items[selectedIndex+i]))
         if
         }
         }

         previousSelectedIndex = selectedIndex;
         previousSelectedLine = selectedLine;
         }
         */
}
