const role = require('../models/role.js');


module.exports = {
    createRole: async (req, res, next) =>{
        try {
            if(req.body.role && req.body !== "") {
                const newRole = new role(req.body)
                await newRole.save();
                return res.send("role Created")
                // return next(createSuccess(200,'Role Created'))
            } else {
                return res.status(400).send("bad request")
                // return next(createError(400, 'Bad Request'))
            }
        } catch (error) {
            return res.status(500).send("Internal Server Error")
            // return next(createError(500, 'Internal Server Error'))

        }
    },
    updateRole: async (req, res) => {
        try {
          const existingRole = await role.findById(req.params.id);
      
          if (existingRole) {
            const updatedRole = await role.findByIdAndUpdate(
              req.params.id,
              { $set: req.body },
              { new: true }
            );
      
            return res.status(200).send("Role Updated");
          } else {
            return res.status(404).send("Role not found");
          }
        } catch (error) {
          console.error("Error updating role:", error);
          return res.status(500).send("Internal Server Error");
        }},
    getAllRoles: async (req, res) => {
        try {
            const roles = await role.find({})
            return res.status(200).send(roles)
        } catch (error) {
          return res.status(500).send("Internal Server Error");
        }


    },
    deleteRole: async (req, res) => {
        try {
        const roleId = req.params.id;
        const deletedRole = await role.findByIdAndDelete(roleId);
  
        if (deletedRole) {
        return res.status(200).send("Role Deleted");
        } else {
        return res.status(404).send("Role not found");
       }
    } catch (error) {
      console.error("Error deleting role:", error);
      return res.status(500).send("Internal Server Error");
    }
    }
  
}