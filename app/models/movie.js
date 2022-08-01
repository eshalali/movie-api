const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		length: {
			type: String,
			required: true,
		},
        wellReceived: {
            type: Boolean,
            required: true
        },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Movie', movieSchema)
