/**
 * Created by RSCANLO2 on 3/9/2016.
 */

function createMyMenu(){
    var m1;
    var thisMenu = new Menu(
        [
            new ActionItem("Action A",actionFunction1),
            new MenuItem("SubMenu B",
                new SubMenu(
                    [
                        new ActionItem("Action B1",actionFunction2),
                        new ActionItem("Action B2",actionFunction3),
                        new ActionItem("Action B3",actionFunction2),
                        new ActionItem("Action B4",actionFunction2),
                        new ActionItem("Action B5",actionFunction2),
                    ],
                function() {return thisMenu;})),
            function() {
                return new MenuItem("SubMenu C",
                    m1 = new SubMenu(
                        [
                            new ActionItem("Action C1",actionFunction4),
                            new MenuItem("SubMenu C2",
                                new SubMenu(
                                    [
                                        new ActionItem("Action C2a", actionFunction5),
                                        new ActionItem("Action C2b", actionFunction6),
                                        new ActionItem("Action C2c", actionFunction5),
                                        new ActionItem("Action C2d", actionFunction5),
                                        new ActionItem("Action C2e", actionFunction5),
                                        new ActionItem("Action C2f", actionFunction5),

                                    ],
                                function() {
                                    return m1;
                                })),
                            new ActionItem("Action C3",actionFunction4),
                            new ActionItem("Action C4",actionFunction4),
                            new ActionItem("Action C5",actionFunction4),
                            new ActionItem("Action C6",actionFunction4),
                        ],
                    function() {return thisMenu;}));
            }(),
            new ActionItem("Action D",actionFunction1),
            new ActionItem("Action E",actionFunction1),
            new ActionItem("Action F",actionFunction1),
        ]);
    return thisMenu;
}
