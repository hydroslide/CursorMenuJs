/**
 * Created by rscanlo2 on 2/22/2016.
 */

function inherit(Parent, Child){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

exports.Item = function(title){
    this.getTitle = function(){return title;}
}

exports.MenuItem = function(title, menu){
    exports.Item.call(this, title);
    this.getMenu = function(){ return menu;}
}
inherit(exports.Item, exports.MenuItem);

exports.ActionItem =function(title, action){
    exports.Item.call(this, title);
    this.getAction = function(){return action;}
}
inherit(exports.Item, exports.ActionItem);

exports.Menu =function(items){
    this.getItems = function(){return items;}
}

exports.SubMenu = function(items, getParent){
    exports.Menu.call(this, items);
    this.getParent = getParent;
}
inherit(exports.Menu,exports.SubMenu);






