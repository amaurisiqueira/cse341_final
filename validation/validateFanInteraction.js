const { body, validationResult } = require("express-validator");

const validateFanInteraction = [

    body("name")
    .matches(/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]+$/u) // Permitir múltiples palabras y espacios
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Name must be between 3 characters and 30 characters"
    ),    
    body("interactionType")
    .matches(/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]+$/u) // Permitir múltiples palabras y espacios
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Iteration must be between 3 characters and 30 characters"
    ),

    body("content")
    .matches(/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]+$/u) // Permitir múltiples palabras y espacios
    .isLength({ min: 3, max: 90 })
    .withMessage(
      "Content must be between 3 characters and 90 characters"
    ),
   body("date").isISO8601(),
      
];

module.exports=validateFanInteraction;