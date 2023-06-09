// import {defs, tiny} from './examples/common.js';
// import { Shape_From_File } from './examples/obj-file-demo.js';
// import {Text_Line} from "./examples/text-demo.js";
//
// const {
//     Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
// } = tiny;
//
// const {Textured_Phong, Cube} = defs
//
// export class Snooker extends Scene {
//     constructor() {
//         super();
//         this.shapes = {
//             table: new defs.Square(),
//             ball: new defs.Subdivision_Sphere(6),
//             stick: new Shape_From_File("./assets/stick.obj"),
//             text: new Text_Line(35),
//             // text: new defs.Square(),
//         };
//
//         this.materials = {
//             table: new Material(new Textured_Phong(), {
//                 ambient: 2, diffusivity: 0.5, specularity: 1,
//                 texture: new Texture("assets/atable.png")
//             }),
//             cue_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#FFFFFF"),
//                 ambient: 1, diffusivity: 1, specularity: 1
//             }),
//             red_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#FF0000"),
//                 ambient: 1, diffusivity: 1, specularity: 1,
//             }),
//             yellow_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#FFFF00"),
//                 ambient: 1, diffusivity: 1, specularity: 1
//             }),
//             green_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#013220"),
//                 ambient: 1, diffusivity: 1, specularity: 1
//             }),
//             brown_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#964B00"),
//                 ambient: 1.2, diffusivity: 1, specularity: 1
//             }),
//             blue_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#00008B"),
//                 ambient: 1, diffusivity: 1, specularity: 1
//             }),
//             pink_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#FF69B4"),
//                 ambient: 1, diffusivity: 1, specularity: 1
//             }),
//             black_ball: new Material(new defs.Phong_Shader(), {
//                 color: hex_color("#000000"),
//                 ambient: 1, diffusivity: 1, specularity: 1
//             }),
//             stick: new Material(new defs.Phong_Shader(), {
//                 // color: hex_color("#000000"),
//                 ambient: 1, diffusivity: 1, specularity: 1,
//                 //  texture: new Texture("assets/stick.obj")
//             }),
//             score: new Material(new defs.Textured_Phong(1), {
//             ambient: 1, diffusivity: 0, specularity: 0, color: hex_color("#FFFF00"),
//             texture: new Texture("assets/text.png")
//             }),
//         };
//
//         this.cue_ball = {
//             velocity: vec(0.1, -0.2),
//             position: vec(3, 0.8),
//             score: 0,
//         };
//
//         this.red_ball_1 = {
//             velocity: vec(0,0),
//             position: vec(3.54,0),
//             score: 1,
//         };
//
//         this.red_ball_2 = {
//             velocity: vec(0,0),
//             position: vec(4.08,0.3),
//             score: 1,
//         };
//
//         this.red_ball_3 = {
//             velocity: vec(0,0),
//             position: vec(4.08, -0.3),
//             score: 1,
//         };
//
//         this.yellow_ball = {
//             velocity: vec(0.2,-0.1),
//             position: vec(-3.38, 1.6),
//             score: 2,
//         };
//
//         this.green_ball = {
//             velocity: vec(0,0),
//             position: vec(-3.38, -1.6),
//             score: 3,
//         };
//
//         this.brown_ball = {
//             velocity: vec(0.3,0),
//             position: vec(-3.38, 0),
//             score: 4,
//         };
//
//         this.blue_ball = {
//             velocity: vec(0,0),
//             position: vec(0,0),
//             score: 5,
//         };
//
//         this.pink_ball = {
//             velocity: vec(0,0),
//             position: vec(2.95, 0),
//             score: 6,
//         };
//
//         this.black_ball = {
//             velocity: vec(0,0),
//             position: vec(5.32, 0),
//             score: 7,
//         };
//
//         this.max_score = 30;
//         this.score = {
//             player1: 0,
//             player2: 0,
//         }
//         this.current_player = {
//             "player1": true,
//             "player2": false,
//         }
//         this.player1_color = hex_color("#ff0000");
//         this.player2_color = hex_color("#0000ff");
//
//         this.initial_camera_location = Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0));
//         this.starting = false;
//         this.resetting = false;
//
//     }
//
//     updateScore(player) {
//         this.score[player] += 1;
//         this.current_player = player === "player1" ? "player2" : "player1";
//     }
//
//     displayScore(context) {
//         const {width, height} = context.canvas;
//         const scoreText = `Player 1: ${this.score.player1}    Player 2: ${this.score.player2}`;
//         const currentPlayerText = `Current Player: ${this.current_player}`;
//         context.font = "20px Arial";
//         context.fillStyle = "white";
//         context.fillText(scoreText, 10, height - 40);
//         context.fillText(currentPlayerText, 10, height - 20);
//     }
//
//     update_one_player_score(context, program_state) {
//         let player1_score_transform = Mat4.identity().times(Mat4.translation(-5, 12, -8));
//         this.shapes.text.set_string(`Score: ${this.score['player1']}`, context.context);
//         this.shapes.text.draw(context, program_state, player1_score_transform,
//             this.materials.score.override({color: this.player1_color}));
//     }
//
//     update_two_player_score(context, program_state) {
//         let player1_score_transform = Mat4.identity().times(Mat4.translation(-3, 12, -8));
//         this.shapes.text.set_string(`${this.score['player1']}`, context.context);
//         this.shapes.text.draw(context, program_state, player1_score_transform,
//             this.materials.score.override({color: this.player1_color}));
//         let colon_transform = player1_score_transform.times(Mat4.translation(3, 0, 0));
//         this.shapes.text.set_string(':', context.context);
//         this.shapes.text.draw(context, program_state, colon_transform, this.materials.score);
//         let player2_score_transform = colon_transform.times(Mat4.translation(3, 0, 0));
//         this.shapes.text.set_string(`${this.score['player2']}`, context.context);
//         this.shapes.text.draw(context, program_state, player2_score_transform,
//             this.materials.score.override({color: this.player2_color}));
//     }
//
//     move_ball(program_state, ball) {
//         const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
//         const friction = 0.98;
//
//         ball.velocity[0] *= friction;
//         ball.velocity[1] *= friction;
//
//         // If the velocity is very small, set it to zero to stop the ball completely
//         if(Math.abs(ball.velocity[0]) < 0.0003) ball.velocity[0] = 0;
//         if(Math.abs(ball.velocity[1]) < 0.0003) ball.velocity[1] = 0;
//
//         // Now add the (reduced) velocity to the ball's position
//         ball.position[0] += ball.velocity[0]*t;
//         ball.position[1] += ball.velocity[1]*t;
//     }
//
//     make_goal(program_state, ball) {
//
//         let ball_posi_x = ball.position[0], ball_posi_y = ball.position[1];
//         let goal_on_left_right = false;
//         let goal_on_middle = false;
//
//         goal_on_left_right = (ball_posi_x >= 6.4 && ball_posi_y >= 3.2) || (ball_posi_x >= 6.4 && ball_posi_y <= -3.2)
//             || (ball_posi_x <= -6.4 && ball_posi_y >= 3.2) || (ball_posi_x <= -6.4 && ball_posi_y <= -3.2)
//             || (ball_posi_x >= 6.6 && ball_posi_y >= 2.9) || (ball_posi_x >= 6.6 && ball_posi_y <= -2.9)
//             || (ball_posi_x <= -6.6 && ball_posi_y >= 2.9) || (ball_posi_x <= -6.6 && ball_posi_y <= -2.9);
//         this.goal_on_left_right = goal_on_left_right;
//
//         goal_on_middle = (ball_posi_y >= 3.23 && ball_posi_x <= 0.27 && ball_posi_x >= -0.27)
//             || (ball_posi_y <= -3.23 && ball_posi_x <= 0.27 && ball_posi_x >= -0.27);
//         this.goal_on_middle = goal_on_middle;
//
//         if(this.goal_on_middle || this.goal_on_left_right)
//         {
//             ball.position = vec(-9999, -9999);
//         }
//     }
//
//     handleCollision(ball1, ball2) {
//         let dx = ball1.position[0] - ball2.position[0];
//         let dy = ball1.position[1] - ball2.position[1];
//         let distance = Math.sqrt(dx * dx + dy * dy);
//         let collision_feasibility = (distance < 0.46);
//         // let collision_feasibility = (dx <= 0.15 && dy <= 0.15);
//         if (collision_feasibility) {
//             const damping = 0.96;  // Damping factor
//
//             // Calculate collision angle
//             let collisionAngle = Math.atan2(dy, dx);
//
//             // Calculate the minimum translation distance
//             let overlap = 0.46 - distance;
//             let separationX = overlap * Math.cos(collisionAngle);
//             let separationY = overlap * Math.sin(collisionAngle);
//
//             // Swap velocities
//             let tempVX = ball1.velocity[0];
//             let tempVY = ball1.velocity[1];
//
//             ball1.velocity[0] = ball2.velocity[0] * damping;
//             ball1.velocity[1] = ball2.velocity[1] * damping;
//
//             ball2.velocity[0] = tempVX * damping;
//             ball2.velocity[1] = tempVY * damping;
//
//             // Separate the balls to prevent overlapping
//             ball1.position[0] += separationX;
//             ball1.position[1] += separationY;
//             ball2.position[0] -= separationX;
//             ball2.position[1] -= separationY;
//         }
//     }
//
//
//     ball_table_collision_detection(program_state, ball)
//     {
//         const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
//
//         let friction = 0.84;
//         let ball_pos = ball.position;
//         let ball_pos_x = ball.position[0], ball_pos_y = ball.position[1];
//         let intersects_on_x_axis = false;
//         let intersects_on_y_axis = false;
//
//         intersects_on_y_axis = (ball_pos_x >= 6.63 && ball_pos_y <= 2.9 && ball_pos_y >= -2.9)
//             || (ball_pos_x <= -6.6 && ball_pos_y <= 2.9 && ball_pos_y >= -2.9);
//         this.intersects_on_y_axis = intersects_on_y_axis;
//
//         intersects_on_x_axis = (ball_pos_y >= 3.23 && ball_pos_x <= 6.2 && ball_pos_x >= 0.27)
//             || (ball_pos_y >= 3.23 && ball_pos_x >= -6.2 && ball_pos_x <= -0.27)
//             || (ball_pos_y <= -3.23 && ball_pos_x <= 6.2 && ball_pos_x >= 0.27)
//             || (ball_pos_y <= -3.23 && ball_pos_x >= -6.2 && ball_pos_x <= -0.27);
//         this.intersects_on_x_axis = intersects_on_x_axis;
//
//         // Update ball position and velocity after collision with the table
//         if (this.intersects_on_y_axis) {
//             // Reverse the velocity on the x-axis and apply a bounce constant
//             ball.velocity[0] *= -friction;
//             ball.velocity[1] *= friction;
//             ball.position[0] += ball.velocity[0]*t*friction;
//             ball.position[1] += ball.velocity[1]*t*friction;
//             // Reset collision flags
//             this.intersects_on_y_axis = false;
//         }
//         if (this.intersects_on_x_axis) {
//             // Reverse the velocity on the x-axis and apply a bounce constant
//             ball.velocity[1] *= -friction;
//             ball.velocity[0] *= friction;
//             ball.position[0] += ball.velocity[0]*t*friction;
//             ball.position[1] += ball.velocity[1]*t*friction;
//             // Reset collision flags
//             this.intersects_on_x_axis = false;
//         }
//     }
//
//     make_control_panel() {
//         // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
//         this.key_triggered_button("Start Game", ["s"], () => this.starting = !this.starting);
//         this.new_line();
//         this.key_triggered_button("Reset game", ["Escape"], () => this.resetting = !this.resetting);
//         this.new_line();
//         this.key_triggered_button("Power Up", ["ArrowUp"], () => this.attached = () => this.planet_2);
//         this.new_line();
//         this.key_triggered_button("Power Down", ["ArrowDown"], () => this.attached = () => this.planet_3);
//         this.new_line();
//         this.key_triggered_button("Shoot", ["m"], () => this.attached = () => this.moon);
//     }
//
//     display(context, program_state) {
//         if (!context.scratchpad.controls) {
//             this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
//             program_state.set_camera(this.initial_camera_location);
//         }
//         program_state.projection_transform = Mat4.perspective(
//             Math.PI / 4, context.width / context.height, .1, 1000);
//         const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
//
//         // lighting
//         const light_position = vec4(0, 0, 0, 1);
//         program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 3)];
//
//         let model_transform = Mat4.identity();
//
//         // create table
//         let table_transform = model_transform.times(Mat4.translation(0, 0, 0))
//             .times(Mat4.scale(7.5, 7.4, 1));
//         this.shapes.table.draw(context, program_state, table_transform, this.materials.table);
//
//         // Scoreboard
//         let player_score_transform = model_transform.times(Mat4.translation(0, 0, 0));
//         this.shapes.text.set_string(`Score: ${this.score.player1}`, context.context);
//         this.shapes.text.draw(context, program_state, player_score_transform,
//             this.materials.score);
//         // let scoreboard_transform = model_transform.times(Mat4.translation(-5, -4, 0))
//         //     .times(Mat4.scale(0.5,0.5,1));
//         // this.shapes.text.draw(context, program_state, scoreboard_transform, this.materials.score);
//
//         // Draw the stick
//         let stick_transform = model_transform.times(Mat4.translation(0, 0, 0))
//             //.times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
//             .times(Mat4.scale(1, 1, 1));
//         // this.shapes.stick.draw(context, program_state, stick_transform, this.materials.stick);
//
//         // start game
//         if (this.starting) {
//             // create ball transform
//             let cue_ball_transform = model_transform.times(Mat4.translation(this.cue_ball.position[0], this.cue_ball.position[1], 0)
//                 .times(Mat4.scale(0.23, 0.23, 0.23)));
//             let red_ball_1_transform = model_transform.times(Mat4.translation(this.red_ball_1.position[0], this.red_ball_1.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let red_ball_2_transform = model_transform.times(Mat4.translation(this.red_ball_2.position[0], this.red_ball_2.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let red_ball_3_transform = model_transform.times(Mat4.translation(this.red_ball_3.position[0], this.red_ball_3.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let yellow_ball_transform = model_transform.times(Mat4.translation(this.yellow_ball.position[0], this.yellow_ball.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let green_ball_transform = model_transform.times(Mat4.translation(this.green_ball.position[0], this.green_ball.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let brown_ball_transform = model_transform.times(Mat4.translation(this.brown_ball.position[0], this.brown_ball.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let blue_ball_transform = model_transform.times(Mat4.translation(this.blue_ball.position[0], this.blue_ball.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let pink_ball_transform = model_transform.times(Mat4.translation(this.pink_ball.position[0], this.pink_ball.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//             let black_ball_transform = model_transform.times(Mat4.translation(this.black_ball.position[0], this.black_ball.position[1], 0))
//                 .times(Mat4.scale(0.24, 0.24, 0.24));
//
//             // create all balls
//             this.shapes.ball.draw(context, program_state, cue_ball_transform, this.materials.cue_ball);
//             this.shapes.ball.draw(context, program_state, red_ball_1_transform, this.materials.red_ball);
//             this.shapes.ball.draw(context, program_state, red_ball_2_transform, this.materials.red_ball);
//             this.shapes.ball.draw(context, program_state, red_ball_3_transform, this.materials.red_ball);
//             this.shapes.ball.draw(context, program_state, yellow_ball_transform, this.materials.yellow_ball);
//             this.shapes.ball.draw(context, program_state, green_ball_transform, this.materials.green_ball);
//             this.shapes.ball.draw(context, program_state, brown_ball_transform, this.materials.brown_ball);
//             this.shapes.ball.draw(context, program_state, blue_ball_transform, this.materials.blue_ball);
//             this.shapes.ball.draw(context, program_state, pink_ball_transform, this.materials.pink_ball);
//             this.shapes.ball.draw(context, program_state, black_ball_transform, this.materials.black_ball);
//
//             // start ball movement
//             this.move_ball(program_state, this.cue_ball);
//             this.move_ball(program_state, this.red_ball_1);
//             this.move_ball(program_state, this.red_ball_2);
//             this.move_ball(program_state, this.red_ball_3);
//             this.move_ball(program_state, this.yellow_ball);
//             this.move_ball(program_state, this.green_ball);
//             this.move_ball(program_state, this.brown_ball);
//             this.move_ball(program_state, this.blue_ball);
//             this.move_ball(program_state, this.pink_ball);
//             this.move_ball(program_state, this.black_ball);
//
//             // ball table collision
//             this.ball_table_collision_detection(program_state, this.cue_ball);
//             this.ball_table_collision_detection(program_state, this.red_ball_1);
//             this.ball_table_collision_detection(program_state, this.red_ball_2);
//             this.ball_table_collision_detection(program_state, this.red_ball_3);
//             this.ball_table_collision_detection(program_state, this.yellow_ball);
//             this.ball_table_collision_detection(program_state, this.green_ball);
//             this.ball_table_collision_detection(program_state, this.brown_ball);
//             this.ball_table_collision_detection(program_state, this.blue_ball);
//             this.ball_table_collision_detection(program_state, this.pink_ball);
//             this.ball_table_collision_detection(program_state, this.black_ball);
//
//             // detect make goal
//             this.make_goal(program_state, this.cue_ball);
//             this.make_goal(program_state, this.red_ball_1);
//             this.make_goal(program_state, this.red_ball_2);
//             this.make_goal(program_state, this.red_ball_3);
//             this.make_goal(program_state, this.yellow_ball);
//             this.make_goal(program_state, this.green_ball);
//             this.make_goal(program_state, this.brown_ball);
//             this.make_goal(program_state, this.blue_ball);
//             this.make_goal(program_state, this.pink_ball);
//             this.make_goal(program_state, this.black_ball);
//
//             // Collision for cue_ball
//             this.handleCollision(this.cue_ball, this.red_ball_1);
//             this.handleCollision(this.cue_ball, this.red_ball_2);
//             this.handleCollision(this.cue_ball, this.red_ball_3);
//             this.handleCollision(this.cue_ball, this.yellow_ball);
//             this.handleCollision(this.cue_ball, this.green_ball);
//             this.handleCollision(this.cue_ball, this.brown_ball);
//             this.handleCollision(this.cue_ball, this.blue_ball);
//             this.handleCollision(this.cue_ball, this.pink_ball);
//             this.handleCollision(this.cue_ball, this.black_ball);
//
//             // Collision for red_ball_1
//             this.handleCollision(this.red_ball_1, this.red_ball_2);
//             this.handleCollision(this.red_ball_1, this.red_ball_3);
//             this.handleCollision(this.red_ball_1, this.yellow_ball);
//             this.handleCollision(this.red_ball_1, this.green_ball);
//             this.handleCollision(this.red_ball_1, this.brown_ball);
//             this.handleCollision(this.red_ball_1, this.blue_ball);
//             this.handleCollision(this.red_ball_1, this.pink_ball);
//             this.handleCollision(this.red_ball_1, this.black_ball);
//
//             // Collision for red_ball_2
//             this.handleCollision(this.red_ball_2, this.red_ball_3);
//             this.handleCollision(this.red_ball_2, this.yellow_ball);
//             this.handleCollision(this.red_ball_2, this.green_ball);
//             this.handleCollision(this.red_ball_2, this.brown_ball);
//             this.handleCollision(this.red_ball_2, this.blue_ball);
//             this.handleCollision(this.red_ball_2, this.pink_ball);
//             this.handleCollision(this.red_ball_2, this.black_ball);
//
//             // Collision for red_ball_3
//             this.handleCollision(this.red_ball_3, this.yellow_ball);
//             this.handleCollision(this.red_ball_3, this.green_ball);
//             this.handleCollision(this.red_ball_3, this.brown_ball);
//             this.handleCollision(this.red_ball_3, this.blue_ball);
//             this.handleCollision(this.red_ball_3, this.pink_ball);
//             this.handleCollision(this.red_ball_3, this.black_ball);
//
//             // Collision for yellow_ball
//             this.handleCollision(this.yellow_ball, this.green_ball);
//             this.handleCollision(this.yellow_ball, this.brown_ball);
//             this.handleCollision(this.yellow_ball, this.blue_ball);
//             this.handleCollision(this.yellow_ball, this.pink_ball);
//             this.handleCollision(this.yellow_ball, this.black_ball);
//
//             // Collision for green_ball
//             this.handleCollision(this.green_ball, this.brown_ball);
//             this.handleCollision(this.green_ball, this.blue_ball);
//             this.handleCollision(this.green_ball, this.pink_ball);
//             this.handleCollision(this.green_ball, this.black_ball);
//
//             // Collision for brown_ball
//             this.handleCollision(this.brown_ball, this.blue_ball);
//             this.handleCollision(this.brown_ball, this.pink_ball);
//             this.handleCollision(this.brown_ball, this.black_ball);
//
//             // Collision for blue_ball
//             this.handleCollision(this.blue_ball, this.pink_ball);
//             this.handleCollision(this.blue_ball, this.black_ball);
//
//             // Collision for pink_ball
//             this.handleCollision(this.pink_ball, this.black_ball);
//         }
//
//         // reset ball positions & velocities
//         if (this.resetting)
//         {
//             // ball positions
//             this.cue_ball.position = vec(-5, -0.8);
//             this.red_ball_1.position = vec(3.54, 0);
//             this.red_ball_2.position = vec(4.08, 0.3);
//             this.red_ball_3.position = vec(4.08, -0.3);
//             this.yellow_ball.position = vec(-3.38, 1.6);
//             this.green_ball.position = vec(-3.38, -1.6);
//             this.brown_ball.position = vec(-3.38, 0);
//             this.blue_ball.position = vec(0, 0);
//             this.pink_ball.position = vec(2.95, 0);
//             this.black_ball.position = vec(5.32, 0);
//
//             // ball velocities
//             this.cue_ball.velocity = vec(0,0);
//             this.red_ball_1.velocity = vec(0,0);
//             this.red_ball_2.velocity = vec(0,0);
//             this.red_ball_3.velocity = vec(0,0);
//             this.yellow_ball.velocity = vec(0,0);
//             this.green_ball.velocity = vec(0,0);
//             this.brown_ball.velocity = vec(0,0);
//             this.blue_ball.velocity = vec(0,0);
//             this.pink_ball.velocity = vec(0,0);
//             this.black_ball.velocity = vec(0,0);
//         }
//     }
// }
//
// class Texture_Scroll_X extends Textured_Phong {
//     // TODO:  Modify the shader below (right now it's just the same fragment shader as Textured_Phong) for requirement #6.
//     fragment_glsl_code() {
//         return this.shared_glsl_code() + `
//             varying vec2 f_tex_coord;
//             uniform sampler2D texture;
//             uniform float animation_time;
//
//         void main(){
//             // Sample the texture image in the correct place:
//
//             float slide_trans = mod(animation_time, 4.) * 2.;
//             mat4 slide_matrix = mat4(vec4(-1., 0., 0., 0.),
//                 vec4( 0., 1., 0., 0.),
//                 vec4( 0., 0., 1., 0.),
//                 vec4(slide_trans, 0., 0., 1.));
//             vec4 new_tex_coord = vec4(f_tex_coord, 0, 0) + vec4(1., 1., 0., 1.);
//             new_tex_coord = slide_matrix * new_tex_coord;
//             vec4 tex_color = texture2D(texture, new_tex_coord.xy);
//
//             float u = mod(new_tex_coord.x, 1.0);
//             float v = mod(new_tex_coord.y, 1.0);
//
//             // top
//             if (v > 0.75 && v < 0.85 && u > 0.15 && u < 0.85) {
//                 tex_color = vec4(0, 0, 0, 1.0);
//             }
//             // bottom
//             if (v > 0.15 && v < 0.25 && u > 0.15 && u < 0.85) {
//                 tex_color = vec4(0, 0, 0, 1.0);
//             }
//             // left
//             if (u > 0.15 && u < 0.25 && v > 0.15 && v < 0.85) {
//                 tex_color = vec4(0, 0, 0, 1.0);
//             }
//             // right
//             if (u > 0.75 && u < 0.85 && v > 0.15 && v < 0.85) {
//                 tex_color = vec4(0, 0, 0, 1.0);
//             }
//
//             if( tex_color.w < .01 ) discard;
//             // Compute an initial (ambient) color:
//             gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient, shape_color.w * tex_color.w );
//             // Compute the final color with contributions from lights:
//             gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
//         } `;
//     }
// }

import {defs, tiny} from './examples/common.js';
import { Shape_From_File } from './examples/obj-file-demo.js';
import {Text_Line} from "./examples/text-demo.js";

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

const {Textured_Phong, Cube} = defs

export class Snooker extends Scene {
    constructor() {
        super();
        this.shapes = {
            table: new defs.Square(),
            ball: new defs.Subdivision_Sphere(6),
            //stick: new Shape_From_File("./assets/stick.obj"),
            text: new Text_Line(35),
            // text: new defs.Square(),
            stick: new defs.Square(),
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
            red_ball: new Material(new defs.Phong_Shader(), {
                color: hex_color("#FF0000"),
                ambient: 1, diffusivity: 1, specularity: 1,
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
            stick: new Material(new defs.Phong_Shader(), {
                color: hex_color("#FAFAD2"),
                ambient: 1, diffusivity: 1, specularity: 1,
                //  texture: new Texture("assets/stick.obj")
            }),
            score: new Material(new defs.Textured_Phong(1), {
                ambient: 1, diffusivity: 0, specularity: 0, color: hex_color("#FFFF00"),
                texture: new Texture("assets/text.png")
            }),
        };

        this.cue_ball = {
            velocity: vec(0, 0),
            // position: vec(-5, -0.8),
            position: vec(4,1),
            score: 0,
        };

        this.red_ball_1 = {
            velocity: vec(0,0),
            position: vec(3.54,0),
            score: 1,
        };

        this.red_ball_2 = {
            velocity: vec(0,0),
            position: vec(4.08,0.3),
            score: 1,
        };

        this.red_ball_3 = {
            velocity: vec(0,0),
            position: vec(4.08, -0.3),
            score: 1,
        };

        this.yellow_ball = {
            velocity: vec(0,0),
            position: vec(-3.38, 1.6),
            score: 2,
        };

        this.green_ball = {
            velocity: vec(0,0),
            position: vec(-3.38, -1.6),
            score: 3,
        };

        this.brown_ball = {
            velocity: vec(0,0),
            position: vec(-3.38, 0),
            score: 4,
        };

        this.blue_ball = {
            velocity: vec(0,0),
            position: vec(0,0),
            score: 5,
        };

        this.pink_ball = {
            velocity: vec(0,0),
            position: vec(2.95, 0),
            score: 6,
        };

        this.black_ball = {
            velocity: vec(0,0),
            position: vec(5.32, 0),
            score: 7,
        };

        // this.stick = {
        //     velocity: vec(0,0),
        //     // position: vec(this.cue_ball.position[0] + 1, this.cue_ball.position[1] + 14.2),
        //     position: vec(0,0),
        // };

        // this.angle1 = Math.cos(Math.atan2(this.stick.position[1],this.stick.position[0]));
        // this.angle2 = Math.sin(Math.atan2(this.stick.position[1],this.stick.position[0]));

        this.radius = 2.2;  // This is your desired radius of rotation
        this.rotation_angle = Math.PI*7/6;  // This is the angle by which you want to rotate the stick.
        this.rotation_point = vec(this.cue_ball.position[0], this.cue_ball.position[1]);  // The point around which you want to rotate the stick.
        // Calculate the new position of the stick after the rotation.
        this.new_position = vec(
            this.rotation_point[0] + this.radius * Math.cos(this.rotation_angle),
            this.rotation_point[1] + this.radius * Math.sin(this.rotation_angle),
        );

        this.stick = {
            velocity: vec(0,0),
            // position: vec(this.cue_ball.position[0] + 1, this.cue_ball.position[1] + 14.2),
            position: vec(0,0),
        };
        this.angle1 = Math.cos(Math.atan2(this.stick.position[1],this.stick.position[0]));
        this.angle2 = Math.sin(Math.atan2(this.stick.position[1],this.stick.position[0]));
        this.stick_transform = Mat4.identity()
            .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
            .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
            .times(Mat4.translation(this.stick.position[0], this.stick.position[1], 0))
            .times(Mat4.scale(1.8, 0.14, 1));

        // this.stick = {
        //     velocity: vec(0,0),
        //     // position: vec(this.cue_ball.position[0] + 1, this.cue_ball.position[1] + 14.2),
        //     position: vec(this.rotation_point[0] + this.radius * Math.cos(this.rotation_angle),
        //         this.rotation_point[1] + this.radius * Math.sin(this.rotation_angle)),
        // };

        this.max_score = 30;
        this.score = {
            player1: 0,
            player2: 0,
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
        this.power_up = false;
        this.power_down = false;
        this.rotate_left = false;
        this.rotate_right = false;
    }

    updateScore(player) {
        this.score[player] += 1;
        this.current_player = player === "player1" ? "player2" : "player1";
    }

    displayScore(context) {
        const {width, height} = context.canvas;
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

    move_ball(program_state, ball) {
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        const friction = 0.98;

        ball.velocity[0] *= friction;
        ball.velocity[1] *= friction;

        // If the velocity is very small, set it to zero to stop the ball completely
        if(Math.abs(ball.velocity[0]) < 0.0003) ball.velocity[0] = 0;
        if(Math.abs(ball.velocity[1]) < 0.0003) ball.velocity[1] = 0;

        // Now add the (reduced) velocity to the ball's position
        ball.position[0] += ball.velocity[0]*t;
        ball.position[1] += ball.velocity[1]*t;
    }

    make_goal(program_state, ball) {

        let ball_posi_x = ball.position[0], ball_posi_y = ball.position[1];
        let goal_on_left_right = false;
        let goal_on_middle = false;

        goal_on_left_right = (ball_posi_x >= 6.4 && ball_posi_y >= 3.2) || (ball_posi_x >= 6.4 && ball_posi_y <= -3.2)
            || (ball_posi_x <= -6.4 && ball_posi_y >= 3.2) || (ball_posi_x <= -6.4 && ball_posi_y <= -3.2)
            || (ball_posi_x >= 6.6 && ball_posi_y >= 2.9) || (ball_posi_x >= 6.6 && ball_posi_y <= -2.9)
            || (ball_posi_x <= -6.6 && ball_posi_y >= 2.9) || (ball_posi_x <= -6.6 && ball_posi_y <= -2.9);
        this.goal_on_left_right = goal_on_left_right;

        goal_on_middle = (ball_posi_y >= 3.23 && ball_posi_x <= 0.27 && ball_posi_x >= -0.27)
            || (ball_posi_y <= -3.23 && ball_posi_x <= 0.27 && ball_posi_x >= -0.27);
        this.goal_on_middle = goal_on_middle;

        if(this.goal_on_middle || this.goal_on_left_right)
        {
            ball.position = vec(-9999, -9999);
        }
    }

    handleCollision(ball1, ball2) {
        let dx = ball1.position[0] - ball2.position[0];
        let dy = ball1.position[1] - ball2.position[1];
        let distance = Math.sqrt(dx * dx + dy * dy);
        let collision_feasibility = (distance < 0.46);
        // let collision_feasibility = (dx <= 0.15 && dy <= 0.15);
        if (collision_feasibility) {
            const damping = 0.96;  // Damping factor

            // Calculate collision angle
            let collisionAngle = Math.atan2(dy, dx);

            // Calculate the minimum translation distance
            let overlap = 0.46 - distance;
            let separationX = overlap * Math.cos(collisionAngle);
            let separationY = overlap * Math.sin(collisionAngle);

            // Swap velocities
            let tempVX = ball1.velocity[0];
            let tempVY = ball1.velocity[1];

            ball1.velocity[0] = ball2.velocity[0] * damping;
            ball1.velocity[1] = ball2.velocity[1] * damping;

            ball2.velocity[0] = tempVX * damping;
            ball2.velocity[1] = tempVY * damping;

            // Separate the balls to prevent overlapping
            ball1.position[0] += separationX;
            ball1.position[1] += separationY;
            ball2.position[0] -= separationX;
            ball2.position[1] -= separationY;
        }
    }

    ball_table_collision_detection(program_state, ball)
    {
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        let friction = 0.84;
        let ball_pos = ball.position;
        let ball_pos_x = ball.position[0], ball_pos_y = ball.position[1];
        let intersects_on_x_axis = false;
        let intersects_on_y_axis = false;

        intersects_on_y_axis = (ball_pos_x >= 6.63 && ball_pos_y <= 2.9 && ball_pos_y >= -2.9)
            || (ball_pos_x <= -6.6 && ball_pos_y <= 2.9 && ball_pos_y >= -2.9);
        this.intersects_on_y_axis = intersects_on_y_axis;

        intersects_on_x_axis = (ball_pos_y >= 3.23 && ball_pos_x <= 6.2 && ball_pos_x >= 0.27)
            || (ball_pos_y >= 3.23 && ball_pos_x >= -6.2 && ball_pos_x <= -0.27)
            || (ball_pos_y <= -3.23 && ball_pos_x <= 6.2 && ball_pos_x >= 0.27)
            || (ball_pos_y <= -3.23 && ball_pos_x >= -6.2 && ball_pos_x <= -0.27);
        this.intersects_on_x_axis = intersects_on_x_axis;

        // Update ball position and velocity after collision with the table
        if (this.intersects_on_y_axis) {
            // Reverse the velocity on the x-axis and apply a bounce constant
            ball.velocity[0] *= -friction;
            ball.velocity[1] *= friction;
            ball.position[0] += ball.velocity[0]*t*friction;
            ball.position[1] += ball.velocity[1]*t*friction;
            // Reset collision flags
            this.intersects_on_y_axis = false;
        }
        if (this.intersects_on_x_axis) {
            // Reverse the velocity on the x-axis and apply a bounce constant
            ball.velocity[1] *= -friction;
            ball.velocity[0] *= friction;
            ball.position[0] += ball.velocity[0]*t*friction;
            ball.position[1] += ball.velocity[1]*t*friction;
            // Reset collision flags
            this.intersects_on_x_axis = false;
        }
    }

    power_stick() {
        if (this.power_up) {
            // if (this.angle1 > 0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(0.1, 0, 0));
            // if (this.angle1 <0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(-0.1, 0, 0));
            // if (this.angle2 > 0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(0, 0.1, 0));
            // if (this.angle2 < 0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(0, -0.1, 0));

            if (this.angle1 > 0)
                this.stick.position[0] += 0.1;
            if (this.angle1 <0)
                this.stick.position[0] -= 0.1;
            if (this.angle2 > 0)
                this.stick.position[1] += 0.1;
            if (this.angle2 < 0)
                this.stick.position[1] -= 0.1;

            this.stick_transform = Mat4.identity()
                .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
                .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
                .times(Mat4.translation(this.stick.position[0], this.stick.position[1], 0))
                .times(Mat4.scale(1.8, 0.14, 1));

            // if (this.angle1 > 0)
            //     this.stick_transform = Mat4.identity()
            //         .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
            //         .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
            //         .times(Mat4.scale(1.8, 0.14, 1))
            //         .times(Mat4.translation(0.1, 0, 0));
            //
            // if (this.angle1 <0)
            //     this.stick_transform = Mat4.identity()
            //         .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
            //         .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
            //         .times(Mat4.scale(1.8, 0.14, 1))
            //         .times(Mat4.translation(-0.1, 0, 0));
            //
            // if (this.angle2 > 0)
            //     this.stick_transform = Mat4.identity()
            //         .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
            //         .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
            //         .times(Mat4.scale(1.8, 0.14, 1)).times(Mat4.translation(0, 0.1, 0));
            //
            // if (this.angle2 < 0)
            //     this.stick_transform = Mat4.identity()
            //         .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
            //         .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
            //         .times(Mat4.scale(1.8, 0.14, 1)).times(Mat4.translation(0, -0.1, 0));

                // Mat4.identity()
                // .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
                // .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
                // .times(Mat4.scale(1.8, 0.14, 1))

            this.power_up = false;
        }

        if (this.power_down) {

            if (this.angle1 > 0)
                this.stick.position[0] -= 0.1;
            if (this.angle1 <0)
                this.stick.position[0] += 0.1;
            if (this.angle2 > 0)
                this.stick.position[1] -= 0.1;
            if (this.angle2 < 0)
                this.stick.position[1] += 0.1;

            // if (this.angle1 > 0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(-0.1, 0, 0));
            // if (this.angle1 <0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(0.1, 0, 0));
            // if (this.angle2 > 0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(0, -0.1, 0));
            // if (this.angle2 < 0)
            //     this.stick_transform = this.stick_transform.times(Mat4.translation(0, 0.1, 0));

            this.stick_transform = Mat4.identity()
                .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
                .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
                .times(Mat4.translation(this.stick.position[0], this.stick.position[1], 0))
                .times(Mat4.scale(1.8, 0.14, 1));

            this.power_down = false;
        }
    }

    rotate_stick() {
        if (this.rotate_left) {
            this.rotation_angle += Math.PI/12;
            this.new_position = vec(
                this.rotation_point[0] + this.radius * Math.cos(this.rotation_angle),
                this.rotation_point[1] + this.radius * Math.sin(this.rotation_angle),
            );
            this.stick_transform = Mat4.identity()
                .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
                .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
                .times(Mat4.scale(1.8, 0.14, 1));
            this.rotate_left = false;
        }
        if (this.rotate_right) {
            this.rotation_angle -= Math.PI/12;
            this.new_position = vec(
                this.rotation_point[0] + this.radius * Math.cos(this.rotation_angle),
                this.rotation_point[1] + this.radius * Math.sin(this.rotation_angle),
            );
            this.stick_transform = Mat4.identity()
                .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
                .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
                .times(Mat4.scale(1.8, 0.14, 1));
            this.rotate_right = false;
        }
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Start Game", ["s"], () => this.starting = !this.starting);
        this.new_line();
        this.key_triggered_button("Reset game", ["Escape"], () => this.resetting = !this.resetting);
        this.new_line();
        this.key_triggered_button("Power Up", ["ArrowUp"], () => this.power_up = !this.power_up);
        this.new_line();
        this.key_triggered_button("Power Down", ["ArrowDown"], () => this.power_down = !this.power_down);
        this.new_line();
        this.key_triggered_button("Rotate counterclockwise", ["ArrowLeft"], () => this.rotate_left = !this.rotate_left);
        this.new_line();
        this.key_triggered_button("Rotate clockwise", ["ArrowRight"], () => this.rotate_right = !this.rotate_right);
        this.new_line();
        this.key_triggered_button("Shoot", ["m"], () => this.attached = () => this.moon);
    }

    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            program_state.set_camera(this.initial_camera_location);
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        // lighting
        const light_position = vec4(0, 0, 0, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 3)];

        let model_transform = Mat4.identity();

        // Scoreboard
        // let player_score_transform = model_transform.times(Mat4.translation(0, 0, 0));
        // this.shapes.text.set_string(`Score: 1`, context.context);
        // this.shapes.text.draw(context, program_state, model_transform,
        //     this.materials.score);
        // let scoreboard_transform = model_transform.times(Mat4.translation(-5, -4, 0))
        //     .times(Mat4.scale(0.5,0.5,1));
        // this.shapes.text.draw(context, program_state, scoreboard_transform, this.materials.score);

        // start game
        if (this.starting) {
            // create ball transform
            let cue_ball_transform = model_transform.times(Mat4.translation(this.cue_ball.position[0], this.cue_ball.position[1], 0)
                .times(Mat4.scale(0.23, 0.23, 0.23)));

            let radius = 2.2;  // This is your desired radius of rotation
            let rotation_angle = Math.PI*7/6;  // This is the angle by which you want to rotate the stick.
            let rotation_point = vec(this.cue_ball.position[0], this.cue_ball.position[1]);  // The point around which you want to rotate the stick.
            // Calculate the new position of the stick after the rotation.
            let new_position = vec(
                rotation_point[0] + radius * Math.cos(rotation_angle),
                rotation_point[1] + radius * Math.sin(rotation_angle)
            );
            // Now, translate and rotate the stick according to the new position.
            // let stick_transform = model_transform
            //     .times(Mat4.translation(new_position[0], new_position[1], 0))
            //     .times(Mat4.rotation(rotation_angle, 0, 0, 1))
            //     .times(Mat4.scale(1.8, 0.14, 1));

            let stick_transform = model_transform
                .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
                .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
                .times(Mat4.scale(1.8, 0.14, 1))
                .times(Mat4.translation(1,1,0));

            let red_ball_1_transform = model_transform.times(Mat4.translation(this.red_ball_1.position[0], this.red_ball_1.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let red_ball_2_transform = model_transform.times(Mat4.translation(this.red_ball_2.position[0], this.red_ball_2.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let red_ball_3_transform = model_transform.times(Mat4.translation(this.red_ball_3.position[0], this.red_ball_3.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let yellow_ball_transform = model_transform.times(Mat4.translation(this.yellow_ball.position[0], this.yellow_ball.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let green_ball_transform = model_transform.times(Mat4.translation(this.green_ball.position[0], this.green_ball.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let brown_ball_transform = model_transform.times(Mat4.translation(this.brown_ball.position[0], this.brown_ball.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let blue_ball_transform = model_transform.times(Mat4.translation(this.blue_ball.position[0], this.blue_ball.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let pink_ball_transform = model_transform.times(Mat4.translation(this.pink_ball.position[0], this.pink_ball.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));
            let black_ball_transform = model_transform.times(Mat4.translation(this.black_ball.position[0], this.black_ball.position[1], 0))
                .times(Mat4.scale(0.24, 0.24, 0.24));

            // this.stick_transform = this.stick_transform
            //     .times(Mat4.translation(this.new_position[0], this.new_position[1], 0))
            //     .times(Mat4.rotation(this.rotation_angle, 0, 0, 1))
            //     .times(Mat4.scale(1.8, 0.14, 1));

            //create all balls
            this.shapes.ball.draw(context, program_state, cue_ball_transform, this.materials.cue_ball);
            this.shapes.ball.draw(context, program_state, red_ball_1_transform, this.materials.red_ball);
            this.shapes.ball.draw(context, program_state, red_ball_2_transform, this.materials.red_ball);
            this.shapes.ball.draw(context, program_state, red_ball_3_transform, this.materials.red_ball);
            this.shapes.ball.draw(context, program_state, yellow_ball_transform, this.materials.yellow_ball);
            this.shapes.ball.draw(context, program_state, green_ball_transform, this.materials.green_ball);
            this.shapes.ball.draw(context, program_state, brown_ball_transform, this.materials.brown_ball);
            this.shapes.ball.draw(context, program_state, blue_ball_transform, this.materials.blue_ball);
            this.shapes.ball.draw(context, program_state, pink_ball_transform, this.materials.pink_ball);
            this.shapes.ball.draw(context, program_state, black_ball_transform, this.materials.black_ball);
            this.shapes.stick.draw(context, program_state, this.stick_transform, this.materials.stick);

            let table_transform = model_transform.times(Mat4.scale(7.5, 7.4, 1));
            this.shapes.table.draw(context, program_state, table_transform, this.materials.table);

            this.power_stick();
            this.rotate_stick();

            // start ball movement
            this.move_ball(program_state, this.cue_ball);
            this.move_ball(program_state, this.red_ball_1);
            this.move_ball(program_state, this.red_ball_2);
            this.move_ball(program_state, this.red_ball_3);
            this.move_ball(program_state, this.yellow_ball);
            this.move_ball(program_state, this.green_ball);
            this.move_ball(program_state, this.brown_ball);
            this.move_ball(program_state, this.blue_ball);
            this.move_ball(program_state, this.pink_ball);
            this.move_ball(program_state, this.black_ball);

            // ball table collision
            this.ball_table_collision_detection(program_state, this.cue_ball);
            this.ball_table_collision_detection(program_state, this.red_ball_1);
            this.ball_table_collision_detection(program_state, this.red_ball_2);
            this.ball_table_collision_detection(program_state, this.red_ball_3);
            this.ball_table_collision_detection(program_state, this.yellow_ball);
            this.ball_table_collision_detection(program_state, this.green_ball);
            this.ball_table_collision_detection(program_state, this.brown_ball);
            this.ball_table_collision_detection(program_state, this.blue_ball);
            this.ball_table_collision_detection(program_state, this.pink_ball);
            this.ball_table_collision_detection(program_state, this.black_ball);

            // detect make goal
            this.make_goal(program_state, this.cue_ball);
            this.make_goal(program_state, this.red_ball_1);
            this.make_goal(program_state, this.red_ball_2);
            this.make_goal(program_state, this.red_ball_3);
            this.make_goal(program_state, this.yellow_ball);
            this.make_goal(program_state, this.green_ball);
            this.make_goal(program_state, this.brown_ball);
            this.make_goal(program_state, this.blue_ball);
            this.make_goal(program_state, this.pink_ball);
            this.make_goal(program_state, this.black_ball);

            // Collision for cue_ball
            this.handleCollision(this.cue_ball, this.red_ball_1);
            this.handleCollision(this.cue_ball, this.red_ball_2);
            this.handleCollision(this.cue_ball, this.red_ball_3);
            this.handleCollision(this.cue_ball, this.yellow_ball);
            this.handleCollision(this.cue_ball, this.green_ball);
            this.handleCollision(this.cue_ball, this.brown_ball);
            this.handleCollision(this.cue_ball, this.blue_ball);
            this.handleCollision(this.cue_ball, this.pink_ball);
            this.handleCollision(this.cue_ball, this.black_ball);

            // Collision for red_ball_1
            this.handleCollision(this.red_ball_1, this.red_ball_2);
            this.handleCollision(this.red_ball_1, this.red_ball_3);
            this.handleCollision(this.red_ball_1, this.yellow_ball);
            this.handleCollision(this.red_ball_1, this.green_ball);
            this.handleCollision(this.red_ball_1, this.brown_ball);
            this.handleCollision(this.red_ball_1, this.blue_ball);
            this.handleCollision(this.red_ball_1, this.pink_ball);
            this.handleCollision(this.red_ball_1, this.black_ball);

            // Collision for red_ball_2
            this.handleCollision(this.red_ball_2, this.red_ball_3);
            this.handleCollision(this.red_ball_2, this.yellow_ball);
            this.handleCollision(this.red_ball_2, this.green_ball);
            this.handleCollision(this.red_ball_2, this.brown_ball);
            this.handleCollision(this.red_ball_2, this.blue_ball);
            this.handleCollision(this.red_ball_2, this.pink_ball);
            this.handleCollision(this.red_ball_2, this.black_ball);

            // Collision for red_ball_3
            this.handleCollision(this.red_ball_3, this.yellow_ball);
            this.handleCollision(this.red_ball_3, this.green_ball);
            this.handleCollision(this.red_ball_3, this.brown_ball);
            this.handleCollision(this.red_ball_3, this.blue_ball);
            this.handleCollision(this.red_ball_3, this.pink_ball);
            this.handleCollision(this.red_ball_3, this.black_ball);

            // Collision for yellow_ball
            this.handleCollision(this.yellow_ball, this.green_ball);
            this.handleCollision(this.yellow_ball, this.brown_ball);
            this.handleCollision(this.yellow_ball, this.blue_ball);
            this.handleCollision(this.yellow_ball, this.pink_ball);
            this.handleCollision(this.yellow_ball, this.black_ball);

            // Collision for green_ball
            this.handleCollision(this.green_ball, this.brown_ball);
            this.handleCollision(this.green_ball, this.blue_ball);
            this.handleCollision(this.green_ball, this.pink_ball);
            this.handleCollision(this.green_ball, this.black_ball);

            // Collision for brown_ball
            this.handleCollision(this.brown_ball, this.blue_ball);
            this.handleCollision(this.brown_ball, this.pink_ball);
            this.handleCollision(this.brown_ball, this.black_ball);

            // Collision for blue_ball
            this.handleCollision(this.blue_ball, this.pink_ball);
            this.handleCollision(this.blue_ball, this.black_ball);

            // Collision for pink_ball
            this.handleCollision(this.pink_ball, this.black_ball);

        }

        // reset ball positions & velocities
        if (this.resetting)
        {
            // ball positions
            this.cue_ball.position = vec(-5, -0.8);
            this.red_ball_1.position = vec(3.54, 0);
            this.red_ball_2.position = vec(4.08, 0.3);
            this.red_ball_3.position = vec(4.08, -0.3);
            this.yellow_ball.position = vec(-3.38, 1.6);
            this.green_ball.position = vec(-3.38, -1.6);
            this.brown_ball.position = vec(-3.38, 0);
            this.blue_ball.position = vec(0, 0);
            this.pink_ball.position = vec(2.95, 0);
            this.black_ball.position = vec(5.32, 0);

            // ball velocities
            this.cue_ball.velocity = vec(0,0);
            this.red_ball_1.velocity = vec(0,0);
            this.red_ball_2.velocity = vec(0,0);
            this.red_ball_3.velocity = vec(0,0);
            this.yellow_ball.velocity = vec(0,0);
            this.green_ball.velocity = vec(0,0);
            this.brown_ball.velocity = vec(0,0);
            this.blue_ball.velocity = vec(0,0);
            this.pink_ball.velocity = vec(0,0);
            this.black_ball.velocity = vec(0,0);
        }
    }
}