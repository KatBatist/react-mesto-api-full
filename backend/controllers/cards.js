const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const NotReqError = require('../errors/not-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotReqError(`Переданы некорректные данные при создании карточки: ${err}`));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const id = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (card.owner.toString() !== id) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((cardDelete) => {
            res.status(200).send({ data: cardDelete });
          })
          .catch(next);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    { _id: cardId },
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send({ data: card });
  }).catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    { _id: cardId },
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send({ data: card });
  }).catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
