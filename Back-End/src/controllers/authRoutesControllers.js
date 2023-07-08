import bcrypt from 'bcrypt';
import sql from 'mssql';
import jwt from 'jsonwebtoken';
import config from '../database/config.js';




export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Register or Login first' });
    }
}


export const register = async (req, res) => {
    console.log(req.body);
    const { username, password, email } = req.body;
    let hashPassword = bcrypt.hashSync(password, 10);
    try {
        let pool = await sql.connect(config.sql);
        const userResult = await pool.request()
            .input("username", sql.VarChar, username)
            .input("email", sql.VarChar, email)
            .query("select * from users where username = @username or email = @email");
        const user = userResult.recordset[0];
        if (user) {
            res.status(401).json({ error: 'You already have an account, Login instead' });
        } else {
            await pool.request()
                .input("username", sql.VarChar, username)
                .input("hashedpassword", sql.VarChar, hashPassword)
                .input("email", sql.VarChar, email)
                .query("insert into users(username,password, email ) values (@username,@hashedpassword,@email)");
            res.status(201).json({ message: 'Account created successfully, continue to login' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the account, try double checking the details entered again' });
    } finally {
        sql.close();
    }
}



export const login = async (req, res) => {
  let pool; // Declaring the pool variable outside the try block

  try {
    const { email, password } = req.body;
    console.log(req.body);
    pool = await sql.connect(config.sql);
    const userResult = await pool.request()
      .input("email", sql.VarChar, email)
      .query("select * from users where email = @email");
    console.log(userResult);
    const user = userResult.recordset[0];

    if (!user) {
      res.status(401).json({ error: 'Account not found. Please register first.' });
    } else if (user) {
      console.log(password, user.password);
      console.log(bcrypt.compareSync(password, user.password));
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ error: 'Authentication failed. Wrong credentials' });
      } else {
        let token = `JWT ${jwt.sign({ email: user.email, username: user.username, id: user.user_id }, `${process.env.JWT_SECRET}`)}`;
        const { user_id, username, email } = user;
        return res.json({ id: user_id, username: username, email: email, token: token });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  } finally {
    if (pool) {
      try {
        await pool.close();
      } catch (error) {
        console.error('Error closing the database connection:', error);
      }
    }
  }
};

  