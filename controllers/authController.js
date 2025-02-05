const authController = {
    register: (req, res) => {
        res.send("User registered successfully");
    },
    login: (req, res) => {
        res.send("User logged in successfully");
    }
};

module.exports = authController;
 
