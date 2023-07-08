import sql from 'mssql';
import config from '../database/config.js'



// // Get all users
export const getUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("select * from users");
        res.status(200).json(result.recordset);
        
    } catch (error) {
        res.status(201).json({ error: 'an error occurred while fetching users' });
    } finally {
        sql.close(); // Close the SQL connection
    }
};