/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User signup
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */




/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get logged-in users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of logged-in users
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: John Doe
 *                 email: john@example.com
 *                 created_at : 2020-12-10
 *               - id: 2
 *                 name: Jane Smith
 *                 email: jane@example.com
 *                 created_at : 2020-12-10
 *       401:
 *         description: Unauthorized
 */



/**
 * @swagger
 * /admin/revoke_user_login:
 *   post:
 *     summary: Revoke user's login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 description: User id
 *             required:
 *               - user_id
 *     responses:
 *       200:
 *         description: User login reovked in successfully
 *       401:
 *         description: Invalid credentials
 */


