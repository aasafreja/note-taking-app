const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/db");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const result = await pool
                    .query("SELECT id, name, email, password FROM users.users WHERE email = $1", [email]);
                const user = result.rows[0];

                if (!user) {
                    return done(null, false, { message: "No user with that email" })
                }

                const isMatch = await bcrypt.compare(password, user.password)

                if (!isMatch) {
                    return done(null, false, { message: "Password incorrect" });
                }

                const safeUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                return done(null, safeUser);
            }

            catch (err) {
                return done(err);
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const result = await pool
                .query("SELECT id, name, email FROM users.users WHERE id = $1", [id]);
            const user = result.rows[0];

            if (!user) {
                return done(new Error("User not found"), null)
            }
            done(null, user)
        } catch (err) {
            done(err, null);
        }
    });
}

