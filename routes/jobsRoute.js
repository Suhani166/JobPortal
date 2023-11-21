const express = require("express");
const userAuth = require("../middlewares/authMiddleware");
const {
	createJobController,
	findJobsController,
	updateJobController,
	deleteJobController,
    jobStatsController,
} = require("../controllers/jobController");

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of user collection
 *           example: NEIFJWSOFJSOFJ
 *         company:
 *           type: string
 *           description: Enter the company name offering the job.
 *           example: Microsoft
 *         position:
 *           type: string
 *           description: Enter the job offered.
 *           example: UI/UX Designer
 *         status:
 *           type: string
 *           description: Enter the status of job application
 *           example: pending
 *         workType:
 *           type: string
 *           description: Enter the type of job like full-time , part-time, etc
 *           example: internship
 *         workLocation:
 *           type: string
 *           description: Enter the location of the company. Whether the job is remote, hybrid or at a certain place.
 *           example: Remote
 *       example:
 *         id: NEIFJWSOFJSOFJ
 *         company: Amazon
 *         position: Senior Developer Engineer
 *         status: interview
 *         workType: full-time
 *         workLocation: remote
 */
  
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job apis
 */

/**
 * @swagger
 *  /api/v1/job/create-job:
 *    post:
 *      summary: Create a new job to the job portal
 *      tags: [Jobs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Job'
 *      responses:
 *        '200':
 *          description: Status OK.Job created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 *  /api/v1/job/find-job:
 *    get:
 *      summary: Get a job from the job portal
 *      tags: [Jobs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Job'
 *      responses:
 *        '200':
 *          description: Status OK.Found the jobs.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 *  /api/v1/job/update-job/{id}:
 *    patch:
 *      summary: Update a job on the job portal.
 *      tags: [Jobs]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the job to update
 *          schema:
 *            type: string
 *        - in: header
 *          name: Authorization
 *          required: true
 *          description: Access token
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Job'
 *      responses:
 *        '200':
 *          description: Status OK. Job Updated.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        '401':
 *          description: Unauthorized. Invalid token.
 *        '403':
 *          description: Forbidden. User not authorized to update the job.
 *        '404':
 *          description: Job not found.
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 *  /api/v1/job/delete-job/{id}:
 *    delete:
 *      summary: Delete job on the job portal.
 *      tags: [Jobs]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the job to delete
 *          schema:
 *            type: string
 *        - in: header
 *          name: Authorization
 *          required: true
 *          description: Access token
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Status OK. Job Deleted.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        '401':
 *          description: Unauthorized. Invalid token.
 *        '403':
 *          description: Forbidden. User not authorized to delete the job.
 *        '404':
 *          description: Job not found.
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 *  /api/v1/job/job-stats:
 *    get:
 *      summary: Update a job on the job portal.
 *      tags: [Jobs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Job'
 *      responses:
 *        '200':
 *          description: Status OK. Job Filtered.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 */

//Create job|| post
router.post("/create-job", userAuth, createJobController);

//FIND JOB||GET
router.get("/find-job", userAuth, findJobsController);

//UPDATE JOBS||PUT||PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS||DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

//JOB STATS FILTER||GET
router.get("/job-stats", userAuth, jobStatsController);

module.exports = router;
