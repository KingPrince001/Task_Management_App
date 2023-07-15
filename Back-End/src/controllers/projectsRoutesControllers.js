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


//update project

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
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
      .query(`UPDATE projects
              SET projectName = @projectName,
                  description = @description,
                  startDate = @startDate,
                  endDate = @endDate,
                  urgency = @urgency,
                  category = @category,
                  status = @status
              WHERE projectId = ${projectId}`);

      

    res.status(200).json({ message: 'Project updated successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the project' });
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


//update members assigned to a project

export const updateAssignedMembers = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userIds } = req.body;

    let pool = await sql.connect(config.sql);
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      // Delete existing assigned members for the specific project
      const deleteRequest = new sql.Request(transaction);
      deleteRequest.input('projectId', sql.Int, projectId);
      await deleteRequest.query(`DELETE FROM AssignedMembers WHERE projectId = @projectId`);

      // Insert updated assigned members for the specific project
      for (const userId of userIds) {
        const insertRequest = new sql.Request(transaction);
        insertRequest.input('projectId', sql.Int, projectId);
        insertRequest.input('user_id', sql.Int, userId);
        await insertRequest.query(`INSERT INTO AssignedMembers (projectId, user_id)
                                   VALUES (@projectId, @user_id)`);
      }

      await transaction.commit();

      res.status(200).json({ message: 'Assigned members updated successfully' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    } finally {
      transaction.release();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating assigned members', error });
  } finally {
    sql.close();
  }
};


//return project plus members assigned
export const getProjectWithMembers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);

    // Execute the SELECT statement
    const result = await pool
      .request()
      .query(`SELECT
                 p.projectId,
                 p.projectName,
                 p.description,
                 p.startDate,
                 p.endDate,
                 p.urgency,
                 p.category,
                 p.status,
                 u.user_id,
                 u.username,
                 u.email
               FROM
                 projects p
               JOIN
                 AssignedMembers am ON p.projectId = am.projectId
               JOIN
                 users u ON am.user_id = u.user_id`);


    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while retrieving the projects plus members assigned' });
  } finally {
    sql.close();
  }
};


//filter by status
export const filterProjectsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    let pool = await sql.connect(config.sql);

    // Execute the SELECT statement with the WHERE clause
    const result = await pool
      .request()
      .query(`SELECT
                 p.projectId,
                 p.projectName,
                 p.description,
                 p.startDate,
                 p.endDate,
                 p.urgency,
                 p.category,
                 p.status,
                 u.user_id,
                 u.username,
                 u.email
               FROM
                 projects p
               JOIN
                 AssignedMembers am ON p.projectId = am.projectId
               JOIN
                 users u ON am.user_id = u.user_id
               WHERE
                 p.status = '${status}'`);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while filtering projects by status' });
  } finally {
    sql.close();
  }
};

//filter by urgency
export const filterProjectsByUrgency = async (req, res) => {
  try {
    const { urgency } = req.params;

    let pool = await sql.connect(config.sql);

    // Execute the SELECT statement with the WHERE clause
    const result = await pool
      .request()
      .query(`SELECT
                 p.projectId,
                 p.projectName,
                 p.description,
                 p.startDate,
                 p.endDate,
                 p.urgency,
                 p.category,
                 p.status,
                 u.user_id,
                 u.username,
                 u.email
               FROM
                 projects p
               JOIN
                 AssignedMembers am ON p.projectId = am.projectId
               JOIN
                 users u ON am.user_id = u.user_id
               WHERE
                 p.urgency = '${urgency}'`);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while filtering projects by urgency' });
  } finally {
    sql.close();
  }
};

//filter by category
export const filterProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    let pool = await sql.connect(config.sql);

    // Execute the SELECT statement with the WHERE clause
    const result = await pool
      .request()
      .query(`SELECT
                 p.projectId,
                 p.projectName,
                 p.description,
                 p.startDate,
                 p.endDate,
                 p.urgency,
                 p.category,
                 p.status,
                 u.user_id,
                 u.username,
                 u.email
               FROM
                 projects p
               JOIN
                 AssignedMembers am ON p.projectId = am.projectId
               JOIN
                 users u ON am.user_id = u.user_id
               WHERE
                 p.category = '${category}'`);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while filtering projects by category' });
  } finally {
    sql.close();
  }
};