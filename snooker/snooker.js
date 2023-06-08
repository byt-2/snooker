import {defs, tiny} from './examples/common.js';
import { Shape_From_File } from './examples/obj-file-demo.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

const {Textured_Phong, Sphere} = defs

export class Snooker extends Scene {
    constructor() {
        super();
        this.shapes = {
            table: new defs.Square(),
            // ball: new defs.Subdivision_Sphere(4),
            ball: new defs.Subdivision_Sphere(6),
            stick: new Shape_From_File("./assets/stick.obj"),
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
                // color: hex_color("#000000"),
                ambient: 1, diffusivity: 1, specularity: 1,
              //  texture: new Texture("assets/stick.obj")
            }),
        };

        this.cue_ball = {
            velocity: vec(0.1, -0.2),
            position: vec(3, 0.8),
        };

        this.red_ball_1 = {
            velocity: vec(0,0),
            position: vec(3.54,0),
        };

        this.red_ball_2 = {
            velocity: vec(0,0),
            position: vec(4.08,0.3),
        };

        this.red_ball_3 = {
            velocity: vec(0,0),
            position: vec(4.08, -0.3),
        };

        this.yellow_ball = {
            velocity: vec(0.2,-0.1),
            position: vec(-3.38, 1.6),
        };

        this.green_ball = {
            velocity: vec(0,0),
            position: vec(-3.38, -1.6),
        };

        this.brown_ball = {
            velocity: vec(0.3,0),
            position: vec(-3.38, 0),
        };

        this.blue_ball = {
            velocity: vec(0,0),
            position: vec(0,0),
        };

        this.pink_ball = {
            velocity: vec(0,0),
            position: vec(2.95, 0),
        };

        this.black_ball = {
            velocity: vec(0,0),
            position: vec(5.32, 0),
        };

        this.balls = []; // Array to store ball objects

        // Create the balls with initial positions and velocities
        // this.createBalls();

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

    createBalls() {
        // Create the balls and add them to the balls array
        const ball_radius = 0.24;
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

            // if(ball2.velocity[0] === 0 && ball1.velocity[0] > 0)
            //     ball1.velocity[0] = 0.001;
            // else if(ball2.velocity[0] === 0 && ball1.velocity[0] < 0)
            //     ball1.velocity[0] = -0.001;
            // else
            //     ball1.velocity[0] = ball2.velocity[0] * damping;
            //
            // if(ball2.velocity[1] === 0 && ball1.velocity[1] > 0)
            //     ball1.velocity[1] = 0.001;
            // else if(ball2.velocity[1] === 0 && ball1.velocity[1] < 0)
            //     ball1.velocity[1] = -0.001;
            // else
            //     ball1.velocity[1] = ball2.velocity[1] * damping;
            //
            // if(ball1.velocity[0] === 0 && ball2.velocity[0] > 0)
            //     ball2.velocity[0] = 0.001;
            // if(ball1.velocity[0] === 0 && ball2.velocity[0] < 0)
            //     ball2.velocity[0] = -0.001;
            // else
            //     ball2.velocity[0] = tempVX * damping;
            //
            // if(ball1.velocity[1] === 0 && ball2.velocity[1] > 0)
            //     ball2.velocity[1] = 0.001;
            // if(ball1.velocity[1] === 0 && ball2.velocity[1] < 0)
            //     ball2.velocity[1] = -0.001;
            // else
            //     ball2.velocity[1] = tempVY * damping;


        }
        // let collisionAngle = Math.atan2(dy, dx);
        //
        // let speed1 = Math.sqrt(ball1.velocity[0] **2 + ball1.velocity[1] **2);
        // let speed2 = Math.sqrt(ball2.velocity[0] **2 + ball2.velocity[1] **2);
        //
        // let direction1 = Math.atan2(ball1.velocity[1], ball1.velocity[0]);
        // let direction2 = Math.atan2(ball2.velocity[1], ball2.velocity[0]);
        //
        // let vx_1 = speed1 * Math.cos(direction1 - collisionAngle);
        // let vy_1 = speed1 * Math.sin(direction1 - collisionAngle);
        // let vx_2 = speed2 * Math.cos(direction2 - collisionAngle);
        // let vy_2 = speed2 * Math.sin(direction2 - collisionAngle);
        //
        // let final_velocityx_1 = ((ball1.mass - ball2.mass) * velocityx_1 + (ball2.mass + ball2.mass) * velocityx_2) / (ball1.mass + ball2.mass);
        // let final_velocityx_2 = ((ball1.mass + ball1.mass) * velocityx_1 + (ball2.mass - ball1.mass) * velocityx_2) / (ball1.mass + ball2.mass);
        //
        // let final_velocityy_1 = velocityy_1;
        // let final_velocityy_2 = velocityy_2;
        //
        // ball1.vx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_1;
        // ball1.vy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_1;
        // ball2.vx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityy_2;
        // ball2.vy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityy_2;
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

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Start Game", ["s"], () => this.starting = !this.starting);
        this.new_line();
        this.key_triggered_button("Reset game", ["Escape"], () => this.starting = this.resetting);
        this.new_line();
        this.key_triggered_button("Power Up", ["ArrowUp"], () => this.attached = () => this.planet_2);
        this.new_line();
        this.key_triggered_button("Power Down", ["ArrowDown"], () => this.attached = () => this.planet_3);
        this.new_line();
        this.key_triggered_button("Shoot", ["m"], () => this.attached = () => this.moon);
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
            .times(Mat4.scale(7.5, 7.4, 1));
        this.shapes.table.draw(context, program_state, table_transform, this.materials.table);

        // Draw the stick

        let stick_transform = model_transform.times(Mat4.translation(0, 0, 0))
            //.times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
            .times(Mat4.scale(1,1,1));
        this.shapes.stick.draw(context, program_state, stick_transform, this.materials.stick);
        if (this.starting) {
            let red_ball_4_transform = model_transform.times(Mat4.translation(4.62, 0.54, 0)).times(Mat4.scale(0.24, 0.24, 0.24));
            let red_ball_5_transform = model_transform.times(Mat4.translation(4.62, 0, 0)).times(Mat4.scale(0.24, 0.24, 0.24));
            let red_ball_6_transform = model_transform.times(Mat4.translation(4.62, -0.54, 0)).times(Mat4.scale(0.24, 0.24, 0.24));

            const stick_transform = model_transform.times(Mat4.translation(0, 0, 0))
            .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
            .times(Mat4.scale(1, 1, 1));

            // this.shapes.ball.draw(context, program_state, red_ball_4_transform, this.materials.red_ball);
            // this.shapes.ball.draw(context, program_state, red_ball_5_transform, this.materials.red_ball);
            // this.shapes.ball.draw(context, program_state, red_ball_6_transform, this.materials.red_ball);


            let cue_ball_transform = model_transform.times(Mat4.translation(this.cue_ball.position[0], this.cue_ball.position[1], 0)
                .times(Mat4.scale(0.23, 0.23, 0.23)));
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
            // this.handleCollision(this.red_ball_1, this.cue_ball);
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
    }

    updateBalls(dt) {
        for (const ball of this.balls) {
            // Update the position of the ball based on its velocity
            ball.position = ball.position.plus(ball.velocity.times(dt));
        }
        this.shapes.stick.draw(context, program_state, stick_transform, this.materials.red_ball);
        let ball_transform = model_transform.times(Mat4.translation(0.27, 3.25, 0))
            .times(Mat4.scale(0.24, 0.24, 0.24));
        let yball_transform = model_transform.times(Mat4.translation(-8, 0, 0));
        this.shapes.ball.draw(context, program_state, ball_transform, this.materials.yellow_ball);
        this.shapes.ball.draw(context, program_state, yball_transform, this.materials.red_ball);
    }
}

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
