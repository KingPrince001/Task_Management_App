import sql from 'mssql';
import config from '../database/config.js';

export const createProject = async (req, res) => {
  try {
    const { projectName, description, startDate, endDate, urgency, category, status } = req.body;

    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('projectName', sql.VarChar, projectName)
      .input('description', sql.VarChar, description)
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .input('urgency', sql.VarChar, urgency)
      .input('category', sql.VarChar, category)
      .input('status', sql.VarChar, status)
      .query(`INSERT INTO projects (projectName, description, startDate, endDate, urgency, category, status)
              OUTPUT inserted.projectId
              VALUES (@projectName, @description, @startDate, @endDate, @urgency, @category, @status)`);

    const projectId = result.recordset[0].projectId;

    res.status(200).json({ message: 'Project created successfully', projectId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the project' });
  } finally {
    sql.close();
  }
};


//assigning members to a project

export const assignMembersToProject = async (req, res) => {
  try {
    const { projectId, userIds } = req.body;

    let pool = await sql.connect(config.sql);
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      for (const userId of userIds) {
        const request = new sql.Request(transaction);

        request.input('projectId', sql.Int, projectId);
        request.input('user_id', sql.Int, userId);

        await request.query(`INSERT INTO AssignedMembers (projectId, user_id)
                            VALUES (@projectId, @user_id)`);
      }

      await transaction.commit();

      res.status(200).json({ message: 'Members assigned to project successfully' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      transaction.release();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while assigning members to project', error });
  } finally {
    sql.close();
  }
};

