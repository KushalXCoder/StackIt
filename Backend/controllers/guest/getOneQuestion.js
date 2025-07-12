const Question = require('../../Schemas/question.schema');

async function getOneQuestion(req,res) {
    try {
        const { id } = req.body;
        const question = await Question.findById(id);
    } catch (error) {
        
    }
}