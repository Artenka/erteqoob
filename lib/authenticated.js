function isLoggedInAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role !== 'admin' || req.user.status !== 'active') {
            res.status(404);
            res.render('error', {
                message: 'Not Found',
                error  : {
                    status: 404,
                    stack : ''
                }
            });
        } else {
            next();
        }
    } else {
        // redirect to login page ?
        res.status(404);
        res.render('error', {
            message: 'Not Found',
            error  : {
                status: 404,
                stack : ''
            }
        });
    }
}

exports.isLoggedInAdmin = isLoggedInAdmin;