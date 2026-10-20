import * as ScratchBlock from 'c:/Users/Yacco/Documents/PythonExperiments/itchy-project-previewer/dist/stage/vm/itchyVM/dist/stage/vm/scratchBlocks'
export function registerProject(vm, contexts, EventType) {
    {
        const context = contexts["Apple"];
        if (!context) throw new Error("Missing execution context for Apple");
        context.sprite.variables.set("appleType", "");
        function getFrequency(context, level) {
            if ((level > ScratchBlock.data_lengthoflist(context, context.backdrop.variables.get("levels")))) {
                return context.backdrop.variables.get("levelsAppleFrequency")[ScratchBlock.data_lengthoflist(context, context.backdrop.variables.get("levels"))];
            }
            return context.backdrop.variables.get("levelsAppleFrequency")[level];
        }
        function getLevelThreshold(context, level) {
            if ((level > ScratchBlock.data_lengthoflist(context, context.backdrop.variables.get("levels")))) {
                return context.backdrop.variables.get("levels")[ScratchBlock.data_lengthoflist(context, context.backdrop.variables.get("levels"))];
            }
            return context.backdrop.variables.get("levels")[level];
        }
        vm.registerEvent(
            EventType.MESSAGE,
            ["start"],
            {
                context,
                script: function* (context) {
                    ScratchBlock.looks_hide(context);
                    while (context.backdrop.variables.get("gameRunning")) {
                        (yield* ScratchBlock.control_wait(context, (ScratchBlock.operator_random(context, 1, 10) / getFrequency(context, context.backdrop.variables.get("level")))));
                        ScratchBlock.control_create_clone_of(context, "_myself_");
                        yield { type: 'waitOneFrame' };
                    }
                }
            }
        );
        vm.registerEvent(
            EventType.CLONE,
            [],
            {
                context,
                script: function* (context) {
                    if ((ScratchBlock.operator_random(context, 1, 5) === 1)) {
                        context.sprite.variables.set("appleType", "health");
                    }
                    else {
                        context.sprite.variables.set("appleType", "normal");
                    }
                    if ((context.sprite.variables.get("appleType") === "health")) {
                        while (true) {
                            ScratchBlock.looks_changeeffectby(context, 10, "color");
                            yield { type: 'waitOneFrame' };
                        }
                    }
                    if ((context.sprite.variables.get("appleType") === "normal")) {
                    }
                }
            }
        );
        vm.registerEvent(
            EventType.CLONE,
            [],
            {
                context,
                script: function* (context) {
                    ScratchBlock.motion_sety(context, context.backdrop.variables.get("MAX_Y"));
                    ScratchBlock.motion_setx(context, ScratchBlock.operator_random(context, context.backdrop.variables.get("MAX_X"), context.backdrop.variables.get("MIN_X")));
                    ScratchBlock.looks_show(context);
                    while (((!ScratchBlock.sensing_touchingobject(context, "Bowl")) && (ScratchBlock.motion_yposition(context) > (context.backdrop.variables.get("MIN_Y") + 20)))) {
                        ScratchBlock.motion_changeyby(context, -5);
                        yield { type: 'waitOneFrame' };
                    }
                    if (ScratchBlock.sensing_touchingobject(context, "Bowl")) {
                        context.backdrop.variables.set("score", (context.backdrop.variables.get("score") + 1));
                        if (((context.sprite.variables.get("appleType") === "health") && (context.backdrop.variables.get("lives") < context.backdrop.variables.get("MAX_LIVES")))) {
                            context.backdrop.variables.set("lives", (context.backdrop.variables.get("lives") + 1));
                            ScratchBlock.event_broadcast(context, "health up");
                        }
                        if ((context.backdrop.variables.get("score") > getLevelThreshold(context, context.backdrop.variables.get("level")))) {
                            context.backdrop.variables.set("level", (context.backdrop.variables.get("level") + 1));
                            ScratchBlock.event_broadcast(context, "level change");
                        }
                    }
                    else {
                        context.backdrop.variables.set("lives", (context.backdrop.variables.get("lives") - 1));
                        if ((context.backdrop.variables.get("lives") === 0)) {
                            ScratchBlock.event_broadcast(context, "game over");
                        }
                    }
                    ScratchBlock.control_delete_this_clone(context);
                }
            }
        );
    }
    {
        const context = contexts["Bowl"];
        if (!context) throw new Error("Missing execution context for Bowl");
        context.sprite.variables.set("speed", 0);
        vm.registerEvent(
            EventType.MESSAGE,
            ["start"],
            {
                context,
                script: function* (context) {
                    ScratchBlock.motion_gotoxy(context, 0, (context.backdrop.variables.get("MIN_Y") + 50));
                    context.sprite.variables.set("speed", 10);
                    while (true) {
                        if (ScratchBlock.sensing_keypressed(context, "a")) {
                            ScratchBlock.motion_changexby(context, (-context.sprite.variables.get("speed")));
                        }
                        if (ScratchBlock.sensing_keypressed(context, "d")) {
                            ScratchBlock.motion_changexby(context, context.sprite.variables.get("speed"));
                        }
                        yield { type: 'waitOneFrame' };
                    }
                }
            }
        );
        vm.registerEvent(
            EventType.MESSAGE,
            ["game over"],
            {
                context,
                script: function* (context) {
                    ScratchBlock.looks_say(context, ScratchBlock.operator_join(context, ScratchBlock.operator_join(context, "Game over!", " Your score is: "), context.backdrop.variables.get("score")));
                    ScratchBlock.control_stop(context, "other scripts in sprite");
                    context.backdrop.variables.set("gameRunning", false);
                }
            }
        );
        vm.registerEvent(
            EventType.MESSAGE,
            ["level change"],
            {
                context,
                script: function* (context) {
                    (yield* ScratchBlock.looks_sayforsecs(context, "Level up!", 2));
                }
            }
        );
        vm.registerEvent(
            EventType.MESSAGE,
            ["health up"],
            {
                context,
                script: function* (context) {
                    (yield* ScratchBlock.looks_sayforsecs(context, "Health up!", 2));
                }
            }
        );
    }
    {
        const context = contexts["Stage"];
        if (!context) throw new Error("Missing execution context for Stage");
        context.backdrop.variables.set("MAX_Y", 0);
        context.backdrop.variables.set("MAX_X", 0);
        context.backdrop.variables.set("MIN_X", 0);
        context.backdrop.variables.set("MIN_Y", 0);
        context.backdrop.variables.set("MAX_LIVES", 0);
        context.backdrop.variables.set("score", 0);
        context.backdrop.variables.set("lives", 0);
        context.backdrop.variables.set("gameRunning", false);
        context.backdrop.variables.set("level", 0);
        context.backdrop.variables.set("levels", []);
        context.backdrop.variables.set("levelsAppleFrequency", []);
        function addLevel(context, threshold, appleFrequency) {
            ScratchBlock.data_addtolist(context, threshold, context.backdrop.variables.get("levels"));
            ScratchBlock.data_addtolist(context, appleFrequency, context.backdrop.variables.get("levelsAppleFrequency"));
        }
        vm.registerEvent(
            EventType.GREEN_FLAG,
            [],
            {
                context,
                script: function* (context) {
                    context.backdrop.variables.set("baz", 0);
                    context.backdrop.variables.set("gameRunning", true);
                    context.backdrop.variables.set("score", 0);
                    context.backdrop.variables.set("MAX_LIVES", 3);
                    context.backdrop.variables.set("lives", context.backdrop.variables.get("MAX_LIVES"));
                    context.backdrop.variables.set("MAX_Y", 180);
                    context.backdrop.variables.set("MIN_Y", -180);
                    context.backdrop.variables.set("MAX_X", 240);
                    context.backdrop.variables.set("MIN_X", -240);
                    context.backdrop.variables.set("level", 1);
                    ScratchBlock.data_deletealloflist(context, context.backdrop.variables.get("levels"));
                    addLevel(context, 3, 1);
                    addLevel(context, 6, 2);
                    addLevel(context, 12, 3);
                    addLevel(context, 20, 4);
                    addLevel(context, 30, 5);
                    addLevel(context, 45, 6);
                    addLevel(context, 65, 7);
                    addLevel(context, 90, 8);
                    addLevel(context, 120, 9);
                    addLevel(context, 200, 10);
                    ScratchBlock.data_showvariable(context, context.backdrop.variables.get("score"));
                    ScratchBlock.data_showvariable(context, context.backdrop.variables.get("lives"));
                    ScratchBlock.event_broadcast(context, "start");
                }
            }
        );
    }
}
