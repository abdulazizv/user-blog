"use strict";
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String },
    password: { type: String },
    email: { type: String },
    token: { type: String }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = (0, mongoose_1.model)("users", UserSchema);
//# sourceMappingURL=Users.js.map