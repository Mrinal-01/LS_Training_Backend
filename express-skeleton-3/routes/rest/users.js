const User = require("../../models/user")

module.exports = {
  /**
    *
    * @api {get} /user/:id get user details
    * @apiName userDetails
    * @apiGroup User
    * @apiVersion  1.0.0
    * @apiPermission User
    *
    * @apiHeader {String} Authorization The JWT Token in format "Bearer xxxx.yyyy.zzzz"
    *
    * @apiParam {String} id Users unique ID.
    *
    * @apiSuccess (200) {json} name description
    *
    * @apiSuccessExample {type} Success-Response:
      {
        "error" : false,
        "user" : {
          "email": "myEmail@logic-square.com",
          "phone": "00000000000",
          "name"  : {
            "first":"Jhon",
            "last" :"Doe"
          }
        }
      }
    *
    *
  */

      async get(req, res) {
        try {
          const { text } = req.params
          console.log(text);
          
          const user = await User.find(
              {"$or":[
                {"name.first":{"$regex":text,"$options":"i"}},
                {"name.last":{"$regex":text,"$options":"i"}}
              ]}
            )
            .select("name -_id")
            .exec()
          if (user === null) throw new Error("No user found for the given id")
            
            // const fullNames = user.map(user => `${user.name.first} ${user.name.last}`);

          // Send only the full names in the response
          return res.json({
              error: false,
              // user: fullNames
              user
          })
        } catch (err) {
          return res.status(500).json({
            error: true,
            reason: err.message
          })
        }
      }
    }







//   async get(req, res) {
//     try {
//       const { id } = req.params
//       const user = await User.findOne({
//           _id: id
//         })
//         .select("-password -forgotpassword")
//         .exec()
//       if (user === null) throw new Error("No user found for the given id")
//       return res.json({
//         error: false,
//         user
//       })
//     } catch (err) {
//       return res.status(500).json({
//         error: true,
//         reason: err.message
//       })
//     }
//   }
// }