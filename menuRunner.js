/**
 * Created by RSCANLO2 on 3/9/2016.
 */

var menus = require('./menu.js');

exports.MenuRunner = function(menu, updateDisplay){
    var self = this;
    var selectedIndexes = [];
    var currentMenu;
    var acceptingInput = true;
    this.getCurrentMenu = function(){return currentMenu;}
    var selectedIndex=0;
    this.getSelectedIndex=function(){return selectedIndex;}


    var getSelectedItem = function(){ return currentMenu.getItems()[selectedIndex]; }


    this.activateSelectedItem = function(){
        checkAcceptingInput(this.name, function() {
            var selectedItem = getSelectedItem();
            if (selectedItem instanceof menus.MenuItem) {
                selectedIndexes.push([selectedIndex]);
                selectedIndex = 0;
                currentMenu = selectedItem.getMenu();
                updateDisplay(self);
            }
            else if (selectedItem instanceof menus.ActionItem) {
                acceptingInput = false;
                var returnFunction = function () {
                    setTimeout(function(){
                        acceptingInput = true;
                        updateDisplay(self);
                    }, 10);
                }
                try{
                    selectedItem.getAction()(returnFunction);
                }
                catch(err){
                    console.log("Error in menuRunner.Action:\n"+err.toString());
                    returnFunction();
                }
            }
            else
                console.log("Cannot activateSelectedItem. selectedItem is not a MenuItem or an ActionItem.\n" + selectedItem.toString());
        });
    }

    this.cursorUp = function(){
        checkAcceptingInput.call(this, "cursorUp", function(){
            if(selectedIndex>0){
                selectedIndex--;
                updateDisplay(self);
            }
            else
                console.log("Cannot move cursorUp");
        });
    }

    this.cursorDown = function(){
        checkAcceptingInput.call(this, "cursorDown", function(){
            if(selectedIndex<currentMenu.getItems().length -1){
                selectedIndex++;
                updateDisplay(self);
            }
            else
                console.log("Cannot move cursorDown");
        })
    }

    this.goBack = function(){
        checkAcceptingInput.call(this, "goBack", function() {
            if (currentMenu instanceof menus.SubMenu) {
                currentMenu = currentMenu.getParent();
                resetIndex();
            }
            else
                console.log("Cannot goBack because currentMenu has no parent");
        });
    }

    function checkAcceptingInput(functionName, onAcceptingInput){
        if(acceptingInput){
            onAcceptingInput.call(this);
        }
        else
            console.log("Cannot "+functionName+" because acceptingInput == false");
    }

    var resetIndex = function(){
        selectedIndex = selectedIndexes.pop();
        updateDisplay(self);
    }

    currentMenu = menu;
    updateDisplay(self);
}
