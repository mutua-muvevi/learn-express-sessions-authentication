module.exports.isAuth = ( req, res, next ) => {
	if(req.isAuthenticated()){
		next()
	} else {
		res.status(401).json({msg:"Not authorized"})
	}
}

module.exports.isAdmin = ( req, res, next ) => {
	if(req.isAuthenticated() && req.user.admin){
		next()
	} else {
		res.status(403).json({msg:"Forbiden"})
	}
}