const passwordValidator = require('password-validator');

// Create a schema
const schemaPassword = new passwordValidator();

// Add properties to it
schemaPassword
.is().min(5)                                    // Minimum length 5
.is().max(50)                                  // Maximum length 50
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf([ 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    if(schemaPassword.validate(req.body.password)) {
        next();
    }else{
        return res.status(400).json({ error : `this password is nt enough: ${schemaPassword.validate('req.body.password',{list: true })}`})
    }
}