const login = async (req, res) => {
    res.send("Hello Login Page");
}

const register = async (req, res) => {
    res.send("Hello register Page");
}

module.exports = {login, register};