// Testowy endpoint
const photoRouter = (router) => {
  router.get('/test', async (req, res) => {
    res.json({ message: 'pass!' });
  });
};

module.exports = photoRouter;
