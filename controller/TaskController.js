const { JWT_SECRET } = require("../config/keys")
const Task = require("../models/Tasks")

const TaskController = {
    async create(req,res){
        const task = await Task.create(req.body)
        res.status(201).send({message:"User successfully created",task})
    },

    async getAll(req, res) {
        try {
            const tasks = await Task.find()
            res.send(tasks)
        } catch (error) {
            console.error(error);
        }
    },
    async getById(req, res) {
        try {
            const tasks = await Task.findById(req.params._id)
            res.send(tasks)
        } catch (error) {
            console.error(error);
        }
    },
    async getByTitle(req, res) {
        try {
            const tasks = await Task.find({
                $text: {
                    $search: req.params.title,
                },
            });
            res.send(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error fetching tasks" });
        }
    },
    async update(req, res) {
        try {
            const task = await Task.findByIdAndUpdate(
                req.params._id, 
                req.body,
                { new: true }
            )
            res.send({ message: "post successfully updated", task });
        } catch (error) {
            console.error(error);
        }
    },
    async delete(req, res) {
        try {
            const task = await Task.findByIdAndDelete(req.params._id)
            res.send({ message: 'Task deleted', task })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the task' })
        }
    },
}

module.exports = TaskController;