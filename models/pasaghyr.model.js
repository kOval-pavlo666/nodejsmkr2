const { Schema, model } = require("mongoose");

const pasaghyrSchema = new Schema(
    {
        surname: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        numberPiecesBaggage: {
            type: Number,
            required: true,
        },
        weightBaggage: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Pasaghyr", pasaghyrSchema, "pasaghyr");
