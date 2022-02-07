module.exports = function asyncWrapper(fun) {
  return (req, res) => {
    try {
      fun(req, res);
    } catch (error) {
      console.error;
    }
  };
};
