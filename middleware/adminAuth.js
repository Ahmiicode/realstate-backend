import jwt from 'jsonwebtoken';
const adminAuth = async (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization;
      if (!bearerToken) {
        return res.status(403).json({ success: false, message: "Not Authorized Login Again" });
      }
  
      const token = bearerToken.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decoded.email !== process.env.ADMIN_EMAIL) {
        return res.status(403).json({ success: false, message: "Not Authorized Login Again" });
      }
  
      next();
    } catch (error) {
      console.log("Auth error:", error);
      res.status(403).json({ success: false, message: error.message });
    }
  };
  


export default adminAuth;
