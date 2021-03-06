const Goal = require("../models/goalModel");

module.exports.updateTask = (req, res) => {
  const {goalId, tasks} = req.body;
  console.log('tasks:', tasks);
  try{
  tasks.forEach(element => {
    const {taskId, taskTitle} = element; 
    console.log(element);
    Goal.findOneAndUpdate(
      
      { _id:goalId,"goalTasks._id":taskId},
      { $set:{"goalTasks.$.taskTitle":taskTitle}  },
      {new:true,upsert:true},
      (err,doc) => {
        if(err) console.log(err);
        console.log(doc);
      }
      )

    });
    res.status(200).json({
      message: 'Tasks updated!'
    })
  }catch(err){
        res.status(404).json({
          message: err.message,
        })
    }
  };


module.exports.addTask = async (req, res) => {
  const taskTitle = req.body.taskTitle;
  const taskWeekRange = req.body.taskWeekRange;
  const goalId = req.body.goalId;
  
  try {
    const updated = await Goal.findByIdAndUpdate(
      goalId,
      { $push: { goalTasks: {taskTitle, taskWeekRange} }},
      { new: true }
    );
    res.status(200).json({ success: true, message: "UPDATED", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



// module.exports.updateTask = (req, res) => {
//   const {goalId, tasks} = req.body;
//   console.log('tasks:', tasks);
//   try{
//   tasks.forEach(element => {
//     const {taskId, taskTitle} = element; 
//     console.log(element);
//     Goal.findOneAndUpdate(
      
//       { _id:goalId,"goalTasks._id":taskId},
//       { $set:{"goalTasks.$.taskTitle":taskTitle}  },
//       {new:true,upsert:true},
//       (err,doc) => {
//         if(err) console.log(err);
//         console.log(doc);
//       }
//       )

//     });
//     res.status(200).json({
//       message: 'Tasks updated!'
//     })
//   }catch(err){
//         res.status(404).json({
//           message: err.message,
//         })
//     }
//   };