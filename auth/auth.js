const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  req.flash('not_logged_in', "You are not logged in");
  res.redirect('/login');
}

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect(`/users/${req.user.id}/dashboard`);

  next();
}

module.exports = {
  checkAuthenticated,
  checkLoggedIn
}