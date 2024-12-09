const express = require("express");
const fanInteractionRouter = express.Router();
const fanInteractionController = require("../controllers/fanInteraction");

fanInteractionRouter.get("/getall", fanInteractionController.getAll);
/**
 * @swagger
 * /fanInteraction/getall:
 *    get:
 *      summary: Obtain a list of all fan interaction collections.
 *      security:
 *        - githubAuth: []
 *      tags:
 *        - fan Interaction
 *      responses:
 *        200:
 *          description: List of fan interaction successfully retrieved
 *        401:
 *          description: Not authorized
 *        500:
 *          description: Internal server error
 */

fanInteractionRouter.post("/add", fanInteractionController.createFanInteraction);
/**
 * @swagger
 * /fanInteraction/add:
 *   post:
 *     summary: Create a new fan interaction.
 *     security:
 *       - githubAuth: []
 *     tags:
 *       - fan Interaction
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
 *               interactionType:
 *                 type: string
 *                 example: "New game"
 *               content:
 *                 type: string
 *                 example: "Habra partido entre la la U y Colo Colo"
 *               date:
 *                 type: numeric
 *                 example: 2024-12-12
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

fanInteractionRouter.put("/:id", fanInteractionController.updateFanInteraction);
/**
 * @swagger
 * /fanInteraction/{id}:
 *   put:
 *     summary: Update an existing fan interaction.
 *     security:
 *       - githubAuth: []
 *     tags:
 *       - fan Interaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fan interaction to update.
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
 *               interactionType:
 *                 type: string
 *                 example: "New game updated"
 *               content:
 *                 type: string
 *                 example: "Habra partido entre la la U y Colo Colo new Date"
 *               date:
 *                 type: numeric
 *                 example: 2024-12-22
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

fanInteractionRouter.delete("/:id", fanInteractionController.deleteFanInteraction);
/**
 * @swagger
 * /fanInteraction/{id}:
 *   delete:
 *     summary: Delete a fan interaction by ID.
 *     security:
 *       - githubAuth: []
 *     tags:
 *       - fan Interaction
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fan interaction to delete.
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

module.exports = fanInteractionRouter;
