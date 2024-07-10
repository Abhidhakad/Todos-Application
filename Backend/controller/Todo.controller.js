const User = require("../models/User.model");
const Todo = require("../models/Todo.model");

exports.createTodo = async (req, res) => {
  try {
    // Fetching the details from req.body
    const { title1, description1, completed } = req.body;
    const id = req.user?.id;
    const title = title1;
    const description = description1;
    // Checking if the user exists
    const checkUser = await User.findOne({ _id: id });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in DB",
      });
    }

    // Validating details
    if (!title1 || !description1) {
      return res.status(403).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Save the data in DB
    const todoDetail = await Todo.create({ title, description, completed });

    if (!todoDetail) {
      return res.status(401).json({
        success: false,
        message: "Something went wrong while creating a todo in DB",
      });
    }

    // Update user's todos
    const updateUserTodo = await User.findOneAndUpdate(
      { _id: id },
      { $push: { todos: todoDetail._id } },
      { new: true } // Return the modified document
    );

    if (!updateUserTodo) {
      return res.status(403).json({
        success: false,
        message: "Error occurred while updating user's todos.",
      });
    }

    res.status(200).json({
      success: true,
      todo: todoDetail,
      message: "Todo detail saved in the database.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllTodos = async (req, res) => {
  try {
    const id = req.user?.id;
    if (!id) {
      return res.status(422).json({
        success: false,
        message: "Id is not found",
      });
    }
    const user = await User.findById(id)
    .populate("todos");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(201).json({
      success: true,
      user,
      message: "Todos Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error ocuured while fetching todos",
    });
  }
};

exports.updateTodo = async (req,res) => {
    try {
        const {todo} = req.body;
        const user_id = req.user.id;
        if(!todo){
            return res.status(422).json({
                success:false,
                message:"All fields are required: "
            })
        }
       console.log("todo: ",todo);
        const find_todo = await Todo.findById(todo.id);
        if(!find_todo){
            return res.status(404).json({
                success:false,
                message:'Todo Not Found: '
            })
        }
        const updated_todo = await Todo.findByIdAndUpdate(find_todo._id,{
          title:todo.title1,
          description:todo.description1
        },{new:true})

        if(!updated_todo){
          return res.status(422).json({
            success:false,
            message:'Something went wrong while Updating the todo'
          })
        }
        
        const user = await User.findById(user_id)
        .populate("todos");
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        return res.status(201).json({
          success: true,
          user,
          message: "Todo uodated Successfully",
        });  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success:false,
        message:'Error while Updating the todo'
      })
        
    }
}

exports.deleteTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    const user_id = req.user.id;

    if (!todo) {
      return res.status(422).json({
        success: false,
        message: "All fields are required: ",
      });
    }

    const find_todo = await Todo.findById(todo._id);

    if (!find_todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo Not Found: ',
      });
    }

    const deleted_todo = await Todo.findByIdAndDelete(find_todo._id);

    if (!deleted_todo) {
      return res.status(422).json({
        success: false,
        message: 'Something went wrong while Deleting the todo',
      });
    }

    const response = await User.updateOne(
      { _id: user_id },
      { $pull: { todos: { _id: todo._id } } }
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong while updating user's todos.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error while Deleting the todo',
    });
  }
};

exports.successTodo = async (req,res) => {
  try {
      const {todo} = req.body;
      const user_id = req.user.id;
      if(!todo){
          return res.status(422).json({
              success:false,
              message:"All fields are required: "
          })
      }
     console.log("todo: ",todo);
      const find_todo = await Todo.findById(todo._id);
      if(!find_todo){
          return res.status(404).json({
              success:false,
              message:'Todo Not Found: '
          })
      }
      const complete = todo.completed?false:true
      const updated_todo = await Todo.findByIdAndUpdate(find_todo._id,{
        $set:{completed:complete}
      },{new:true})

      if(!updated_todo){
        return res.status(422).json({
          success:false,
          message:'Something went wrong while Updating the todo'
        })
      }
      
      const user = await User.findById(user_id)
      .populate("todos");
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(201).json({
        success: true,
        user,
        message: "Todo uodated Successfully",
      });  
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success:false,
      message:'Error while Updating the todo'
    })
      
  }
}
