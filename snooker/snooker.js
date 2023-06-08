// import {defs, tiny} from './examples/common.js';
//
// const {
//     Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
// } = tiny;
//
// const {Textured_Phong} = defs
//
// export class Snooker extends Scene {
//     constructor() {
//         // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
//         super();
//
//         // At the beginning of our program, load one of each of these shape definitions onto the GPU.
//         this.shapes = {
//             table: new defs.Square(),
//
//             ball: new defs.Subdivision_Sphere(4),
//         };
//
//         // *** Materials
//         this.materials = {
//
//
//             table: new Material(new Texture_Scroll_X(),
//                     {ambient: .7, diffusivity: 1, specularity: 1,
//                         texture: new Texture('assets/snooker_background.png', 'LINEAR_MIPMAP_LINEAR')}),
//             stable: new Material(new defs.Textured_Phong(1), {
//                 ambient: .8, diffusivity: 0, specularity: 0, color: color(1,0,0,1),
//                 texture: new Texture("assets/snooker_background.png")
//             }),
//             snotable: new Material(new defs.Phong_Shader(), {
//                 ambient: .8, texture: new Texture("assets/snooker_background.png"), color: color(1,0,0,1)
//             }),
//             red_ball: new Material(new defs.Phong_Shader(),
//                 {ambient: 1, diffusivity: 0, specularity: 0, texture: new Texture("assets/red_ball.png")}),
//             yellow_ball: new Material(new defs.Phong_Shader(),
//                 {ambient: 1, diffusivity: 0, specularity: 0, color: hex_color("#ffff00"), texture: new Texture("assets/yellow_ball.png")}),
//         }
//         this.initial_camera_location = Mat4.look_at(vec3(0, 0, 50), vec3(0, 0, 0), vec3(0, 1, 0));
//     }
//
//     make_control_panel() {
//         // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
//     //     this.key_triggered_button("View solar system", ["Control", "0"], () => this.attached = () => this.initial_camera_location);
//     //     this.new_line();
//     //     this.key_triggered_button("Attach to planet 1", ["Control", "1"], () => this.attached = () => this.planet_1);
//     //     this.key_triggered_button("Attach to planet 2", ["Control", "2"], () => this.attached = () => this.planet_2);
//     //     this.new_line();
//     //     this.key_triggered_button("Attach to planet 3", ["Control", "3"], () => this.attached = () => this.planet_3);
//     //     this.key_triggered_button("Attach to planet 4", ["Control", "4"], () => this.attached = () => this.planet_4);
//     //     this.new_line();
//     //     this.key_triggered_button("Attach to moon", ["Control", "m"], () => this.attached = () => this.moon);
//     }
//
//     display(context, program_state) {
//         // display():  Called once per frame of animation.
//         // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
//         if (!context.scratchpad.controls) {
//             this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
//             // Define the global camera and projection matrices, which are stored in program_state.
//             program_state.set_camera(this.initial_camera_location);
//         }
//
//         program_state.projection_transform = Mat4.perspective(
//             Math.PI / 4, context.width / context.height, .1, 1000);
//
//         const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
//
//         const light_position = vec4(0, 0, 0, 1);
//         program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 3)];
//
//         let model_transform = Mat4.identity();
//         let table_transform = model_transform.times(Mat4.translation(0,0,0))
//             .times(Mat4.scale(40,21,1));
//         let ball_transform = model_transform.times(Mat4.translation(5,0,0));
//         this.shapes.table.draw(context, program_state, table_transform, this.materials.snotable);
//         this.shapes.ball.draw(context, program_state, model_transform, this.materials.red_ball);
//         this.shapes.ball.draw(context, program_state, ball_transform, this.materials.yellow_ball);
//
//         // if (this.attached != undefined){
//         //     program_state.camera_inverse = this.attached().map((x,i) =>
//         //         Vector.from(program_state.camera_inverse[i]).mix(x, 0.1));
//         // }
//
//     }
// }

import {defs, tiny} from './examples/common.js';
import { Shape_From_File } from './examples/obj-file-demo.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

const {Textured_Phong} = defs

export class Snooker extends Scene {
    constructor() {
        super();

        this.shapes = {
            table: new defs.Square(),
            // ball: new defs.Subdivision_Sphere(4),
            ball: new defs.Subdivision_Sphere(6),
            stick: new Shape_From_File("assets/stick.obj"),
            // stick: new defs.Line(),
        };

        this.materials = {
            table: new Material(new Textured_Phong(), {
                ambient: 2, diffusivity: 0.5, specularity: 1,
                texture: new Texture("assets/atable.png")
            }),
            cue_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#FFFFFF"),
                ambient: 1, diffusivity: 1, specularity: 1
            }),
            red_ball: new Material(new Gouraud_Shader(), {
                color: hex_color("#FF0000"),
                ambient: 1, diffusivity: 1, specularity: 1,
                // texture: new Texture("assets/rb.png")
            }),
            yellow_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#FFFF00"),
                ambient: 1, diffusivity: 1, specularity: 1
            }),
            green_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#013220"),
                ambient: 1, diffusivity: 1, specularity: 1
            }),
            brown_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#964B00"),
                ambient: 1.2, diffusivity: 1, specularity: 1
            }),
            blue_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#00008B"),
                ambient: 1, diffusivity: 1, specularity: 1
            }),
            pink_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#FF69B4"),
                ambient: 1, diffusivity: 1, specularity: 1
            }),
            black_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#000000"),
                ambient: 1, diffusivity: 1, specularity: 1
            }),
            stick: new Material(new defs.Textured_Phong(), {
                // color: hex_color("#000000"),
                ambient: 1, diffusivity: 1, specularity: 1,
                // texture: new Texture("assets/stick.obj")
            }),
        };

        this.balls = []; // Array to store ball objects

        // Create the balls with initial positions and velocities
        this.createBalls();

        this.score = {
            "player1": 0,
            "player2": 0,
        }
        this.current_player = {
            "player1": true,
            "player2": false,
        }
        this.player1_color = hex_color("#ff0000");
        this.player2_color = hex_color("#0000ff");

        this.initial_camera_location = Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0));
        this.starting = false;
        this.resetting = false;
    }
    createBalls() {
        // Create the balls and add them to the balls array
        const ball_radius = 1.5;
        const ball_positions = [
            vec3(-8, 0, 0),
            vec3(0, 0, 0),
            vec3(8, 0, 0),
            vec3(-4, ball_radius * 2, 0),
            vec3(4, ball_radius * 2, 0),
            vec3(0, ball_radius * 4, 0),
            vec3(0, ball_radius * 6, 0),
            vec3(0, ball_radius * 8, 0),
            vec3(0, ball_radius * 10, 0),
            vec3(0, ball_radius * 12, 0)
        ];

        for (let i = 0; i < ball_positions.length; i++) {
            const position = ball_positions[i];
            const velocity = vec3(0, 0, 0); // Initial velocity is zero
            const ball = {
                position,
                velocity,
                radius: ball_radius,
                mass: 1
            };
            this.balls.push(ball);
        }
    }
    updateScore(player) {
        this.score[player] += 1;
        this.current_player = player === "player1" ? "player2" : "player1";
    }

    displayScore(context) {
        const { width, height } = context.canvas;
        const scoreText = `Player 1: ${this.score.player1}    Player 2: ${this.score.player2}`;
        const currentPlayerText = `Current Player: ${this.current_player}`;
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(scoreText, 10, height - 40);
        context.fillText(currentPlayerText, 10, height - 20);
    }

    update_one_player_score(context, program_state) {
        let player1_score_transform = Mat4.identity().times(Mat4.translation(-5, 12, -8));
        this.shapes.text.set_string(`Score: ${this.score['player1']}`, context.context);
        this.shapes.text.draw(context, program_state, player1_score_transform,
            this.materials.score.override({color: this.player1_color}));
    }
    update_two_player_score(context, program_state) {
        let player1_score_transform = Mat4.identity().times(Mat4.translation(-3, 12, -8));
        this.shapes.text.set_string(`${this.score['player1']}`, context.context);
        this.shapes.text.draw(context, program_state, player1_score_transform,
            this.materials.score.override({color: this.player1_color}));
        let colon_transform = player1_score_transform.times(Mat4.translation(3, 0, 0));
        this.shapes.text.set_string(':', context.context);
        this.shapes.text.draw(context, program_state, colon_transform, this.materials.score);
        let player2_score_transform = colon_transform.times(Mat4.translation(3, 0, 0));
        this.shapes.text.set_string(`${this.score['player2']}`, context.context);
        this.shapes.text.draw(context, program_state, player2_score_transform,
            this.materials.score.override({color: this.player2_color}));
    }
    handleBallCollisions() {
        const balls = this.balls;

        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const ball1 = balls[i];
                const ball2 = balls[j];

                const distance = ball1.position.minus(ball2.position).magnitude();

                if (distance < ball1.radius + ball2.radius) {
                    const collisionNormal = ball2.position.minus(ball1.position).normalized();
                    const relativeVelocity = ball2.velocity.minus(ball1.velocity);
                    const impulseMagnitude = (2 * relativeVelocity.dot(collisionNormal)) / (ball1.mass + ball2.mass);
                    const impulse = collisionNormal.times(impulseMagnitude);

                    ball1.velocity = ball1.velocity.plus(impulse.times(1 / ball1.mass));
                    ball2.velocity = ball2.velocity.minus(impulse.times(1 / ball2.mass));
                }
            }
        }
    }

    ball_ball_collision_detection (object, ball_object_x_distance, ball_object_y_distance) {
        // if(this.duplicate_goal_check_frames != 8) {
        //     this.duplicate_goal_check_frames++;
        //     return;
        // }
        let object_pos = this.position[object];
        let ball_pos = this.position['ball'];
        let ball_pos_x = ball_pos[0], ball_pos_y = ball_pos[1] - 1.3;
        let object_pos_x = object_pos[0], object_pos_y = object_pos[1];

        let intersects_on_x_axis = false;
        let intersects_on_y_axis = false;
        // let intersects_on_z_axis = false;



        // visually the circle intersects ball if it's +/- ball_object_x_distance away
        intersects_on_x_axis = Math.abs(ball_pos_x - object_pos_x) <= ball_object_x_distance;
        // same for y (height)
        intersects_on_y_axis = Math.abs(Math.floor(ball_pos_y) - object_pos_y) <= ball_object_y_distance;
        // z is -18 since that's where the goal posts are
        // intersects_on_z_axis = Math.floor(ball_pos[2]) === -18;
        // this.ball_intersects_goal_on_z_axis = intersects_on_z_axis;
        this.ball_collision_success = intersects_on_x_axis && intersects_on_y_axis;
        // } else {
        //     // otherwise want ball to (not) hit goalkeeper
        //     // visually the keeper intersects the ball if it's +/- ball_object_x_distance away
        //     intersects_on_x_axis = Math.abs(ball_pos_x - object_pos_x) <= ball_object_x_distance;
        //     // same for y (height)
        //     // keeper_height + keeper_head_height = 6 and visually ball should be one above it so 7
        //     // also need to account for if keeper is in the airq
        //     intersects_on_y_axis = Math.ceil(ball_pos_y) <= 7
        //         || (Math.ceil(ball_pos_y) >= 9 && object_pos_y === 2)
        //         || (Math.ceil(ball_pos_y) >= 8 && object_pos_y === 1);
        //     // z is -18 since that's where the goal posts are
        //     intersects_on_z_axis = Math.floor(ball_pos[2]) === -18;
        //     this.ball_intersects_goal_on_z_axis = intersects_on_z_axis;
        //     this.ball_collision_success = (!intersects_on_x_axis || !intersects_on_y_axis) && intersects_on_z_axis;
        // }

        if (this.ball_collision_success) {
            this.duplicate_goal_check_frames = 0;
            if (this.mode === 'two_player') {
                if (this.current_player['player1']) {
                    this.score['player1'] += 1;
                } else {
                    this.score['player2'] += 1;
                }
            } else {
                this.score['player1'] += 1;
            }
        }

        // even if the player misses still move to the next player
        if (this.mode === 'two_player' && intersects_on_z_axis) {
            this.current_player['player1'] = !this.current_player['player1'];
            this.current_player['player2'] = !this.current_player['player2'];
        }
    }

    slow_down_ball(friction) {
        // slow down the ball slightly
        this.ball_v0_x = this.ball_v0_x - (this.ball_v0_x * friction);
        this.ball_v0_z = this.ball_v0_z - (this.ball_v0_z * friction);

        if (this.ball_v0_z < 0.005) {
            this.ball_v0_z = 0;
        }

        if (this.ball_v0_x > 0) {
            if (this.ball_v0_x < 0.005) {
                this.ball_v0_x = 0;
            }
        }

        if (this.ball_v0_x < 0) {
            if (-this.ball_v0_x < 0.005) {
                this.ball_v0_x = 0;
            }
        }
    }
    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Start Game", ["s"], () => this.starting = !this.starting);
        this.new_line();
        this.key_triggered_button("Reset game", ["esc"], () => this.resetting = !this.resetting);
        this.new_line();
        this.key_triggered_button("Power Up", ["38"], () => this.attached = () => this.planet_2);
        this.new_line();
        this.key_triggered_button("Power Down", ["40"], () => this.attached = () => this.planet_3);
        this.new_line();
        this.key_triggered_button("Shoot", ["m"], () => this.attached = () => this.moon);
    }

    ball_table_collision_detection() {
        // let ball_pos = this.position['ball'];
        // let ball_pos_y = ball_pos[1];
        let bounce_constant = 0.35;
        let ground_friction = 0.04;
        let ball_pos = this.position['ball'];
        let ball_pos_x = ball_pos[0], ball_pos_y = ball_pos[1];
        let intersects_on_x_axis = false;
        let intersects_on_y_axis = false;

        // If ball_pos_y <= 1, then the ball must bounce!
        // if(ball_pos_y <= 1) {
        //     this.ball_time_since_last_bounce = 0.5;
        //     this.ball_v0_y = (this.ball_v0_y - bounce_constant);
        //     if(this.ball_v0_y < 0) {
        //         this.ball_v0_y = 0;
        //         this.position['ball'][1] = 0;
        //     }

        this.slow_down_ball(ground_friction);

    }

    // reset_balls() {
    //     // Code to reset the positions of the balls
    //     // Example:
    //     let red_ball_transform = Mat4.translation(0, 0, 0);
    //     let yellow_ball_transform = Mat4.translation(5, 0, 0);
    //     this.shapes.ball.draw(context, program_state, red_ball_transform, this.materials.red_ball);
    //     this.shapes.ball.draw(context, program_state, yellow_ball_transform, this.materials.yellow_ball);
    // }

    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            program_state.set_camera(this.initial_camera_location);
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        const light_position = vec4(0, 0, 0, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 3)];

        let model_transform = Mat4.identity();
        let table_transform = model_transform.times(Mat4.translation(0, 0, 0))
            .times(Mat4.scale(7.5,7.4,1));
        this.shapes.table.draw(context, program_state, table_transform, this.materials.table);
        // this.shapes.ball.draw(context, program_state, model_transform, new Material(new Textured_Phong(), {ambient: 1, color: hex_color("#FF0000"), shape_texture: new Texture("rb.png")}), 0);

        // Draw the balls
        // for (const ball of this.balls) {
        //     const ball_transform = model_transform.times(Mat4.translation(ball.position));
        //     this.shapes.ball.draw(context, program_state, ball_transform, this.materials.ball);
        // }

        // Draw the stick
        const stick_transform = model_transform.times(Mat4.translation(0, 0, 0))
            .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
            .times(Mat4.scale(1,1,1));
        //this.shapes.stick.draw(context, program_state, stick_transform, this.materials.red_ball);
        let red_ball_1_transform = model_transform.times(Mat4.translation(3.54,0,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let red_ball_2_transform = model_transform.times(Mat4.translation(4.08,0.3,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let red_ball_3_transform = model_transform.times(Mat4.translation(4.08,-0.3,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let red_ball_4_transform = model_transform.times(Mat4.translation(4.62,0.54,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let red_ball_5_transform = model_transform.times(Mat4.translation(4.62,0,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let red_ball_6_transform = model_transform.times(Mat4.translation(4.62,-0.54,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let cue_ball_transform = model_transform.times(Mat4.translation(-5.6,-0.8,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let yellow_ball_transform = model_transform.times(Mat4.translation(-3.3,1.6,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let green_ball_transform = model_transform.times(Mat4.translation(-3.3,-1.6,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let brown_ball_transform = model_transform.times(Mat4.translation(-3.3,0,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let blue_ball_transform = model_transform.times(Mat4.translation(0,0,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let pink_ball_transform = model_transform.times(Mat4.translation(2.95,0,0)).times(Mat4.scale(0.24, 0.24, 0.24));
        let black_ball_transform = model_transform.times(Mat4.translation(5.32,0,0)).times(Mat4.scale(0.24, 0.24, 0.24));

        this.shapes.ball.draw(context, program_state, red_ball_1_transform, this.materials.red_ball);
        this.shapes.ball.draw(context, program_state, red_ball_2_transform, this.materials.red_ball);
        this.shapes.ball.draw(context, program_state, red_ball_3_transform, this.materials.red_ball);
        this.shapes.ball.draw(context, program_state, red_ball_4_transform, this.materials.red_ball);
        this.shapes.ball.draw(context, program_state, red_ball_5_transform, this.materials.red_ball);
        this.shapes.ball.draw(context, program_state, red_ball_6_transform, this.materials.red_ball);
        this.shapes.ball.draw(context, program_state, cue_ball_transform, this.materials.cue_ball);
        this.shapes.ball.draw(context, program_state, yellow_ball_transform, this.materials.yellow_ball);
        this.shapes.ball.draw(context, program_state, green_ball_transform, this.materials.green_ball);
        this.shapes.ball.draw(context, program_state, brown_ball_transform, this.materials.brown_ball);
        this.shapes.ball.draw(context, program_state, blue_ball_transform, this.materials.blue_ball);
        this.shapes.ball.draw(context, program_state, pink_ball_transform, this.materials.pink_ball);
        this.shapes.ball.draw(context, program_state, black_ball_transform, this.materials.black_ball);
        // Update ball positions and handle collisions
        //     this.updateBalls(dt);
        //     this.handleBallCollisions();
    }

    updateBalls(dt) {
        for (const ball of this.balls) {
            // Update the position of the ball based on its velocity
            ball.position = ball.position.plus(ball.velocity.times(dt));
        }

    // let ball_transform = model_transform.times(Mat4.translation(15.69, 0, 0));
    // let cueballtransfrom = model_transform.times(Mat4.translation(-9.2, 0, 0));
    // this.shapes.table.draw(context, program_state, table_transform, this.materials.table);
    // this.shapes.ball.draw(context, program_state, ball_transform, this.materials.red_ball);
    // this.shapes.ball.draw(context, program_state, model_transform, this.materials.yellow_ball);
    // this.shapes.ball.draw(context, program_state, cueballtransfrom, this.materials.cue_ball);
    //
    // const ball_positions = [
    //     vec3(0, 0, 0),                    // White ball (Cue ball)
    //     vec3(0, 4.16, 0),                 // Red ball
    //     vec3(0, -4.16, 0),                // Yellow ball
    //     vec3(8.69, 0, 0),                 // Green ball
    //     vec3(12.29, 2.08, 0),             // Brown ball
    //     vec3(12.29, -2.08, 0),            // Blue ball
    //     vec3(15.89, 4.16, 0),             // Pink ball
    //     vec3(15.89, -4.16, 0),            // Black ball
    //     vec3(4.34, 2.08, 0),              // Light-blue ball
    //     vec3(4.34, -2.08, 0),             // Dark-green ball
    //     vec3(7.94, 0, 0),                 // Orange ball
    //     vec3(11.54, 2.08, 0),             // Light-pink ball
    //     vec3(11.54, -2.08, 0),            // Light-brown ball
    //     vec3(15.14, 2.08, 0),             // Grey ball
    //     vec3(15.14, -2.08, 0),            // green ball
    //     vec3(18.74, 0, 0)                 // blue ball
    // ];
    // for (let i = 0; i < ball_positions.length; i++) {
    //     let balling_transform = model_transform.times(Mat4.translation(ball_positions[i]));
    //     const ball_material = i === 0 ? this.materials.yellow_ball : this.materials.red_ball;
    //     this.shapes.ball.draw(context, program_state, balling_transform, this.materials.red_ball);
    //     this.shapes.ball.draw(context, program_state, balling_transform, this.materials.yellow_ball);
    // }
    // const stick_transform = model_transform.times(Mat4.translation(-16, 0, 0))
    //     .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
    //     .times(Mat4.scale(10,1,1));
    // this.shapes.stick.draw(context, program_state, stick_transform, this.materials.stick);

    // this.displayScore(context);
    // Call the reset_balls function to reset the positions of the balls
    // this.reset_balls();
    // }
}
}
class Texture_Scroll_X extends Textured_Phong {
    // TODO:  Modify the shader below (right now it's just the same fragment shader as Textured_Phong) for requirement #6.
    fragment_glsl_code() {
        return this.shared_glsl_code() + `
            varying vec2 f_tex_coord;
            uniform sampler2D texture;
            uniform float animation_time;

        void main(){
            // Sample the texture image in the correct place:

            float slide_trans = mod(animation_time, 4.) * 2.;
            mat4 slide_matrix = mat4(vec4(-1., 0., 0., 0.),
                vec4( 0., 1., 0., 0.),
                vec4( 0., 0., 1., 0.),
                vec4(slide_trans, 0., 0., 1.));
            vec4 new_tex_coord = vec4(f_tex_coord, 0, 0) + vec4(1., 1., 0., 1.);
            new_tex_coord = slide_matrix * new_tex_coord;
            vec4 tex_color = texture2D(texture, new_tex_coord.xy);

            float u = mod(new_tex_coord.x, 1.0);
            float v = mod(new_tex_coord.y, 1.0);

            // top
            if (v > 0.75 && v < 0.85 && u > 0.15 && u < 0.85) {
                tex_color = vec4(0, 0, 0, 1.0);
            }
            // bottom
            if (v > 0.15 && v < 0.25 && u > 0.15 && u < 0.85) {
                tex_color = vec4(0, 0, 0, 1.0);
            }
            // left
            if (u > 0.15 && u < 0.25 && v > 0.15 && v < 0.85) {
                tex_color = vec4(0, 0, 0, 1.0);
            }
            // right
            if (u > 0.75 && u < 0.85 && v > 0.15 && v < 0.85) {
                tex_color = vec4(0, 0, 0, 1.0);
            }

            if( tex_color.w < .01 ) discard;
            // Compute an initial (ambient) color:
            gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient, shape_color.w * tex_color.w );
            // Compute the final color with contributions from lights:
            gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
        } `;
    }
}

class Gouraud_Shader extends Shader {
    // This is a Shader using Phong_Shader as template
    // TODO: Modify the glsl coder here to create a Gouraud Shader (Planet 2)

    constructor(num_lights = 2) {
        super();
        this.num_lights = num_lights;
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        const int N_LIGHTS = ` + this.num_lights + `;
        uniform float ambient, diffusivity, specularity, smoothness;
        uniform vec4 light_positions_or_vectors[N_LIGHTS], light_colors[N_LIGHTS];
        uniform float light_attenuation_factors[N_LIGHTS];
        uniform vec4 shape_color;
        uniform vec3 squared_scale, camera_center;

        // Specifier "varying" means a variable's final value will be passed from the vertex shader
        // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the
        // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 N, vertex_worldspace;
        varying vec4 vertex_color;

        // ***** PHONG SHADING HAPPENS HERE: *****
        vec3 phong_model_lights( vec3 N, vec3 vertex_worldspace ){
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the
                // light will appear directional (uniform direction from all points), and we
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to
                // the point light's location from the current surface point.  In either case,
                // fade (attenuate) the light as the vector needed to reach it gets longer.
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz -
                                               light_positions_or_vectors[i].w * vertex_worldspace;
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );

                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
            return result;
        } `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
            attribute vec3 position, normal;
            // Position is expressed in object coordinates.

            uniform mat4 model_transform;
            uniform mat4 projection_camera_model_transform;

            void main(){
                // The vertex's final resting place (in NDCS):
                gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
                // The final normal vector in screen space.
                N = normalize( mat3( model_transform ) * normal / squared_scale);
                vertex_worldspace = ( model_transform * vec4( position, 1.0 ) ).xyz;

                vertex_color = vec4(shape_color.xyz * ambient, shape_color.w);
                vertex_color.xyz += phong_model_lights(N, vertex_worldspace);
            } `;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // A fragment is a pixel that's overlapped by the current triangle.
        // Fragments affect the final image or get discarded due to depth.
        return this.shared_glsl_code() + `
            void main(){
                gl_FragColor = vertex_color;
                return;
            } `;
    }

    send_material(gl, gpu, material) {
        // send_material(): Send the desired shape-wide material qualities to the
        // graphics card, where they will tweak the Phong lighting formula.
        gl.uniform4fv(gpu.shape_color, material.color);
        gl.uniform1f(gpu.ambient, material.ambient);
        gl.uniform1f(gpu.diffusivity, material.diffusivity);
        gl.uniform1f(gpu.specularity, material.specularity);
        gl.uniform1f(gpu.smoothness, material.smoothness);
    }

    send_gpu_state(gl, gpu, gpu_state, model_transform) {
        // send_gpu_state():  Send the state of our whole drawing context to the GPU.
        const O = vec4(0, 0, 0, 1), camera_center = gpu_state.camera_transform.times(O).to3();
        gl.uniform3fv(gpu.camera_center, camera_center);
        // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
        const squared_scale = model_transform.reduce(
            (acc, r) => {
                return acc.plus(vec4(...r).times_pairwise(r))
            }, vec4(0, 0, 0, 0)).to3();
        gl.uniform3fv(gpu.squared_scale, squared_scale);
        // Send the current matrices to the shader.  Go ahead and pre-compute
        // the products we'll need of the of the three special matrices and just
        // cache and send those.  They will be the same throughout this draw
        // call, and thus across each instance of the vertex shader.
        // Transpose them since the GPU expects matrices as column-major arrays.
        const PCM = gpu_state.projection_transform.times(gpu_state.camera_inverse).times(model_transform);
        gl.uniformMatrix4fv(gpu.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        gl.uniformMatrix4fv(gpu.projection_camera_model_transform, false, Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Omitting lights will show only the material color, scaled by the ambient term:
        if (!gpu_state.lights.length)
            return;

        const light_positions_flattened = [], light_colors_flattened = [];
        for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
            light_positions_flattened.push(gpu_state.lights[Math.floor(i / 4)].position[i % 4]);
            light_colors_flattened.push(gpu_state.lights[Math.floor(i / 4)].color[i % 4]);
        }
        gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
        gl.uniform4fv(gpu.light_colors, light_colors_flattened);
        gl.uniform1fv(gpu.light_attenuation_factors, gpu_state.lights.map(l => l.attenuation));
    }

    update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
        // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
        // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
        // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
        // program (which we call the "Program_State").  Send both a material and a program state to the shaders
        // within this function, one data field at a time, to fully initialize the shader for a draw.

        // Fill in any missing fields in the Material object with custom defaults for this shader:
        const defaults = {color: color(0, 0, 0, 1), ambient: 0, diffusivity: 1, specularity: 1, smoothness: 40};
        material = Object.assign({}, defaults, material);

        this.send_material(context, gpu_addresses, material);
        this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
    }
}

class Ring_Shader extends Shader {
    update_GPU(context, gpu_addresses, graphics_state, model_transform, material) {
        // update_GPU():  Defining how to synchronize our JavaScript's variables to the GPU's:
        const [P, C, M] = [graphics_state.projection_transform, graphics_state.camera_inverse, model_transform],
            PCM = P.times(C).times(M);
        context.uniformMatrix4fv(gpu_addresses.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        context.uniformMatrix4fv(gpu_addresses.projection_camera_model_transform, false,
            Matrix.flatten_2D_to_1D(PCM.transposed()));
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        varying vec4 point_position;
        varying vec4 center;
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        attribute vec3 position;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_model_transform;

        void main(){
          center = model_transform * vec4(0.0, 0.0, 0.0, 1.0);
          point_position = model_transform * vec4(position, 1.0);
          gl_Position = projection_camera_model_transform * vec4(position, 1.0);
        }`;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        void main(){
            float val = .5 * sin(28.0 * distance(point_position.xyz, center.xyz));
            gl_FragColor = val * vec4(0.608, 0.424, 0.109, 1.0);
        }`;
    }
}
//
// export class Shape_From_File extends Shape {
//     // **Shape_From_File** is a versatile standalone Shape that imports
//     // all its arrays' data from an .obj 3D model file.
//     constructor(filename) {
//         super("position", "normal", "texture_coord");
//         // Begin downloading the mesh. Once that completes, return
//         // control to our parse_into_mesh function.
//         this.load_file(filename);
//     }
//
//     load_file(filename) {
//         // Request the external file and wait for it to load.
//         // Failure mode:  Loads an empty shape.
//         return fetch(filename)
//             .then((response) => {
//                 if (response.ok) return Promise.resolve(response.text());
//                 else return Promise.reject(response.status);
//             })
//             .then((obj_file_contents) => this.parse_into_mesh(obj_file_contents))
//             .catch((error) => {
//                 this.copy_onto_graphics_card(this.gl);
//             });
//     }
//
//     parse_into_mesh(data) {
//         // Adapted from the "webgl-obj-loader.js" library found online:
//         var verts = [],
//             vertNormals = [],
//             textures = [],
//             unpacked = {};
//
//         unpacked.verts = [];
//         unpacked.norms = [];
//         unpacked.textures = [];
//         unpacked.hashindices = {};
//         unpacked.indices = [];
//         unpacked.index = 0;
//
//         var lines = data.split("\n");
//
//         var VERTEX_RE = /^v\s/;
//         var NORMAL_RE = /^vn\s/;
//         var TEXTURE_RE = /^vt\s/;
//         var FACE_RE = /^f\s/;
//         var WHITESPACE_RE = /\s+/;
//
//         for (var i = 0; i < lines.length; i++) {
//             var line = lines[i].trim();
//             var elements = line.split(WHITESPACE_RE);
//             elements.shift();
//
//             if (VERTEX_RE.test(line)) verts.push.apply(verts, elements);
//             else if (NORMAL_RE.test(line)) vertNormals.push.apply(vertNormals, elements);
//             else if (TEXTURE_RE.test(line)) textures.push.apply(textures, elements);
//             else if (FACE_RE.test(line)) {
//                 var quad = false;
//                 for (var j = 0, eleLen = elements.length; j < eleLen; j++) {
//                     if (j === 3 && !quad) {
//                         j = 2;
//                         quad = true;
//                     }
//                     if (elements[j] in unpacked.hashindices) unpacked.indices.push(unpacked.hashindices[elements[j]]);
//                     else {
//                         var vertex = elements[j].split("/");
//
//                         unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 0]);
//                         unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 1]);
//                         unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 2]);
//
//                         if (textures.length) {
//                             unpacked.textures.push(+textures[(vertex[1] - 1 || vertex[0]) * 2 + 0]);
//                             unpacked.textures.push(+textures[(vertex[1] - 1 || vertex[0]) * 2 + 1]);
//                         }
//
//                         unpacked.norms.push(+vertNormals[(vertex[2] - 1 || vertex[0]) * 3 + 0]);
//                         unpacked.norms.push(+vertNormals[(vertex[2] - 1 || vertex[0]) * 3 + 1]);
//                         unpacked.norms.push(+vertNormals[(vertex[2] - 1 || vertex[0]) * 3 + 2]);
//
//                         unpacked.hashindices[elements[j]] = unpacked.index;
//                         unpacked.indices.push(unpacked.index);
//                         unpacked.index += 1;
//                     }
//                     if (j === 3 && quad) unpacked.indices.push(unpacked.hashindices[elements[0]]);
//                 }
//             }
//         }
//         {
//             const { verts, norms, textures } = unpacked;
//             for (var j = 0; j < verts.length / 3; j++) {
//                 this.arrays.position.push(vec3(verts[3 * j], verts[3 * j + 1], verts[3 * j + 2]));
//                 this.arrays.normal.push(vec3(norms[3 * j], norms[3 * j + 1], norms[3 * j + 2]));
//                 this.arrays.texture_coord.push(vec(textures[2 * j], textures[2 * j + 1]));
//             }
//             this.indices = unpacked.indices;
//         }
//         this.normalize_positions(false);
//         this.ready = true;
//     }
//
//     draw(context, program_state, model_transform, material) {
//         // draw(): Same as always for shapes, but cancel all
//         // attempts to draw the shape before it loads:
//         if (this.ready) super.draw(context, program_state, model_transform, material);
//     }
// }
//
