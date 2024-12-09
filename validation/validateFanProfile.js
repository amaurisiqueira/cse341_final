const { body, validationResult } = require("express-validator");

const validateFanProfile = [
  body("name")
    .matches(/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]+$/u) // Permitir múltiples palabras y espacios
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "El nombre debe tener entre 3 y 30 caracteres y solo contener letras y números."
    ),

  body("favoriteClubs")
    .matches(/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]+$/u) // Permitir múltiples palabras y espacios
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Los clubes favoritos deben tener entre 3 y 30 caracteres y solo contener letras y números."
    ),

  body("preferences")
    .matches(/^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s,.!?]+$/u) // Permitir múltiples palabras, espacios y algunos signos de puntuación
    .isLength({ min: 3, max: 100 }) // Aumentar el límite para permitir frases más largas
    .withMessage(
      "Las preferencias deben tener entre 3 y 100 caracteres y solo contener letras, números y algunos signos de puntuación."
    ),
];

module.exports = validateFanProfile;
