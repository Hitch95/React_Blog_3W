const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = userInfo;
    next();
  });
};

export default authMiddleware;
