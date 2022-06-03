const cardsRouter = require('express').Router();
const { validateCreateCard, validateCardId } = require('../middlewares/validate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', validateCreateCard, createCard);
cardsRouter.delete('/cards/:cardId', validateCardId, deleteCard);
cardsRouter.put('/cards/:cardId/likes', validateCardId, likeCard);
cardsRouter.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRouter;
