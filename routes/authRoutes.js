const express = require("express");
const {
	loginController,
	registerController,
} = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

//IP LIMITER
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//router object
const router = express.Router();

//routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of user collection
 *           example: NEIFJWSOFJSOFJ
 *         firstName:
 *           type: string
 *           description: Enter your first name
 *           example: John
 *         lastName:
 *           type: string
 *           description: Enter your last name
 *           example: Doe
 *         email:
 *           type: string
 *           description: Enter your email id
 *           example: johndoe@gmail.com
 *         password:
 *           type: string
 *           description: Enter your password
 *           example: test@123
 *         location:
 *           type: string
 *           description: Enter your location, can be city or country
 *           example: New Jersey
 *       example:
 *         id: NEIFJWSOFJSOFJ
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@gmail.com
 *         password: test@123
 *         location: New Jersey
 */
  
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication apis
 */

/**
 * @swagger
 *  /api/v1/auth/register:
 *    post:
 *      summary: Register a new user to the job portal
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: Status OK.User registered.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 *  /api/v1/auth/login:
 *    post:
 *      summary: Login an existing user to the job portal
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: Status OK.Successfully logged in.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */


//REGISTER||POST
router.post("/register", limiter, registerController);
//LOGIN||POST
router.post("/login", limiter, loginController);

module.exports = router;
