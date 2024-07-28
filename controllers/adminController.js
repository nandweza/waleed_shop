exports.getAdmin = async(req, res) => {
    try {
        
        if (req.user.isAuthenticated) {
            res.render("admin");
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
}
