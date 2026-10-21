import * as ScratchBlock from '__ITCHY_PREVIEWER_SCRATCH_BLOCKS__'
export function registerProject(vm, contexts, EventType) {
    {
        const context = contexts["Apple"];
        if (!context) throw new Error("Missing execution context for Apple");
        context.backdrop.variables.set("apple_location", []);
        context.sprite.variables.set("try_x", 0);
        context.sprite.variables.set("try_y", 0);
        context.sprite.variables.set("x_pointer", 0);
        context.sprite.variables.set("y_pointer", 0);
        context.sprite.variables.set("spawning", false);
        function normalise_pointer(context, pointer) {
            context.sprite.variables.set("x_pointer", (pointer * 2));
            context.sprite.variables.set("y_pointer", (context.sprite.variables.get("x_pointer") + 1));
            context.sprite.variables.set("x_pointer", (context.sprite.variables.get("x_pointer") + 1));
            context.sprite.variables.set("y_pointer", (context.sprite.variables.get("y_pointer") + 1));
        }
        function* spawn(context, x, y) {
            context.sprite.variables.set("spawning", true);
            context.backdrop.variables.set("apple_location", "");
            context.backdrop.variables.set("apple_location", "");
            context.sprite.variables.set("try_x", x);
            context.sprite.variables.set("try_y", y);
            while (context.sprite.variables.get("spawning")) {
                context.sprite.variables.set("spawning", false);
                for (let i = 0, __end = context.backdrop.variables.get("snake_length"), __step = 1; __step !== 0 && (__step > 0 ? i < __end : i > __end); i += __step) {
                    normalise_pointer(context, i);
                    if (((context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("x_pointer")] === context.sprite.variables.get("try_x")) && (context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("y_pointer")] === context.sprite.variables.get("try_y")))) {
                        context.sprite.variables.set("spawning", true);
                        context.sprite.variables.set("try_x", ScratchBlock.operator_random(context, (-context.backdrop.variables.get("MAX_X")), context.backdrop.variables.get("MAX_X")));
                        context.sprite.variables.set("try_y", ScratchBlock.operator_random(context, (-context.backdrop.variables.get("MAX_Y")), context.backdrop.variables.get("MAX_Y")));
                    }
                    yield { type: 'waitOneFrame' };
                }
                yield { type: 'waitOneFrame' };
            }
            context.backdrop.variables.set("apple_location", context.sprite.variables.get("try_x"));
            context.backdrop.variables.set("apple_location", context.sprite.variables.get("try_y"));
        }
        vm.registerEvent(
            EventType.MESSAGE,
            ["spawn"],
            {
                context,
                script: function* (context) {
                    (yield* spawn(context, ScratchBlock.operator_random(context, (-context.backdrop.variables.get("MAX_X")), context.backdrop.variables.get("MAX_X")), ScratchBlock.operator_random(context, (-context.backdrop.variables.get("MAX_Y")), context.backdrop.variables.get("MAX_Y"))));
                }
            }
        );
    }
    {
        const context = contexts["Renderer"];
        if (!context) throw new Error("Missing execution context for Renderer");
        context.backdrop.variables.set("SQUARE_SIZE", 0);
        context.backdrop.variables.set("MAX_X", 0);
        context.backdrop.variables.set("MAX_Y", 0);
        context.sprite.variables.set("SPEED", 0);
        context.sprite.variables.set("grid_start_x", 0);
        context.sprite.variables.set("grid_start_y", 0);
        context.sprite.variables.set("grid_x", 0);
        context.sprite.variables.set("grid_y", 0);
        context.sprite.variables.set("RED", "");
        context.sprite.variables.set("GREEN", "");
        context.sprite.variables.set("GREY", "");
        context.sprite.variables.set("ORANGE", "");
        function draw_square(context, x, y, colour) {
            ScratchBlock.motion_gotoxy(context, x, y);
            ScratchBlock.motion_changexby(context, (context.backdrop.variables.get("SQUARE_SIZE") / 2));
            ScratchBlock.motion_changeyby(context, (context.backdrop.variables.get("SQUARE_SIZE") / 2));
            ScratchBlock.pen_setPenColorToColor(context, colour);
            ScratchBlock.pen_penDown(context);
            ScratchBlock.pen_setPenSizeTo(context, (context.backdrop.variables.get("SQUARE_SIZE") / 2));
            ScratchBlock.motion_changexby(context, (context.backdrop.variables.get("SQUARE_SIZE") / 2));
            ScratchBlock.motion_changeyby(context, ((-context.backdrop.variables.get("SQUARE_SIZE")) / 2));
            ScratchBlock.motion_changexby(context, ((-context.backdrop.variables.get("SQUARE_SIZE")) / 2));
            ScratchBlock.motion_changeyby(context, (context.backdrop.variables.get("SQUARE_SIZE") / 2));
            ScratchBlock.pen_penUp(context);
        }
        function draw_apple(context) {
            if ((context.backdrop.variables.get("apple_location")[1] === "")) {
                return;
            }
            draw_square(context, (context.backdrop.variables.get("apple_location")[1] * context.backdrop.variables.get("SQUARE_SIZE")), ((context.backdrop.variables.get("apple_location")[2] * context.backdrop.variables.get("SQUARE_SIZE")) - (context.backdrop.variables.get("SQUARE_SIZE") / 2)), context.sprite.variables.get("RED"));
        }
        function draw_snake(context) {
            draw_square(context, (context.backdrop.variables.get("head_x") * context.backdrop.variables.get("SQUARE_SIZE")), ((context.backdrop.variables.get("head_y") * context.backdrop.variables.get("SQUARE_SIZE")) - (context.backdrop.variables.get("SQUARE_SIZE") / 2)), context.sprite.variables.get("GREEN"));
            draw_square(context, (context.backdrop.variables.get("tail_x") * context.backdrop.variables.get("SQUARE_SIZE")), ((context.backdrop.variables.get("tail_y") * context.backdrop.variables.get("SQUARE_SIZE")) - (context.backdrop.variables.get("SQUARE_SIZE") / 2)), context.sprite.variables.get("GREY"));
        }
        function draw_grid(context, x, y, squares_left, squares_up) {
            context.sprite.variables.set("grid_start_x", (x - (squares_left * context.backdrop.variables.get("SQUARE_SIZE"))));
            context.sprite.variables.set("grid_start_y", ((y + (squares_up * context.backdrop.variables.get("SQUARE_SIZE"))) - (context.backdrop.variables.get("SQUARE_SIZE") / 2)));
            context.backdrop.variables.set("MAX_X", (squares_left - 1));
            context.backdrop.variables.set("MAX_Y", (squares_up - 1));
            for (let i = 0, __end = (squares_up * 2), __step = 1; __step !== 0 && (__step > 0 ? i < __end : i > __end); i += __step) {
                context.sprite.variables.set("grid_y", (context.sprite.variables.get("grid_start_y") - (i * context.backdrop.variables.get("SQUARE_SIZE"))));
                for (let j = 0, __end = (squares_left * 2), __step = 1; __step !== 0 && (__step > 0 ? j < __end : j > __end); j += __step) {
                    context.sprite.variables.set("grid_x", (context.sprite.variables.get("grid_start_x") + (j * context.backdrop.variables.get("SQUARE_SIZE"))));
                    draw_square(context, context.sprite.variables.get("grid_x"), context.sprite.variables.get("grid_y"), context.sprite.variables.get("GREY"));
                }
            }
        }
        function render(context) {
            draw_apple(context);
            draw_snake(context);
        }
        vm.registerEvent(
            EventType.GREEN_FLAG,
            [],
            {
                context,
                script: function* (context) {
                    context.sprite.variables.set("SPEED", 10);
                    context.backdrop.variables.set("SQUARE_SIZE", 20);
                    context.sprite.variables.set("RED", "#F54927");
                    context.sprite.variables.set("GREEN", "#11D18C");
                    context.sprite.variables.set("GREY", "#525252");
                    context.sprite.variables.set("ORANGE", "#ffa600");
                    ScratchBlock.pen_clear(context);
                    draw_grid(context, 0, 0, 11, 8);
                    context.backdrop.variables.set("apple_location", [-10, 0]);
                    (yield* ScratchBlock.event_broadcastandwait(context, "spawn"));
                }
            }
        );
        vm.registerEvent(
            EventType.MESSAGE,
            ["lose"],
            {
                context,
                script: function* (context) {
                    ScratchBlock.control_stop(context, "other scripts in sprite");
                }
            }
        );
        vm.registerEvent(
            EventType.MESSAGE,
            ["render"],
            {
                context,
                script: function* (context) {
                    render(context);
                }
            }
        );
    }
    {
        const context = contexts["Snake"];
        if (!context) throw new Error("Missing execution context for Snake");
        context.backdrop.variables.set("head_x", 0);
        context.backdrop.variables.set("head_y", 0);
        context.backdrop.variables.set("tail_x", 0);
        context.backdrop.variables.set("tail_y", 0);
        context.sprite.variables.set("direction_queued", "");
        context.sprite.variables.set("x_direction", 0);
        context.sprite.variables.set("y_direction", 0);
        context.sprite.variables.set("move_delay", 0);
        context.backdrop.variables.set("snake_part_locations", []);
        context.sprite.variables.set("head_pointer", 0);
        context.sprite.variables.set("tail_pointer", 0);
        context.backdrop.variables.set("snake_length", 0);
        context.sprite.variables.set("x_pointer", 0);
        context.sprite.variables.set("y_pointer", 0);
        context.sprite.variables.set("local_x", 0);
        context.sprite.variables.set("local_y", 0);
        function normalise_pointer(context, pointer) {
            context.sprite.variables.set("x_pointer", (pointer * 2));
            context.sprite.variables.set("y_pointer", (context.sprite.variables.get("x_pointer") + 1));
            context.sprite.variables.set("x_pointer", (context.sprite.variables.get("x_pointer") + 1));
            context.sprite.variables.set("y_pointer", (context.sprite.variables.get("y_pointer") + 1));
        }
        function resize(context) {
            normalise_pointer(context, context.sprite.variables.get("tail_pointer"));
            context.sprite.variables.set("local_x", context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("x_pointer")]);
            context.sprite.variables.set("local_y", context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("y_pointer")]);
            context.backdrop.variables.set("snake_length", (context.backdrop.variables.get("snake_length") + 1));
            ScratchBlock.data_insertatlist(context, context.sprite.variables.get("local_x"), context.sprite.variables.get("x_pointer"), context.backdrop.variables.get("snake_part_locations"));
            ScratchBlock.data_insertatlist(context, context.sprite.variables.get("local_y"), context.sprite.variables.get("y_pointer"), context.backdrop.variables.get("snake_part_locations"));
        }
        function enqueue(context) {
            context.sprite.variables.set("head_pointer", ScratchBlock.operator_mod(context, (context.sprite.variables.get("head_pointer") + 1), context.backdrop.variables.get("snake_length")));
            context.sprite.variables.set("tail_pointer", ScratchBlock.operator_mod(context, (context.sprite.variables.get("head_pointer") + 1), context.backdrop.variables.get("snake_length")));
            normalise_pointer(context, context.sprite.variables.get("head_pointer"));
            context.backdrop.variables.set("snake_part_locations", context.backdrop.variables.get("head_x"));
            context.backdrop.variables.set("snake_part_locations", context.backdrop.variables.get("head_y"));
            normalise_pointer(context, context.sprite.variables.get("tail_pointer"));
            context.backdrop.variables.set("tail_x", context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("x_pointer")]);
            context.backdrop.variables.set("tail_y", context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("y_pointer")]);
        }
        vm.registerEvent(
            EventType.GREEN_FLAG,
            [],
            {
                context,
                script: function* (context) {
                    context.backdrop.variables.set("head_x", 0);
                    context.backdrop.variables.set("head_y", 0);
                    context.sprite.variables.set("x_direction", 0);
                    context.sprite.variables.set("y_direction", 0);
                    context.sprite.variables.set("direction_queued", "left");
                    context.backdrop.variables.set("tail_x", context.backdrop.variables.get("head_x"));
                    context.backdrop.variables.set("tail_y", context.backdrop.variables.get("head_y"));
                    context.sprite.variables.set("move_delay", 0.3);
                    context.sprite.variables.set("head_pointer", -1);
                    context.sprite.variables.set("tail_pointer", 0);
                    context.backdrop.variables.set("snake_length", 5);
                    ScratchBlock.data_deletealloflist(context, context.backdrop.variables.get("snake_part_locations"));
                    for (let i = 0, __end = context.backdrop.variables.get("snake_length"), __step = 1; __step !== 0 && (__step > 0 ? i < __end : i > __end); i += __step) {
                        ScratchBlock.data_addtolist(context, 0, context.backdrop.variables.get("snake_part_locations"));
                        ScratchBlock.data_addtolist(context, 0, context.backdrop.variables.get("snake_part_locations"));
                        yield { type: 'waitOneFrame' };
                    }
                }
            }
        );
        vm.registerEvent(
            EventType.GREEN_FLAG,
            [],
            {
                context,
                script: function* (context) {
                    while (true) {
                        if (ScratchBlock.sensing_keypressed(context, "a")) {
                            context.sprite.variables.set("direction_queued", "left");
                        }
                        if (ScratchBlock.sensing_keypressed(context, "d")) {
                            context.sprite.variables.set("direction_queued", "right");
                        }
                        if (ScratchBlock.sensing_keypressed(context, "w")) {
                            context.sprite.variables.set("direction_queued", "up");
                        }
                        if (ScratchBlock.sensing_keypressed(context, "s")) {
                            context.sprite.variables.set("direction_queued", "down");
                        }
                        yield { type: 'waitOneFrame' };
                    }
                }
            }
        );
        function touching(context) {
            for (let i = 0, __end = context.backdrop.variables.get("snake_length"), __step = 1; __step !== 0 && (__step > 0 ? i < __end : i > __end); i += __step) {
                normalise_pointer(context, i);
                if ((!(context.backdrop.variables.get("apple_location")[1] === ""))) {
                    if (((context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("x_pointer")] === context.backdrop.variables.get("apple_location")[1]) && (context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("y_pointer")] === context.backdrop.variables.get("apple_location")[2]))) {
                        context.sprite.variables.set("move_delay", ((0.3 / (context.backdrop.variables.get("snake_length") / 2)) + 0.05));
                        ScratchBlock.event_broadcast(context, "spawn");
                        ScratchBlock.event_broadcast(context, "eat");
                        resize(context);
                        return;
                    }
                }
                if ((!(i === context.sprite.variables.get("head_pointer")))) {
                    if (((context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("x_pointer")] === context.backdrop.variables.get("head_x")) && (context.backdrop.variables.get("snake_part_locations")[context.sprite.variables.get("y_pointer")] === context.backdrop.variables.get("head_y")))) {
                        ScratchBlock.event_broadcast(context, "lose");
                        return;
                    }
                    if (((((context.backdrop.variables.get("head_x") < (-context.backdrop.variables.get("MAX_X"))) || (context.backdrop.variables.get("head_x") > context.backdrop.variables.get("MAX_X"))) || (context.backdrop.variables.get("head_y") < (-context.backdrop.variables.get("MAX_Y")))) || (context.backdrop.variables.get("head_y") > context.backdrop.variables.get("MAX_Y")))) {
                        ScratchBlock.event_broadcast(context, "lose");
                        return;
                    }
                }
            }
        }
        vm.registerEvent(
            EventType.GREEN_FLAG,
            [],
            {
                context,
                script: function* (context) {
                    (yield* ScratchBlock.looks_sayforsecs(context, "Ready?", 2));
                    (yield* ScratchBlock.looks_sayforsecs(context, "Go!", 1));
                    while (true) {
                        if (((context.sprite.variables.get("direction_queued") === "left") && (context.sprite.variables.get("x_direction") === 0))) {
                            context.sprite.variables.set("x_direction", -1);
                            context.sprite.variables.set("y_direction", 0);
                        }
                        else if (((context.sprite.variables.get("direction_queued") === "right") && (context.sprite.variables.get("x_direction") === 0))) {
                            context.sprite.variables.set("x_direction", 1);
                            context.sprite.variables.set("y_direction", 0);
                        }
                        else if (((context.sprite.variables.get("direction_queued") === "up") && (context.sprite.variables.get("y_direction") === 0))) {
                            context.sprite.variables.set("y_direction", 1);
                            context.sprite.variables.set("x_direction", 0);
                        }
                        else if (((context.sprite.variables.get("direction_queued") === "down") && (context.sprite.variables.get("y_direction") === 0))) {
                            context.sprite.variables.set("y_direction", -1);
                            context.sprite.variables.set("x_direction", 0);
                        }
                        context.backdrop.variables.set("head_x", (context.backdrop.variables.get("head_x") + context.sprite.variables.get("x_direction")));
                        context.backdrop.variables.set("head_y", (context.backdrop.variables.get("head_y") + context.sprite.variables.get("y_direction")));
                        enqueue(context);
                        touching(context);
                        ScratchBlock.event_broadcast(context, "render");
                        (yield* ScratchBlock.control_wait(context, context.sprite.variables.get("move_delay")));
                        yield { type: 'waitOneFrame' };
                    }
                }
            }
        );
        vm.registerEvent(
            EventType.MESSAGE,
            ["lose"],
            {
                context,
                script: function* (context) {
                    ScratchBlock.control_stop(context, "other scripts in sprite");
                }
            }
        );
    }
    {
        const context = contexts["Snake Head"];
        if (!context) throw new Error("Missing execution context for Snake Head");
        vm.registerEvent(
            EventType.MESSAGE,
            ["eat"],
            {
                context,
                script: function* (context) {
                    (yield* ScratchBlock.looks_sayforsecs(context, "Nom!", 2));
                }
            }
        );
        vm.registerEvent(
            EventType.MESSAGE,
            ["lose"],
            {
                context,
                script: function* (context) {
                    (yield* ScratchBlock.looks_sayforsecs(context, "Ouch!", 2));
                    ScratchBlock.looks_say(context, ScratchBlock.operator_join(context, ScratchBlock.operator_join(context, "My final score is: ", context.backdrop.variables.get("snake_length")), "."));
                }
            }
        );
        vm.registerEvent(
            EventType.GREEN_FLAG,
            [],
            {
                context,
                script: function* (context) {
                    while (true) {
                        ScratchBlock.motion_gotoxy(context, (context.backdrop.variables.get("tail_x") * context.backdrop.variables.get("SQUARE_SIZE")), (context.backdrop.variables.get("tail_y") * context.backdrop.variables.get("SQUARE_SIZE")));
                        yield { type: 'waitOneFrame' };
                    }
                }
            }
        );
    }
    {
        const context = contexts["Stage"];
        if (!context) throw new Error("Missing execution context for Stage");
    }
}
