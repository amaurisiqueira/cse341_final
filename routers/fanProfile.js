const express = require("express");
const fanProfileRouter = express.Router();
const fanProfileController = require("../controllers/fanProfile");

fanProfileRouter.get("/getall", fanProfileController.getAll);
/**
 * @swagger
 * /fanprofile/getall:
 *    get:
 *      summary: Obtain a list of all fanprofile collections.
 *      security:
 *        - githubAuth: []
 *      tags:
 *        - fan profile
 *      responses:
 *        200:
 *          description: List of fanprofile successfully retrieved
 *        401:
 *          description: Not authorized
 *        500:
 *          description: Internal server error
 */

fanProfileRouter.post("/add", fanProfileController.createFanProfile);
/**
 * @swagger
 * /fanprofile/add:
 *   post:
 *     summary: Create a new fanprofile.
 *     security:
 *       - githubAuth: []
 *     tags:
 *       - fan profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juanito"
 *               favoriteClubs:
 *                 type: string
 *                 example: "U Chile"
 *               preferences:
 *                 type: string
 *                 example: "La U de chile es la mejor en su categoria"
 *
 *     responses:
 *       204:
 *         description: Match created successfully. *
 *       401:
 *          description: Not authorized
 *       404:
 *         description: Bad request, invalid input.
 *       500:
 *         description: Internal server error.
 */

fanProfileRouter.put("/:id", fanProfileController.updateFanProfile);
/**
 * @swagger
 * /fanprofile/{id}:
 *   put:
 *     summary: Update an existing match.
 *     security:
 *       - githubAuth: []
 *     tags:
 *       - fan profile
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fan profile to update.
 *         schema:
 *           type: string
 *           example: "67439c820e89da4a29d66186"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juanito"
 *               favoriteClubs:
 *                 type: string
 *                 example: "U Chile"
 *               preferences:
 *                 type: string
 *                 example: "La U de chile Perdio!"
 *
 *     responses:
 *       204:
 *         description: Match updated successfully.
 *       401:
 *          description: Not authorized
 *       404:
 *         description: Match not found.
 *       500:
 *         description: Internal server error.
 */

fanProfileRouter.delete("/:id", fanProfileController.deleteFanProfile);
/**
 * @swagger
 * /fanprofile/{id}:
 *   delete:
 *     summary: Delete a fanprofile by ID.
 *     security:
 *       - githubAuth: []
 *     tags:
 *       - fan profile
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fan profile to delete.
 *         schema:
 *           type: string
 *           example: "67437a358eb4f184bc632bd1"
 *     responses:
 *       204:
 *         description: match deleted successfully.
 *       401:
 *          description: Not authorized
 *       404:
 *         description: Match not found.
 *       500:
 *         description: Internal server error.
 */

module.exports = fanProfileRouter;
