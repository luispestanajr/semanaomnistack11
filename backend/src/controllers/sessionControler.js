const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        console.log('id', id);

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        console.log('ong', ong);

        if (!ong){
            return response.status(400).json({error: `No ONG found with ID ${id}`});
        }

        return response.json(ong);
    }
};